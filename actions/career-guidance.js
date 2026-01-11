
import { inngest } from "@/lib/inngest/client";

// OpenAI API call helper
async function getOpenAIResponse(field, message) {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/chat/completions";
    const prompt = `You are a career guidance AI. The user is preparing for a career as a ${field}. Answer their question and provide guidance.\n\nUser: ${message}`;

    const body = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful career guidance assistant." },
            { role: "user", content: prompt }
        ],
        max_tokens: 512,
        temperature: 0.7
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        console.log("OpenAI API raw response:", JSON.stringify(data));
        return data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    } catch (err) {
        console.error("OpenAI API error:", err);
        return "Sorry, there was an error contacting the AI service.";
    }
}

export const careerGuidance = inngest.createFunction(
    { id: "career-guidance-ask" },
    { event: "career-guidance/ask" },
    async ({ event }) => {
        const { field, message } = event.data;
        const response = await getOpenAIResponse(field, message);
        return { data: response };
    }
);
