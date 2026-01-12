"use client";

import React, { useState } from "react";
import PitchForm from "@/components/PitchForm";
import InvestorTabs from "@/components/InvestorTabs";
import InvestorCard from "@/components/InvestorCard";
import ValuationPanel from "@/components/ValuationPanel";
import {
  INVESTOR_PERSONAS,
  StartupPitch,
  SimulationResponse,
} from "@/lib/types";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SimulationResponse | null>(null);
  const [activeInvestor, setActiveInvestor] = useState<string | null>(null);

  const handleSubmit = async (pitch: StartupPitch) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pitch }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to analyze pitch");
      }

      setResults(data.data);
      setActiveInvestor(data.data.responses[0]?.investorId || null);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const activeResponse = results?.responses.find(
    (r) => r.investorId === activeInvestor
  );
  const activePersona = INVESTOR_PERSONAS.find((p) => p.id === activeInvestor);

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Investor Simulation
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            See how top investors like a16z, Peter Thiel, Sam Altman and YC
            partners would react to your startup idea.
          </p>
        </header>

        {/* Pitch Form */}
        <section
          className="p-6 rounded-2xl mb-8"
          style={{
            background: "var(--card)",
            border: "1px solid var(--card-border)",
          }}
        >
          <PitchForm onSubmit={handleSubmit} isLoading={isLoading} />
        </section>

        {/* Error Message */}
        {error && (
          <div
            className="p-4 rounded-xl mb-8 flex items-center gap-3"
            style={{
              background: "var(--danger-light)",
              border: "1px solid var(--danger)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="var(--danger)"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "var(--card)",
                border: "1px solid var(--card-border)",
              }}
            >
              <svg
                className="animate-spin h-5 w-5"
                style={{ color: "var(--accent)" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span style={{ color: "var(--muted)" }}>
                Consulting 6 investors... this may take a moment
              </span>
            </div>
          </div>
        )}

        {/* Results */}
        {results && !isLoading && (
          <section className="space-y-6 animate-fade-in">
            <ValuationPanel responses={results.responses} />

            <InvestorTabs
              investors={results.responses}
              activeInvestor={activeInvestor}
              onSelect={setActiveInvestor}
            />

            {activeResponse && (
              <InvestorCard
                key={activeInvestor}
                response={activeResponse}
                persona={activePersona}
              />
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Simulated investor feedback for educational purposes only
          </p>
        </footer>
      </div>
    </main>
  );
}
