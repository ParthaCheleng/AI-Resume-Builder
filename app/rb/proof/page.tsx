"use client";

import React, { useState } from "react";
import ContextHeader from "../components/ContextHeader";
import { useBuilder } from "../context/BuilderContext";

export default function ProofPage() {
    const { artifacts } = useBuilder();
    const [copied, setCopied] = useState(false);

    const steps = [
        { id: 1, name: "Problem Definition" },
        { id: 2, name: "Market Analysis" },
        { id: 3, name: "Architecture" },
        { id: 4, name: "High Level Design" },
        { id: 5, name: "Low Level Design" },
        { id: 6, name: "Build" },
        { id: 7, name: "Test" },
        { id: 8, name: "Ship" },
    ];

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <ContextHeader
                title="Proof of Work"
                subtext="Final submission and verification of the AI Resume Builder project."
            />

            <div style={{ display: "flex", gap: "var(--spacing-4)", marginTop: "var(--spacing-4)" }}>
                {/* Left Column: Step Statuses */}
                <div style={{ flex: 1 }} className="space-y-4">
                    <h2 style={{ fontSize: "24px", fontFamily: "var(--font-playfair)" }}>Step Completion</h2>
                    <div className="card space-y-2">
                        {steps.map((step) => {
                            const completed = !!artifacts[step.id];
                            return (
                                <div key={step.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: step.id === 8 ? "none" : "1px solid #eee" }}>
                                    <span style={{ fontWeight: 500, color: completed ? "var(--text-primary)" : "#888" }}>
                                        {step.id}. {step.name}
                                    </span>
                                    <span style={{
                                        padding: "4px 12px",
                                        borderRadius: "16px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        backgroundColor: completed ? "var(--success-color)" : "#eee",
                                        color: completed ? "white" : "#888"
                                    }}>
                                        {completed ? "Completed" : "Pending"}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Submission Links */}
                <div style={{ flex: 1 }} className="space-y-4">
                    <h2 style={{ fontSize: "24px", fontFamily: "var(--font-playfair)" }}>Final Submission</h2>
                    <div className="card space-y-3">
                        <div className="space-y-1">
                            <label style={{ fontSize: "14px", fontWeight: 600 }}>Lovable Link</label>
                            <input type="url" placeholder="https://lovable.dev/..." style={{ width: "100%" }} />
                        </div>
                        <div className="space-y-1">
                            <label style={{ fontSize: "14px", fontWeight: 600 }}>GitHub Link</label>
                            <input type="url" placeholder="https://github.com/..." style={{ width: "100%" }} />
                        </div>
                        <div className="space-y-1">
                            <label style={{ fontSize: "14px", fontWeight: 600 }}>Deploy Link</label>
                            <input type="url" placeholder="https://your-app.vercel.app/..." style={{ width: "100%" }} />
                        </div>

                        <div style={{ paddingTop: "var(--spacing-2)" }}>
                            <button className="btn-primary" style={{ width: "100%" }} onClick={handleCopy}>
                                {copied ? "Copied to Clipboard!" : "Copy Final Submission"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
