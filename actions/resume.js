"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { extractGeminiText, getGeminiModel } from "@/lib/gemini";

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
    
    // Clean up the response to ensure it's valid JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response format");
    
    const analysis = JSON.parse(jsonMatch[0]);

    // Save to database
    const savedResume = await db.resume.create({
      data: {
        userId: user.id,
        content: content,
        aiScore: analysis.score,
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

export async function getLatestResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return resume;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw new Error("Failed to fetch resume");
  }
}
