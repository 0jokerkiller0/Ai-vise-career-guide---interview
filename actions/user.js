"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);
          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Convert skills string to array if it's a string
        const skillsArray = typeof data.skills === 'string' 
          ? data.skills.split(',').map(s => s.trim()).filter(s => s.length > 0)
          : Array.isArray(data.skills) 
            ? data.skills 
            : [];

        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience ? parseInt(data.experience) : null,
            bio: data.bio || null,
            skills: skillsArray,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/onboarding");
    
    return { success: true, user: result.updatedUser };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true, email: true, name: true, imageUrl: true },
  });

  // If user not found, create a new user record (basic onboarding)
  if (!user) {
    const clerkUser = await auth();
    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: clerkUser?.user?.email || "",
        name: `${clerkUser?.user?.firstName || ""} ${clerkUser?.user?.lastName || ""}`.trim(),
        imageUrl: clerkUser?.user?.imageUrl || "",
      },
    });
  }

  try {
    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}