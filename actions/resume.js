"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getGeminiModel, extractGeminiText } from "@/lib/gemini";

export async function saveResume(content) {
  console.log("saveResume action called with content length:", content?.length);
  const { userId } = await auth();
  if (!userId) {
    console.error("saveResume: No userId found");
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    console.error("saveResume: User not found in database for clerkUserId:", userId);
    throw new Error("User not found");
  }

  try {
    console.log("saveResume: Upserting resume for user.id:", user.id);
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    console.log("saveResume: Resume saved successfully");
    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume in action:", error);
    throw new Error("Failed to save resume: " + error.message);
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    return await db.resume.findUnique({
      where: {
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw new Error("Failed to fetch resume");
  }
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    As an expert career coach, improve the following ${type} description for a resume.
    Make it more impactful, quantifiable, and professional while maintaining the core meaning.
    Focus on using strong action verbs and showcasing achievements.
    Keep it concise and in a bullet-point format if appropriate.

    Current Description:
    ${current}

    Improved Description:
  `;

  try {
    const result = await getGeminiModel().generateContent(prompt);
    const responseText = extractGeminiText(result);
    return responseText.trim();
  } catch (error) {
    console.error("Error improving with AI:", error);
    throw new Error("Failed to improve description");
  }
}

export async function analyzeResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Analyze the following resume content for a ${user.industry || "professional"} role.
    
    Resume Content:
    ${content}
    
    Provide a detailed evaluation in the following JSON format:
    {
      "score": number (0-100),
      "feedback": "string (detailed feedback on strengths and weaknesses)",
      "improvements": ["string", "string", ...]
    }
  `;

  try {
    const result = await getGeminiModel().generateContent(prompt);
    const responseText = extractGeminiText(result);
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response format");
    
    const analysis = JSON.parse(jsonMatch[0]);

    const savedResume = await db.resume.upsert({
      where: { userId: user.id },
      update: {
        content: content,
        atsScore: analysis.score,
        feedback: analysis.feedback + "\n\nSuggested Improvements:\n" + analysis.improvements.join("\n- "),
      },
      create: {
        userId: user.id,
        content: content,
        atsScore: analysis.score,
        feedback: analysis.feedback + "\n\nSuggested Improvements:\n" + analysis.improvements.join("\n- "),
      },
    });

    return {
      success: true,
      data: savedResume,
    };
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
}
