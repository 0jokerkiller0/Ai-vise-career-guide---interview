"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { extractGeminiText, getGeminiModel } from "@/lib/gemini";

/**
 * Internal function to generate insights for an industry using AI.
 * This matches the IndustryInsight schema in prisma/schema.prisma.
 */
export async function generateAIInsights(industry) {
  const prompt = `
    Provide current market insights for the "${industry}" industry.
    Include:
    - Average salary ranges for common roles (provide min, max, median, role).
    - Year-over-year growth rate (as a percentage number only).
    - Market demand level ("High", "Medium", or "Low").
    - Top 5 in-demand skills in this industry.
    - Market outlook summary ("Positive", "Neutral", or "Negative").
    - 3-5 key industry trends.
    - 3-5 recommended skills for someone entering this industry.
    
    Return the response in this JSON format ONLY:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number }
      ],
      "growthRate": number,
      "demandLevel": "string",
      "topSkills": ["string"],
      "marketOutlook": "string",
      "keyTrends": ["string"],
      "recommendedSkills": ["string"]
    }
  `;

  try {
    const result = await getGeminiModel().generateContent(prompt);
    const responseText = extractGeminiText(result);
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response format");
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Gemini Insight Generation Error:", error);
    throw error;
  }
}

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  if (!user || !user.industry) {
    throw new Error("Industry not set. Please complete onboarding.");
  }

  // 1. Check if we have recent insights in the database
  const existingInsight = await db.industryInsight.findUnique({
    where: { industry: user.industry },
  });

  // If insight exists and nextUpdate is in the future, return it
  if (existingInsight && new Date(existingInsight.nextUpdate) > new Date()) {
    return existingInsight;
  }

  // 2. Otherwise generate new insights
  try {
    const insights = await generateAIInsights(user.industry);

    const updatedInsight = await db.industryInsight.upsert({
      where: { industry: user.industry },
      update: {
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Update every 7 days
      },
      create: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return updatedInsight;
  } catch (error) {
    console.error("Error in getIndustryInsights:", error);
    if (existingInsight) return existingInsight;
    throw new Error("Failed to fetch industry insights.");
  }
}
