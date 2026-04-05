import { serve } from "inngest/next";

import { inngest } from "@/lib/inngest/client";
import { generateIndustryInsights } from "@/lib/inngest/function";
import { careerGuidance } from "@/lib/inngest/career-guidance";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateIndustryInsights, careerGuidance],
});
