"use server";

import { generateCareerGuidanceResponse } from "@/lib/gemini";
import { generateCareerGuidanceWithOpenRouter } from "@/lib/openrouter";

export async function getCareerGuidance({ jobField, message }) {
  try {
    let response;
    
    // Use OpenRouter if key is available, fallback to Gemini
    if (process.env.OPENROUTER_API_KEY) {
      console.log("Using OpenRouter for career guidance...");
      response = await generateCareerGuidanceWithOpenRouter({ jobField, message });
    } else {
      console.log("Using Gemini for career guidance...");
      response = await generateCareerGuidanceResponse({ jobField, message });
    }

    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    console.error("Career guidance generation failed:", error);

    return {
      success: false,
      data: null,
      error: error.message || "Failed to generate career guidance",
    };
  }
}
