"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useBuilder } from "../context/BuilderContext";

export default function SecondaryPanel() {
    const pathname = usePathname();
    const { unlockStep, artifacts } = useBuilder();
    const [copied, setCopied] = useState(false);

    let stepNumber = 0;
    const match = pathname?.match(/\/rb\/0(\d)-/);
    if (match) {
        stepNumber = parseInt(match[1], 10);
    }

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleProvideArtifact = () => {
        if (stepNumber > 0) {
            // Create a dummy artifact representing proof
            unlockStep(stepNumber, `artifact_step_${stepNumber}_` + new Date().toISOString());
            alert(`Artifact for Step ${stepNumber} uploaded successfully! Next step is unlocked.`);
        }
    };

    // If not on a step page, don't show panel content
    if (!stepNumber) return null;

    return (
        <div className="space-y-4" style={{ position: "sticky", top: "80px" }}>
            <div>
                <h3 style={{ fontSize: "18px", marginBottom: "var(--spacing-1)" }}>Step {stepNumber} Details</h3>
                <p style={{ fontSize: "14px", color: "#666" }}>
                    Read the requirements in the main workspace carefully. Copy the prompt below into Lovable to generate your UI.
                </p>
            </div>

            <div className="space-y-2">
                <label style={{ fontSize: "14px", fontWeight: 600, display: "block" }}>
                    Copy This Into Lovable
                </label>
                <textarea
                    readOnly
                    rows={5}
                    style={{ width: "100%", resize: "none" }}
                    value={`Please build the UI for AI Resume Builder Step ${stepNumber} according to the spec...`}
                />
                <button className="btn-secondary" style={{ width: "100%" }} onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <button className="btn-primary" style={{ width: "100%", padding: "var(--spacing-2)" }}>
                Build in Lovable
            </button>

            <div className="space-y-2" style={{ marginTop: "var(--spacing-4)" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 600, borderBottom: "1px solid #ECECEC", paddingBottom: "8px" }}>
                    Verification
                </h4>
                <div style={{ display: "flex", gap: "var(--spacing-1)" }}>
                    <button className="btn-secondary" style={{ flex: 1, color: "var(--success-color)", borderColor: "var(--success-color)" }} onClick={handleProvideArtifact}>
                        It Worked
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, color: "var(--warning-color)", borderColor: "var(--warning-color)" }}>
                        Error
                    </button>
                </div>

                <button
                    className="btn-secondary"
                    style={{ width: "100%" }}
                    onClick={handleProvideArtifact}
                    disabled={!!artifacts[stepNumber]}
                >
                    {artifacts[stepNumber] ? "Artifact Provided ✓" : "Add Screenshot / Artifact"}
                </button>
            </div>
        </div>
    );
}
