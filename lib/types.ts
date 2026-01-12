export type InvestorId =
  | "a16z"
  | "peter_thiel"
  | "sam_altman"
  | "yc_partner"
  | "naval_ravikant"
  | "balaji_srinivasan";

export interface StartupPitch {
  idea: string;
  stage?: "idea" | "mvp" | "early_traction" | "growth";
  sector?: string;
  askAmount?: string;
}

// Interest level scale
export type InterestLevel = "Very High" | "High" | "Moderate" | "Low" | "Pass";

// Individual investor's response
export interface InvestorResponse {
  investorId: InvestorId;
  investorName: string;
  interestLevel: InterestLevel;
  interestScore: number; // 1-10
  valuationRange: {
    low: number;
    high: number;
    currency: string;
  };
  investmentAmount: {
    min: number;
    max: number;
    currency: string;
  };
  reasoning: {
    whyInvest: string[];
    whyPass: string[];
  };
  feedback: string;
  keyQuestions: string[];
}

// Full simulation response
export interface SimulationResponse {
  pitch: StartupPitch;
  responses: InvestorResponse[];
  timestamp: string;
}

// API request body
export interface SimulateRequest {
  pitch: StartupPitch;
  selectedInvestors?: InvestorId[];
}

// API response
export interface SimulateApiResponse {
  success: boolean;
  data?: SimulationResponse;
  error?: string;
}

// Investor persona metadata
export interface InvestorPersona {
  id: InvestorId;
  name: string;
  title: string;
  avatar?: string;
  philosophy: string;
  preferredSectors: string[];
  typicalCheckSize: string;
  riskTolerance: "High" | "Medium" | "Low";
}

export const INVESTOR_PERSONAS: InvestorPersona[] = [
  {
    id: "a16z",
    name: "a16z Partner",
    title: "Andreessen Horowitz",
    philosophy:
      "Software is eating the world. We back bold founders building category-defining companies with massive TAM.",
    preferredSectors: [
      "Enterprise SaaS",
      "Fintech",
      "Crypto/Web3",
      "AI/ML",
      "Consumer Tech",
    ],
    typicalCheckSize: "$1M - $100M+",
    riskTolerance: "High",
  },
  {
    id: "peter_thiel",
    name: "Peter Thiel",
    title: "Founders Fund",
    philosophy:
      "Competition is for losers. We invest in monopolies, secrets, and 0-to-1 innovations that change the world.",
    preferredSectors: [
      "Deep Tech",
      "Defense",
      "Biotech",
      "Space",
      "Contrarian Bets",
    ],
    typicalCheckSize: "$500K - $50M",
    riskTolerance: "High",
  },
  {
    id: "sam_altman",
    name: "Sam Altman",
    title: "Former YC President / OpenAI CEO",
    philosophy:
      "Bet on exponential technologies and relentless founders. AI will transform everything.",
    preferredSectors: ["AI/ML", "Nuclear Energy", "Longevity", "Hard Tech"],
    typicalCheckSize: "$1M - $50M",
    riskTolerance: "High",
  },
  {
    id: "yc_partner",
    name: "YC Partner",
    title: "Y Combinator",
    philosophy:
      "Make something people want. We invest in founders, not ideas. Move fast and talk to users.",
    preferredSectors: [
      "B2B SaaS",
      "Developer Tools",
      "Marketplaces",
      "Fintech",
      "AI",
    ],
    typicalCheckSize: "$500K (standard deal)",
    riskTolerance: "Medium",
  },
  {
    id: "naval_ravikant",
    name: "Naval Ravikant",
    title: "AngelList Founder",
    philosophy:
      "Seek wealth, not money. Invest in products with zero marginal cost of replication. Leverage code and media.",
    preferredSectors: [
      "Crypto",
      "Consumer Apps",
      "Marketplaces",
      "Creator Economy",
    ],
    typicalCheckSize: "$100K - $1M",
    riskTolerance: "Medium",
  },
  {
    id: "balaji_srinivasan",
    name: "Balaji Srinivasan",
    title: "Angel Investor / Former a16z Partner",
    philosophy:
      "The Network State is coming. Invest in decentralization, digital nomadism, and technologies that exit the system.",
    preferredSectors: [
      "Crypto/Web3",
      "Biotech",
      "Remote Work",
      "Network States",
      "Health Tech",
    ],
    typicalCheckSize: "$100K - $5M",
    riskTolerance: "High",
  },
];
