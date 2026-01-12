"use client";

import React, { useState } from "react";

const STAGES = [
  { value: "idea", label: "Just an Idea" },
  { value: "mvp", label: "MVP Built" },
  { value: "early_traction", label: "Early Traction" },
  { value: "growth", label: "Growth Stage" },
];

function PitchForm({ onSubmit, isLoading }) {
  const [idea, setIdea] = useState("");
  const [stage, setStage] = useState("idea");
  const [sector, setSector] = useState("");
  const [askAmount, setAskAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idea.trim() || isLoading) return;

    onSubmit({
      idea: idea.trim(),
      stage,
      sector: sector.trim() || undefined,
      askAmount: askAmount.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Main Pitch Input */}
      <div>
        <label
          htmlFor="idea"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Your Startup Idea *
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your startup idea in detail. What problem are you solving? Who are your customers? What's your solution?"
          rows={5}
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border text-base resize-none transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
          style={{
            background: "var(--card)",
            borderColor: "var(--card-border)",
            color: "var(--foreground)",
          }}
        />
        <p className="mt-1.5 text-xs" style={{ color: "var(--muted)" }}>
          Be specific — the more detail you provide, the better the feedback.
        </p>
      </div>

      {/* Stage Selection */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Current Stage
        </label>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStage(s.value)}
              disabled={isLoading}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50 cursor-pointer"
              style={{
                background: stage === s.value ? "var(--accent)" : "var(--card)",
                color: stage === s.value ? "#fff" : "var(--foreground)",
                border: `1px solid ${
                  stage === s.value ? "var(--accent)" : "var(--card-border)"
                }`,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Optional Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="sector"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Sector (optional)
          </label>
          <input
            id="sector"
            type="text"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="e.g., Fintech, AI, Healthcare"
            disabled={isLoading}
            className="w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
            style={{
              background: "var(--card)",
              borderColor: "var(--card-border)",
              color: "var(--foreground)",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="askAmount"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Funding Ask (optional)
          </label>
          <input
            id="askAmount"
            type="text"
            value={askAmount}
            onChange={(e) => setAskAmount(e.target.value)}
            placeholder="e.g., $500K, $2M"
            disabled={isLoading}
            className="w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
            style={{
              background: "var(--card)",
              borderColor: "var(--card-border)",
              color: "var(--foreground)",
            }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!idea.trim() || isLoading}
        className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        style={{
          background: isLoading ? "var(--muted)" : "var(--accent)",
        }}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
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
            Analyzing with AI...
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Get Investor Feedback
          </>
        )}
      </button>
    </form>
  );
}

export default PitchForm;
