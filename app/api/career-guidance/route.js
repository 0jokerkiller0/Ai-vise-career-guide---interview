


import { generateGeminiResponse } from "@/lib/gemini";
import { inngest } from "@/lib/inngest/client";
import { z } from "zod";

const RequestSchema = z.object({
    field: z.string().min(1),
    message: z.string().min(1),
    mode: z.enum(["instant", "job"]).optional(), // allow mode selection
});

export async function POST(req) {
    try {
        const body = await req.json();
        const parsed = RequestSchema.safeParse(body);
        if (!parsed.success) {
            return new Response(
                JSON.stringify({ error: "Invalid request", details: parsed.error.flatten() }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const { field, message, mode = "instant" } = parsed.data;

        if (mode === "job") {
            // Queue background job with Inngest
            await inngest.send({
                name: "career-guidance/ask",
                data: { field, message },
            });
            return new Response(
                JSON.stringify({ status: "queued", message: "Job has been queued for processing." }),
                { status: 202, headers: { "Content-Type": "application/json" } }
            );
        } else {
            // Call Gemini API directly for instant response
            const geminiResponse = await generateGeminiResponse({ field, message });
            return new Response(
                JSON.stringify({ status: "success", response: geminiResponse }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
