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
    let scoreColor = "var(--accent-color)"; // Default deep red
    if (score >= 80) scoreColor = "var(--success-color)";
    else if (score >= 50) scoreColor = "var(--warning-color)";

    return (
        <div className="card space-y-3" style={{ borderLeft: `4px solid ${scoreColor}` }}>
            <div className="flex-between">
                <h3 style={{ fontSize: "16px", fontWeight: 600, fontFamily: "var(--font-inter)", margin: 0 }}>
                    ATS Readiness Score
                </h3>
                <span style={{ fontSize: "24px", fontWeight: 700, color: scoreColor }}>
                    {score}<span style={{ fontSize: "14px", color: "#666" }}>/100</span>
                </span>
            </div>

            <div style={{ width: "100%", height: "8px", backgroundColor: "#E5E5E5", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{
                    height: "100%",
                    width: `${score}%`,
                    backgroundColor: scoreColor,
                    transition: "width 300ms ease, background-color 300ms ease"
                }} />
            </div>

            {suggestions.length > 0 && (
                <div style={{ marginTop: "var(--spacing-2)" }} className="space-y-1">
                    <p style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 600, color: "#666", margin: 0 }}>Suggestions to improve:</p>
                    <ul style={{ paddingLeft: "var(--spacing-3)", margin: 0, fontSize: "14px", color: "#444" }}>
                        {suggestions.map((sug, idx) => (
                            <li key={idx}>{sug}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
