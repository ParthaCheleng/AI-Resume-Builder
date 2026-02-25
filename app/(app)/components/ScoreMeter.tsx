"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../hooks/useResumeStore";
import { calculateATSScore } from "../utils/scoring";
import { generateSuggestions } from "../utils/suggestions";

export default function ScoreMeter() {
    const data = useResumeStore((state) => state.data);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Wait for hydration

    const score = calculateATSScore(data);
    const suggestions = generateSuggestions(data);

    // Determine color based on score thresholds
    let scoreColor = "#EF4444"; // Red (0-40) Needs Work
    let scoreLabel = "Needs Work";

    if (score >= 71) {
        scoreColor = "#22C55E"; // Green (71-100) Strong Resume
        scoreLabel = "Strong Resume";
    } else if (score >= 41) {
        scoreColor = "#F59E0B"; // Amber (41-70) Getting There
        scoreLabel = "Getting There";
    }

    // Circle properties
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="card space-y-4" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px",
            border: "1px solid #E5E5E5",
            borderRadius: "12px",
            backgroundColor: "white"
        }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-inter)", margin: 0, alignSelf: "flex-start", width: "100%", borderBottom: "1px solid #E5E5E5", paddingBottom: "12px", marginBottom: "8px" }}>
                ATS Readiness Score
            </h3>

            {/* Circular Progress Indicator */}
            <div style={{ position: "relative", width: "120px", height: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                    {/* Background circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="#E5E5E5"
                        strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke={scoreColor}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.5s ease-out, stroke 0.5s ease-out" }}
                    />
                </svg>
                <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "28px", fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                        {score}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#666", marginTop: "2px" }}>
                        / 100
                    </span>
                </div>
            </div>

            <div style={{
                backgroundColor: `${scoreColor}15`,
                color: scoreColor,
                padding: "8px 16px",
                borderRadius: "20px",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.5px"
            }}>
                {scoreLabel}
            </div>

            {suggestions.length > 0 && (
                <div style={{ width: "100%", marginTop: "16px" }} className="space-y-2">
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#666", margin: 0, borderBottom: "1px solid #E5E5E5", paddingBottom: "8px" }}>
                        Improvement Suggestions:
                    </p>
                    <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "13px", color: "#444", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {suggestions.map((sug, idx) => (
                            <li key={idx} style={{ lineHeight: 1.4 }}>{sug}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
