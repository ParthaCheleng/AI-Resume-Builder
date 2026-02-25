import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex-center" style={{ height: "calc(100vh - 70px)", flexDirection: "column", textAlign: "center", padding: "var(--spacing-4)" }}>
            <h1 style={{ fontSize: "48px", marginBottom: "var(--spacing-3)", maxWidth: "800px" }}>
                Build a Resume That Gets Read.
            </h1>
            <Link href="/builder" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ fontSize: "18px", padding: "16px 32px", borderRadius: "var(--border-radius)" }}>
                    Start Building
                </button>
            </Link>
        </div>
    );
}
