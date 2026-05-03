import { generateText } from "ai";
import { groq } from "../groq-client";
import { TravelPlanInput } from "./types";

export async function researcherAgent(input: TravelPlanInput): Promise<string> {
  const prompt = `You are a travel researcher agent. Your job is to gather and present key information about a travel destination.

Given this travel request:
- Destination: ${input.destination}
- Budget: $${input.budget}
- Duration: ${input.duration} days
- Interests: ${input.interests.join(", ")}

Provide a concise research brief including:
1. Best time to visit
2. Average costs (accommodation, food, activities)
3. Key attractions based on interests
4. Climate and weather conditions
5. Basic logistics (currency, language, visa info)

Keep your response to 2-3 paragraphs, factual and helpful.`;

  const { text } = await generateText({
    model: groq("llama-3.1-70b-versatile"),
    prompt,
  });

  return text;
}
