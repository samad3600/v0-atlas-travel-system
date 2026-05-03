import { generateText } from "ai";
import { aiModel } from "../groq-client";
import { TravelPlanInput } from "./types";

export async function plannerAgent(
  input: TravelPlanInput,
  researchContext: string
): Promise<string> {
  const prompt = `You are a travel planner agent. Your job is to create a detailed day-by-day itinerary.

Travel Details:
- Destination: ${input.destination}
- Duration: ${input.duration} days
- Budget: $${input.budget}
- Interests: ${input.interests.join(", ")}

Research Context:
${researchContext}

Create a detailed day-by-day itinerary that:
1. Spreads activities across all ${input.duration} days
2. Balances different types of activities based on interests
3. Includes realistic timing and transitions
4. Suggests specific places/activities
5. Estimates costs for major activities

Format each day clearly with timing and activity details.`;

  const { text } = await generateText({
    model: aiModel,
    prompt,
  });

  return text;
}
