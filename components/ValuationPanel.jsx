"use client";

import React from "react";

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

function ValuationPanel({ responses }) {
  // Calculate average valuation across all investors
  const avgLow =
    responses.reduce((sum, r) => sum + r.valuationRange.low, 0) /
    responses.length;
  const avgHigh =
    responses.reduce((sum, r) => sum + r.valuationRange.high, 0) /
    responses.length;
  const avgScore =
    responses.reduce((sum, r) => sum + r.interestScore, 0) / responses.length;

  // Find min and max for the range visualization
  const minVal = Math.min(...responses.map((r) => r.valuationRange.low));
  const maxVal = Math.max(...responses.map((r) => r.valuationRange.high));

  return (
    <div
      className="p-5 rounded-xl"
      style={{
        background: "var(--card)",
        border: "1px solid var(--card-border)",
      }}
    >
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "var(--foreground)" }}
      >
        Consensus Valuation
      </h3>

      {/* Main Valuation Display */}
      <div className="text-center mb-4">
        <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
          Estimated Range
        </p>
        <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
          {formatCurrency(avgLow)} — {formatCurrency(avgHigh)}
        </p>
      </div>

      {/* Visual Range Bar */}
      <div className="mb-4">
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "var(--card-border)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-light), var(--accent))",
              width: `${Math.min((avgScore / 10) * 100, 100)}%`,
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {formatCurrency(minVal)}
          </span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {formatCurrency(maxVal)}
          </span>
        </div>
      </div>

      {/* Average Interest */}
      <div
        className="flex items-center justify-between pt-3 border-t"
        style={{ borderColor: "var(--card-border)" }}
      >
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          Avg. Interest Score
        </span>
        <span className="font-semibold" style={{ color: "var(--foreground)" }}>
          {avgScore.toFixed(1)} / 10
        </span>
      </div>
    </div>
  );
}

export default ValuationPanel;
