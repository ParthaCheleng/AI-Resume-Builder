"use client";

import React from "react";
import { useBuilder } from "../context/BuilderContext";

export default function ProofFooter() {
    const { artifacts } = useBuilder();

    // Basic dummy checks based on artifacts completion
    const uiBuilt = !!artifacts[2]; // example thresholds
    const logicWorking = !!artifacts[5];
    const testPassed = !!artifacts[7];
    const deployed = !!artifacts[8];

    return (
        <footer style={{
            backgroundColor: "white",
            borderTop: "1px solid #E5E5E5",
            padding: "var(--spacing-3)",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20
        }}>
            <div style={{
                maxWidth: "var(--max-text-width)",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div style={{ display: "flex", gap: "var(--spacing-4)", fontSize: "14px", fontWeight: 500 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={uiBuilt} readOnly disabled />
                        <span>UI Built</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={logicWorking} readOnly disabled />
                        <span>Logic Working</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={testPassed} readOnly disabled />
                        <span>Test Passed</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={deployed} readOnly disabled />
                        <span>Deployed</span>
                    </label>
                </div>
            </div>
        </footer>
    );
}
