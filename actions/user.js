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

    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

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
    console.error("Failed to check or create user:", error);
    throw error;
  }
}

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get current user details from Clerk to ensure we have them for upsert
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("User not found in Clerk");

  try {
    if (!data?.industry?.trim()) {
      throw new Error("Industry is required");
    }

    const normalizedIndustry = data.industry.trim();
    const normalizedSkills = Array.isArray(data.skills)
      ? data.skills.map((skill) => skill.trim()).filter(Boolean)
      : typeof data.skills === "string"
        ? data.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : [];

    // 1. Handle Industry Insights OUTSIDE the transaction to avoid timeouts
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: normalizedIndustry },
    });

    if (!industryInsight) {
      try {
        const insights = await generateAIInsights(normalizedIndustry);
        industryInsight = await db.industryInsight.upsert({
          where: { industry: normalizedIndustry },
          update: {
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
          create: {
            industry: normalizedIndustry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      } catch (aiError) {
        console.error("AI Insight generation failed, using fallback:", aiError.message);
        
        industryInsight = await db.industryInsight.upsert({
          where: { industry: normalizedIndustry },
          update: {},
          create: {
            industry: normalizedIndustry,
            salaryRanges: [],
            growthRate: 0,
            demandLevel: "Medium",
            topSkills: [],
            marketOutlook: "Neutral",
            keyTrends: [],
            recommendedSkills: [],
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      }
    }

    // 2. Update or Create User (Upsert)
    const updatedUser = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {
        industry: normalizedIndustry,
        experience: data.experience,
        bio: data.bio || null,
        skills: normalizedSkills,
      },
      create: {
        clerkUserId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" "),
        imageUrl: clerkUser.imageUrl,
        industry: normalizedIndustry,
        experience: data.experience,
        bio: data.bio || null,
        skills: normalizedSkills,
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
