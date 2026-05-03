export interface TravelPlanInput {
  destination: string;
  budget: number;
  duration: number;
  interests: string[];
}

export interface AgentStreamResponse {
  agentName: string;
  thinking: string;
  response: string;
}

export interface CachedPlan extends TravelPlanInput {
  id: string;
  generatedPlan: string;
  timestamp: number;
}
