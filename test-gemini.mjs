import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testConnection() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = "Say 'Gemini is working!' if you can read this.";
    
    console.log("Testing Gemini API Key...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("\nSuccess! Response from Gemini:");
    console.log("----------------------------");
    console.log(text);
    console.log("----------------------------");
  } catch (error) {
    console.error("\n❌ API Key Test Failed!");
    console.error("Error Message:", error.message);
    
    if (error.message.includes("API_KEY_INVALID")) {
      console.error("Tip: Your API key is incorrect. Please check for typos.");
    } else if (error.message.includes("API key not found")) {
      console.error("Tip: Could not find GEMINI_API_KEY in your .env file.");
    }
  }
}

testConnection();
