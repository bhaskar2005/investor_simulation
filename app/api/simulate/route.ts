import { NextRequest, NextResponse } from "next/server";
import { simulateAllInvestors } from "@/lib/gemini";
import {
  SimulateRequest,
  SimulateApiResponse,
  SimulationResponse,
} from "@/lib/types";

function sanitizeInput(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: SimulateRequest = await request.json();

    if (
      !body.pitch ||
      !body.pitch.idea ||
      body.pitch.idea.trim().length === 0
    ) {
      return NextResponse.json<SimulateApiResponse>(
        {
          success: false,
          error: "Please provide a startup idea to analyze",
        },
        { status: 400 }
      );
    }

    if (body.pitch.idea.trim().length < 20) {
      return NextResponse.json<SimulateApiResponse>(
        {
          success: false,
          error:
            "Please provide a more detailed startup description (at least 20 characters)",
        },
        { status: 400 }
      );
    }

    if (body.pitch.idea.length > 5000) {
      return NextResponse.json<SimulateApiResponse>(
        {
          success: false,
          error: "Pitch description is too long (maximum 5000 characters)",
        },
        { status: 400 }
      );
    }

    const sanitizedPitch = {
      idea: sanitizeInput(body.pitch.idea),
      stage: body.pitch.stage,
      sector: body.pitch.sector ? sanitizeInput(body.pitch.sector) : undefined,
      askAmount: body.pitch.askAmount
        ? sanitizeInput(body.pitch.askAmount)
        : undefined,
    };

    // Simulate investor responses
    const responses = await simulateAllInvestors(
      sanitizedPitch,
      body.selectedInvestors
    );

    const simulationResponse: SimulationResponse = {
      pitch: sanitizedPitch,
      responses,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json<SimulateApiResponse>({
      success: true,
      data: simulationResponse,
    });
  } catch (error) {
    console.error("Simulation error:", error);

    return NextResponse.json<SimulateApiResponse>(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during simulation",
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Investor Simulation API is running",
    availableInvestors: [
      "a16z",
      "peter_thiel",
      "sam_altman",
      "yc_partner",
      "naval_ravikant",
      "balaji_srinivasan",
    ],
  });
}
