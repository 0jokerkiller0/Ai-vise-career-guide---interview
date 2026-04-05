import { getCareerGuidance } from "@/actions/career-guidance";
import { inngest } from "./client";

export const careerGuidance = inngest.createFunction(
  { id: "career-guidance-ask" },
  { event: "career-guidance/ask" },
  async ({ event }) => {
    const { field, message } = event.data ?? {};
    const result = await getCareerGuidance({
      jobField: field,
      message,
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return { data: result.data };
  }
);
