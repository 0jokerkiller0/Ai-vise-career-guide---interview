import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Listing available models for your API Key...");
    // The library doesn't have a direct listModels method on genAI,
    // but we can try to use gemini-pro which is a very common name.
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { apiVersion: "v1beta" }
    );
    const prompt = "Hi";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("\nSuccess! gemini-pro is working.");
    console.log("Response:", response.text());
  } catch (error) {
    console.error("\n❌ API Key Test Failed!");
    console.error("Error Message:", error.message);
    
    if (error.message.includes("API_KEY_INVALID")) {
      console.error("Tip: Your API key is incorrect. Please check for typos.");
    } else if (error.message.includes("404")) {
      console.error("Tip: The model you're trying to reach doesn't exist or isn't available for your key.");
    } else if (error.message.includes("403")) {
      console.error("Tip: Your API key doesn't have permission to use this model.");
    }
  }
}

listModels();
