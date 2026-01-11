import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateGeminiResponse({ field, message }) {
    const prompt = `You are a career guidance AI. Field: ${field}. Message: ${message}. Give a helpful, concise answer.`;
    const result = await model.generateContent(prompt);
    // Extract the text response
    return result.response.candidates[0].content.parts[0].text;
}
