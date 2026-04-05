export async function generateCareerGuidanceWithOpenRouter({ jobField, message }) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error("OPENROUTER_API_KEY is missing from process.env");
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const prompt = `You are a helpful career guidance assistant.
The user is exploring a career in ${jobField.trim()}.
Question: ${message.trim()}
Respond with actionable advice, suggested next steps, and a concise tone.`;

  try {
    console.log("Calling OpenRouter API with key starting with:", apiKey.substring(0, 5) + "...");
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Career Coach",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API Error Response:", data);
      throw new Error(data.error?.message || `OpenRouter API error: ${response.status}`);
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenRouter Fetch Error:", error.message);
    throw error;
  }
}
