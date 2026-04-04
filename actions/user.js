"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function checkUser() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get current user details from Clerk to ensure we have them for upsert
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("User not found in Clerk");

  try {
    // 1. Handle Industry Insights OUTSIDE the transaction to avoid timeouts
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: data.industry },
    });

    if (!industryInsight) {
      try {
        const insights = await generateAIInsights(data.industry);
        industryInsight = await db.industryInsight.create({
          data: {
            industry: data.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      } catch (aiError) {
        console.error("AI Insight generation failed, continuing without it:", aiError.message);
        // We continue even if AI fails - don't block the user's onboarding
      }
    }

    // 2. Update or Create User (Upsert)
    const skillsArray = Array.isArray(data.skills) ? data.skills : [];
    
    const updatedUser = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {
        industry: data.industry,
        experience: data.experience,
        bio: data.bio || null,
        skills: skillsArray,
      },
      create: {
        clerkUserId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        imageUrl: clerkUser.imageUrl,
        industry: data.industry,
        experience: data.experience,
        bio: data.bio || null,
        skills: skillsArray,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/onboarding");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error in updateUser server action:", error.message);
    throw new Error(error.message || "Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  return {
    isOnboarded: !!user?.industry,
  };
}