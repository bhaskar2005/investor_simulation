import { GoogleGenAI } from "@google/genai";
import {
  InvestorId,
  InvestorResponse,
  StartupPitch,
  INVESTOR_PERSONAS,
} from "./types";
import { INVESTOR_SYSTEM_PROMPTS, generateAnalysisPrompt } from "./prompts";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const PRIMARY_MODEL = "gemini-3-flash-preview";
const FALLBACK_MODEL = "gemini-2.5-flash";

function parseJsonResponse(text: string): unknown {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }

  const trimmed = cleaned.trim();

  const openBraces = (trimmed.match(/\{/g) || []).length;
  const closeBraces = (trimmed.match(/\}/g) || []).length;

  if (openBraces !== closeBraces) {
    throw new Error(
      `Incomplete JSON response: ${openBraces} opening braces, ${closeBraces} closing braces`
    );
  }

  return JSON.parse(trimmed);
}

// Generate content with fallback model
async function generateWithFallback(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const contents = [
    {
      role: "user" as const,
      parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
    },
  ];

  try {
    // Try primary model (Gemini 3 Flash)
    const response = await genAI.models.generateContent({
      model: PRIMARY_MODEL,
      contents,
      config: {
        temperature: 1.0,
        maxOutputTokens: 4096,
      },
    });
    return response.text || "";
  } catch (primaryError) {
    console.warn(
      `Primary model (${PRIMARY_MODEL}) failed, falling back to ${FALLBACK_MODEL}:`,
      primaryError
    );

    // Fallback to Gemini 2.5 Flash
    const fallbackResponse = await genAI.models.generateContent({
      model: FALLBACK_MODEL,
      contents,
      config: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    });
    return fallbackResponse.text || "";
  }
}

export async function simulateInvestor(
  investorId: InvestorId,
  pitch: StartupPitch
): Promise<InvestorResponse> {
  const persona = INVESTOR_PERSONAS.find((p) => p.id === investorId);
  if (!persona) {
    throw new Error(`Unknown investor: ${investorId}`);
  }

  const systemPrompt = INVESTOR_SYSTEM_PROMPTS[investorId];
  const userPrompt = generateAnalysisPrompt(pitch);

  try {
    const text = await generateWithFallback(systemPrompt, userPrompt);
    const parsed = parseJsonResponse(text) as Omit<
      InvestorResponse,
      "investorId" | "investorName"
    >;

    return {
      investorId,
      investorName: persona.name,
      ...parsed,
    };
  } catch (error) {
    console.error(`Error simulating ${investorId}:`, error);

    // Return a fallback response on error
    return {
      investorId,
      investorName: persona.name,
      interestLevel: "Moderate",
      interestScore: 5,
      valuationRange: {
        low: 1000000,
        high: 5000000,
        currency: "USD",
      },
      investmentAmount: {
        min: 100000,
        max: 500000,
        currency: "USD",
      },
      reasoning: {
        whyInvest: ["Unable to fully analyze - please try again"],
        whyPass: ["Analysis incomplete due to technical issues"],
      },
      feedback:
        "I wasn't able to fully analyze this pitch due to a technical issue. Please try submitting again.",
      keyQuestions: ["Could you tell me more about your startup?"],
    };
  }
}

export async function simulateAllInvestors(
  pitch: StartupPitch,
  selectedInvestors?: InvestorId[]
): Promise<InvestorResponse[]> {
  const investorsToSimulate =
    selectedInvestors || (INVESTOR_PERSONAS.map((p) => p.id) as InvestorId[]);

  const results = await Promise.all(
    investorsToSimulate.map((investorId) => simulateInvestor(investorId, pitch))
  );

  return results;
}
