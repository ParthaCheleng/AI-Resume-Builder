"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

interface BuilderContextType {
    artifacts: Record<number, string>;
    unlockStep: (stepNumber: number, artifact: string) => void;
    isHydrated: boolean;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
    const [artifacts, setArtifacts] = useState<Record<number, string>>({});
    const [isHydrated, setIsHydrated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Load from localStorage on mount
    useEffect(() => {
        const loaded: Record<number, string> = {};
        for (let i = 1; i <= 8; i++) {
            const art = localStorage.getItem(`rb_step_${i}_artifact`);
            if (art) {
                loaded[i] = art;
            }
        }
        setArtifacts(loaded);
        setIsHydrated(true);
    }, []);

    const unlockStep = useCallback((stepNumber: number, artifact: string) => {
        localStorage.setItem(`rb_step_${stepNumber}_artifact`, artifact);
        setArtifacts((prev) => ({ ...prev, [stepNumber]: artifact }));
    }, []);

    // Gating logic
    useEffect(() => {
        if (!isHydrated || !pathname) return;

        // e.g. /rb/04-hld
        const match = pathname.match(/\/rb\/0(\d)-/);
        if (match) {
            const currentStep = parseInt(match[1], 10);
            // If we are on step N > 1, check if step N-1 has an artifact
            if (currentStep > 1 && !artifacts[currentStep - 1]) {
                // Find the highest accessible step
                let maxUnlocked = 1;
                for (let i = 1; i <= 8; i++) {
                    if (artifacts[i]) {
                        maxUnlocked = i + 1;
                    } else {
                        break;
                    }
                }

                // Ensure maxUnlocked doesn't exceed 8
                const targetStep = Math.min(maxUnlocked, 8);

                // Define route map to redirect properly
                const routeMap: Record<number, string> = {
                    1: "/rb/01-problem",
                    2: "/rb/02-market",
                    3: "/rb/03-architecture",
                    4: "/rb/04-hld",
                    5: "/rb/05-lld",
                    6: "/rb/06-build",
                    7: "/rb/07-test",
                    8: "/rb/08-ship",
                };

                router.replace(routeMap[targetStep]);
            }
        }
    }, [pathname, isHydrated, artifacts, router]);

    return (
        <BuilderContext.Provider value={{ artifacts, unlockStep, isHydrated }}>
            {children}
        </BuilderContext.Provider>
    );
}

export function useBuilder() {
    const ctx = useContext(BuilderContext);
    if (!ctx) throw new Error("useBuilder must be used within BuilderProvider");
    return ctx;
}
