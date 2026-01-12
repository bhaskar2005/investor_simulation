"use client";

import React from "react";

const INTEREST_COLORS = {
  "Very High": { bg: "var(--success-light)", text: "var(--success)" },
  High: { bg: "var(--success-light)", text: "var(--success)" },
  Moderate: { bg: "var(--warning-light)", text: "var(--warning)" },
  Low: { bg: "var(--danger-light)", text: "var(--danger)" },
  Pass: { bg: "var(--danger-light)", text: "var(--danger)" },
};

function formatCurrency(amount) {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

function ScoreCards({ response }) {
  const interestColor = INTEREST_COLORS[response.interestLevel] || {
    bg: "var(--card)",
    text: "var(--muted)",
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Interest Level */}
      <div
        className="p-4 rounded-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        <p
          className="text-xs font-medium mb-1"
          style={{ color: "var(--muted)" }}
        >
          Interest Level
        </p>
        <span
          className="inline-block px-2.5 py-1 rounded-full text-sm font-semibold"
          style={{
            background: interestColor.bg,
            color: interestColor.text,
          }}
        >
          {response.interestLevel}
        </span>
      </div>

      {/* Interest Score */}
      <div
        className="p-4 rounded-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        <p
          className="text-xs font-medium mb-1"
          style={{ color: "var(--muted)" }}
        >
          Score
        </p>
        <div className="flex items-baseline gap-1">
          <span
            className="text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            {response.interestScore}
          </span>
          <span className="text-sm" style={{ color: "var(--muted)" }}>
            / 10
          </span>
        </div>
      </div>

      {/* Valuation Range */}
      <div
        className="p-4 rounded-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        <p
          className="text-xs font-medium mb-1"
          style={{ color: "var(--muted)" }}
        >
          Valuation Range
        </p>
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {formatCurrency(response.valuationRange.low)} -{" "}
          {formatCurrency(response.valuationRange.high)}
        </p>
      </div>

      {/* Investment Amount */}
      <div
        className="p-4 rounded-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        <p
          className="text-xs font-medium mb-1"
          style={{ color: "var(--muted)" }}
        >
          Would Invest
        </p>
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {formatCurrency(response.investmentAmount.min)} -{" "}
          {formatCurrency(response.investmentAmount.max)}
        </p>
      </div>
    </div>
  );
}

export default ScoreCards;
