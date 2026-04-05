"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { extractGeminiText, extractJsonObject, getGeminiModel } from "@/lib/gemini";

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");
  if (!user.industry) throw new Error("Complete onboarding before starting a quiz");

  const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await getGeminiModel().generateContent(prompt);
    const text = extractGeminiText(result);
    
    try {
      const quiz = JSON.parse(extractJsonObject(text));

      if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        throw new Error("Gemini did not return any questions in the expected format");
      }

      return quiz.questions;
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      console.error("Raw text from Gemini:", text);
      throw new Error("AI returned an invalid quiz format. Please try again.");
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error(error.message || "Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  // Get wrong answers
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  // Only generate improvement tips if there are wrong answers
  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await getGeminiModel().generateContent(improvementPrompt);

      improvementTip = extractGeminiText(tipResult);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}

export async function generateInterviewFeedback(role, questions, answers) {
  const prompt = `
    Analyze this technical interview for a ${role} position.
    
    Questions and User Answers:
    ${questions.map((q, i) => `Q: ${q.question}\nUser Answer: ${answers[i]}\nCorrect Answer: ${q.correctAnswer}`).join("\n\n")}
    
    Provide a detailed feedback report in plain text (no markdown if possible) that includes:
    1. Overall performance summary.
    2. Strengths identified.
    3. Specific areas for improvement.
    4. Recommended study topics or next steps.
    
    Keep it professional, encouraging, and actionable.
  `;

  try {
    const result = await getGeminiModel().generateContent(prompt);
    return extractGeminiText(result);
  } catch (error) {
    console.error("Error generating interview feedback:", error);
    return "Feedback generation failed, but your results have been saved.";
  }
}

export async function saveInterviewSession({ role, questions, answers }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Calculate score
  const correctCount = questions.reduce((acc, q, index) => {
    return q.correctAnswer === answers[index] ? acc + 1 : acc;
  }, 0);
  
  const score = (correctCount / questions.length) * 100;

  // Generate AI feedback
  const feedback = await generateInterviewFeedback(role, questions, answers);

  try {
    const session = await db.interviewSession.create({
      data: {
        userId: user.id,
        role,
        questions,
        answers,
        feedback,
        score,
      },
    });

    return { success: true, data: session };
  } catch (error) {
    console.error("Error saving interview session:", error);
    throw new Error("Failed to save interview session");
  }
}
