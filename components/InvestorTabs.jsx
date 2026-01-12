"use client";

import React from "react";

const INVESTOR_COLORS = {
  a16z: "#ff6600",
  peter_thiel: "#1a1a2e",
  sam_altman: "#10a37f",
  yc_partner: "#f26625",
  naval_ravikant: "#1da1f2",
  balaji_srinivasan: "#8b5cf6",
};

const INVESTOR_INITIALS = {
  a16z: "a16z",
  peter_thiel: "PT",
  sam_altman: "SA",
  yc_partner: "YC",
  naval_ravikant: "NR",
  balaji_srinivasan: "BS",
};

function InvestorTabs({ investors, activeInvestor, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {investors.map((investor) => {
        const isActive = activeInvestor === investor.investorId;
        const color = INVESTOR_COLORS[investor.investorId] || "#6b7280";

        return (
          <button
            key={investor.investorId}
            onClick={() => onSelect(investor.investorId)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all shrink-0"
            style={{
              background: isActive ? color : "var(--card)",
              color: isActive ? "#fff" : "var(--foreground)",
              border: `1px solid ${isActive ? color : "var(--card-border)"}`,
              boxShadow: isActive ? `0 4px 12px ${color}40` : "none",
            }}
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: isActive ? "rgba(255,255,255,0.2)" : color,
                color: "#fff",
              }}
            >
              {INVESTOR_INITIALS[investor.investorId]}
            </span>
            <span className="hidden sm:inline">{investor.investorName}</span>
          </button>
        );
      })}
    </div>
  );
}

export default InvestorTabs;
