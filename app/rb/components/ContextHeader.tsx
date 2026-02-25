import React from "react";

export default function ContextHeader({ title, subtext }: { title: string, subtext: string }) {
    return (
        <div style={{ marginBottom: "var(--spacing-4)" }}>
            <h1 style={{ fontSize: "36px", color: "var(--text-primary)", marginBottom: "var(--spacing-1)" }}>
                {title}
            </h1>
            <p style={{ fontSize: "18px", color: "#555", margin: 0 }}>
                {subtext}
            </p>
        </div>
    );
}
