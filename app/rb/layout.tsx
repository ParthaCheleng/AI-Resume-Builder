"use client";

import React from "react";
import { BuilderProvider } from "./context/BuilderContext";
import TopBar from "./components/TopBar";
import SecondaryPanel from "./components/SecondaryPanel";
import ProofFooter from "./components/ProofFooter";
import { usePathname } from "next/navigation";

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isProofPage = pathname === "/rb/proof";

    return (
        <BuilderProvider>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <TopBar />

                {/* Main Content Area */}
                <div style={{ flex: 1, display: "flex", paddingBottom: "var(--spacing-5)" }}>
                    {isProofPage ? (
                        <div style={{ width: "100%", padding: "var(--spacing-4) var(--spacing-5)" }}>
                            {children}
                        </div>
                    ) : (
                        <>
                            {/* Primary Workspace (70%) */}
                            <div style={{ flex: "0 0 70%", padding: "var(--spacing-4) var(--spacing-5)", borderRight: "1px solid #E5E5E5" }}>
                                {children}
                            </div>

                            {/* Secondary Panel (30%) */}
                            <div style={{ flex: "0 0 30%", padding: "var(--spacing-4) var(--spacing-3)", backgroundColor: "white" }}>
                                <SecondaryPanel />
                            </div>
                        </>
                    )}
                </div>

                <ProofFooter />
            </div>
        </BuilderProvider>
    );
}
