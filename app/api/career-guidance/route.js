import { getCareerGuidance } from "@/actions/career-guidance";
import { inngest } from "@/lib/inngest/client";
import { z } from "zod";

const RequestSchema = z.object({
    field: z.string().trim().min(1),
    message: z.string().trim().min(1),
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
            const result = await getCareerGuidance({
                jobField: field,
                message,
            });

            if (!result.success) {
                return new Response(
                    JSON.stringify({ error: result.error }),
                    { status: 500, headers: { "Content-Type": "application/json" } }
                );
            }

            return new Response(
                JSON.stringify({ status: "success", response: result.data }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (err) {
        console.error("Career guidance route failed:", err);
        return new Response(
            JSON.stringify({ error: err.message || "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
