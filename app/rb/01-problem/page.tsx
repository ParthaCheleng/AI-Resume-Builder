import React from "react";
import ContextHeader from "../components/ContextHeader";

export default function ProblemPage() {
    return (
        <div>
            <ContextHeader
                title="01 - Problem Definition"
                subtext="Define the core problem the AI Resume Builder solves."
            />

            <div className="card space-y-3">
                <h2 style={{ fontSize: "24px" }}>System Requirements</h2>
                <ul style={{ paddingLeft: "var(--spacing-3)" }} className="space-y-1">
                    <li>Identify user pain points in resume creation.</li>
                    <li>Establish the baseline capabilities of the AI generator.</li>
                    <li>Define success metrics for the initial release.</li>
                </ul>
            </div>
        </div>
    );
}
