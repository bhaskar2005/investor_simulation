"use client";

import React from "react";
import ScoreCards from "./ScoreCards";

function InvestorCard({ response, persona }) {
  return (
    <div className="space-y-5 animate-fade-in">
      <ScoreCards response={response} />

      {/* Investor Info */}
      <div
        className="p-5 rounded-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div>
            <h3
              className="font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {persona?.name || response.investorName}
            </h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {persona?.title}
            </p>
          </div>
        </div>

        {persona?.philosophy && (
          <p
            className="text-sm italic mb-4 pl-3 border-l-2"
            style={{
              color: "var(--muted)",
              borderColor: "var(--accent)",
            }}
          >
            &ldquo;{persona.philosophy}&rdquo;
          </p>
        )}
      </div>

      {/* Feedback */}
      <div
        className="p-5 rounded-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        <h4
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--foreground)" }}
        >
          Feedback
        </h4>
        <p
          className="text-sm leading-relaxed whitespace-pre-wrap"
          style={{ color: "var(--foreground)" }}
        >
          {response.feedback}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Why Invest */}
        <div
          className="p-5 rounded-xl"
          style={{
            background: "var(--success-light)",
            border: "1px solid var(--success)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-3 flex items-center gap-2"
            style={{ color: "var(--success)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Why I&apos;d Invest
          </h4>
          <ul className="space-y-2">
            {response.reasoning.whyInvest.map((reason, i) => (
              <li
                key={i}
                className="text-sm flex items-start gap-2"
                style={{ color: "var(--foreground)" }}
              >
                <span style={{ color: "var(--success)" }}>•</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Why Pass */}
        <div
          className="p-5 rounded-xl"
          style={{
            background: "var(--danger-light)",
            border: "1px solid var(--danger)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-3 flex items-center gap-2"
            style={{ color: "var(--danger)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Concerns / Why I&apos;d Pass
          </h4>
          <ul className="space-y-2">
            {response.reasoning.whyPass.map((reason, i) => (
              <li
                key={i}
                className="text-sm flex items-start gap-2"
                style={{ color: "var(--foreground)" }}
              >
                <span style={{ color: "var(--danger)" }}>•</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Questions */}
      <div
        className="p-5 rounded-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        <h4
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--foreground)" }}
        >
          Questions I&apos;d Ask
        </h4>
        <ul className="space-y-2">
          {response.keyQuestions.map((question, i) => (
            <li
              key={i}
              className="text-sm flex items-start gap-2"
              style={{ color: "var(--foreground)" }}
            >
              <span style={{ color: "var(--accent)" }}>{i + 1}.</span>
              {question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InvestorCard;
