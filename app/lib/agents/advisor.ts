import { generateText } from "ai";
import { groq } from "../groq-client";
import { TravelPlanInput } from "./types";

export async function advisorAgent(
  input: TravelPlanInput,
  researchContext: string,
  planContext: string
): Promise<string> {
  const prompt = `You are a travel advisor agent. Your job is to provide practical tips and advice.

Travel Details:
- Destination: ${input.destination}
- Duration: ${input.duration} days
- Budget: $${input.budget}

Research Summary:
${researchContext}

Planned Itinerary Summary:
${planContext}

Provide practical travel advice including:
1. Packing essentials for this destination and time
2. Transportation tips (local transit, getting around)
3. Safety and health considerations
4. Money-saving tips to stay within budget
5. Cultural tips and local etiquette
6. Emergency contacts and important numbers
7. Recommended apps or tools

Keep advice concise and actionable.`;

  const { text } = await generateText({
    model: groq("mixtral-8x7b-32768"),
    prompt,
  });

  return text;
}
