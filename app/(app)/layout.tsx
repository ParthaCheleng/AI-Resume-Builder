"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navLinks = [
        { label: "Builder", path: "/builder" },
        { label: "Preview", path: "/preview" },
        { label: "Proof", path: "/proof" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <header style={{
                display: "flex",
                justifyContent: "center",
                padding: "var(--spacing-3)",
                borderBottom: "1px solid #E5E5E5",
                backgroundColor: "white",
                position: "sticky",
                top: 0,
                zIndex: 10
            }}>
                <nav style={{ display: "flex", gap: "var(--spacing-5)" }}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                href={link.path}
                                style={{
                                    textDecoration: "none",
                                    fontWeight: isActive ? 600 : 400,
                                    fontSize: "16px",
                                    color: isActive ? "var(--text-primary)" : "#666",
                                    borderBottom: isActive ? "2px solid var(--accent-color)" : "2px solid transparent",
                                    paddingBottom: "4px",
                                    transition: "all var(--transition-speed) ease"
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </header>

            <main style={{ flex: 1 }}>
                {children}
            </main>
        </div>
    );
}
