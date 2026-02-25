"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useBuilder } from "../context/BuilderContext";

export default function TopBar() {
    const pathname = usePathname();
    const { artifacts } = useBuilder();

    let stepNumber = 0;
    let isProof = false;

    if (pathname === "/rb/proof") {
        isProof = true;
        stepNumber = 8;
    } else {
        const match = pathname?.match(/\/rb\/0(\d)-/);
        if (match) {
            stepNumber = parseInt(match[1], 10);
        }
    }

    let statusBadge = "In Progress";
    if (isProof) {
        statusBadge = "Shipped";
    } else if (!artifacts[stepNumber] && stepNumber === 1) {
        statusBadge = "Not Started";
    } else if (!artifacts[stepNumber]) {
        statusBadge = "In Progress";
    } else {
        statusBadge = "Complete";
    }

    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--spacing-2) var(--spacing-4)",
            borderBottom: "1px solid #E5E5E5",
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            zIndex: 10
        }}>
            <div style={{ fontWeight: 600, fontSize: "16px" }}>
                AI Resume Builder
            </div>

            <div style={{ color: "#555", fontSize: "14px", fontWeight: 500 }}>
                Project 3 — Step {stepNumber} of 8
            </div>

            <div>
                <span style={{
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor: statusBadge === "Shipped" ? "var(--success-color)" : (statusBadge === "Complete" ? "var(--success-color)" : "#eee"),
                    color: statusBadge === "Shipped" || statusBadge === "Complete" ? "white" : "var(--text-primary)",
                    border: statusBadge === "In Progress" ? "1px solid #ccc" : "none"
                }}>
                    {statusBadge}
                </span>
            </div>
        </header>
    );
}
