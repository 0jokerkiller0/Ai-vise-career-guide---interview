import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODEL = "gemini-flash-latest";

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: GEMINI_MODEL });
}

export function extractGeminiText(result) {
  const text = result?.response?.text?.();

  if (!text || !text.trim()) {
    throw new Error("Gemini returned an empty response");
  }

  return text.trim();
}

export function extractJsonObject(text) {
  const cleanedText = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleanedText.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("No JSON object found in AI response");
  }

  return match[0];
}

export async function generateCareerGuidanceResponse({
  jobField,
  message,
}) {
  if (!jobField?.trim()) {
    throw new Error("A job field is required");
  }

  if (!message?.trim()) {
    throw new Error("A message is required");
  }

  const prompt = [
    "You are a helpful career guidance assistant.",
    `The user is exploring a career in ${jobField.trim()}.`,
    `Question: ${message.trim()}`,
    "Respond with actionable advice, suggested next steps, and a concise tone.",
  ].join("\n");

  const result = await getGeminiModel().generateContent(prompt);
  return extractGeminiText(result);
}
