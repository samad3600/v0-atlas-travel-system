import { NextRequest, NextResponse } from "next/server";
import { TravelPlanInput } from "@/app/lib/agents/types";
import { researcherAgent } from "@/app/lib/agents/researcher";
import { plannerAgent } from "@/app/lib/agents/planner";
import { advisorAgent } from "@/app/lib/agents/advisor";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body: TravelPlanInput = await request.json();

    // Create a custom readable stream for streaming responses
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Run Researcher Agent
          console.log("[v0] Starting Researcher Agent");
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "agent_start",
                agent: "Researcher",
                thinking: "Researching destination information...",
              }) + "\n"
            )
          );

          const researchResult = await researcherAgent(body);
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "agent_complete",
                agent: "Researcher",
                response: researchResult,
              }) + "\n"
            )
          );

          // Run Planner Agent
          console.log("[v0] Starting Planner Agent");
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "agent_start",
                agent: "Planner",
                thinking: "Creating personalized itinerary...",
              }) + "\n"
            )
          );

          const planResult = await plannerAgent(body, researchResult);
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "agent_complete",
                agent: "Planner",
                response: planResult,
              }) + "\n"
            )
          );

          // Run Advisor Agent
          console.log("[v0] Starting Advisor Agent");
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "agent_start",
                agent: "Advisor",
                thinking: "Preparing practical travel tips...",
              }) + "\n"
            )
          );

          const advisorResult = await advisorAgent(
            body,
            researchResult,
            planResult
          );
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "agent_complete",
                agent: "Advisor",
                response: advisorResult,
              }) + "\n"
            )
          );

          // Combine all results
          const fullPlan = `## ATLAS TRAVEL PLAN

**Destination:** ${body.destination}
**Duration:** ${body.duration} days
**Budget:** $${body.budget}
**Interests:** ${body.interests.join(", ")}

---

## RESEARCH FINDINGS

${researchResult}

---

## YOUR PERSONALIZED ITINERARY

${planResult}

---

## TRAVEL ADVICE

${advisorResult}`;

          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "complete",
                fullPlan,
              }) + "\n"
            )
          );

          controller.close();
        } catch (error) {
          console.error("[v0] Error in stream:", error);
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "error",
                message: error instanceof Error ? error.message : "Unknown error",
              }) + "\n"
            )
          );
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[v0] API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
