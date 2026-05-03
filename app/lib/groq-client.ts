import { openai } from "@ai-sdk/openai";

// Using Vercel AI Gateway with OpenAI models (zero-config, no API key needed)
export const aiModel = openai("gpt-4o-mini");
