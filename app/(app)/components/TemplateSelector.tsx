import React from "react";
import { ResumeData } from "../types/resume";

interface Props {
    currentTemplate: ResumeData["template"];
    setTemplate: (tpl: ResumeData["template"]) => void;
    currentThemeColor: string;
    setThemeColor: (color: string) => void;
}

const THEME_COLORS = [
    { name: "Teal", value: "hsl(168, 60%, 40%)" },
    { name: "Navy", value: "hsl(220, 60%, 35%)" },
    { name: "Burgundy", value: "hsl(345, 60%, 35%)" },
    { name: "Forest", value: "hsl(150, 50%, 30%)" },
    { name: "Charcoal", value: "hsl(0, 0%, 25%)" }
];

export default function TemplateSelector({ currentTemplate, setTemplate, currentThemeColor, setThemeColor }: Props) {
    const templates: ResumeData["template"][] = ["classic", "modern", "minimal"];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>

            {/* Template Thumbnails */}
            <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Layout</div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {templates.map(tpl => {
                        const isActive = currentTemplate === tpl;

                        return (
                            <div
                                key={tpl}
                                onClick={() => setTemplate(tpl)}
                                style={{
                                    width: "120px",
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "8px",
                                    position: "relative"
                                }}
                            >
                                {/* Wireframe Box */}
                                <div style={{
                                    width: "100%",
                                    height: "160px",
                                    backgroundColor: "white",
                                    border: isActive ? "2px solid #3b82f6" : "1px solid #E5E5E5",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    boxShadow: isActive ? "0 4px 12px rgba(59, 130, 246, 0.2)" : "0 2px 4px rgba(0,0,0,0.05)",
                                    transition: "all 0.2s ease",
                                    position: "relative",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: tpl === "modern" ? "row" : "column",
                                    gap: "4px"
                                }}>
                                    {/* Active Checkmark Overlay */}
                                    {isActive && (
                                        <div style={{
                                            position: "absolute",
                                            top: "6px",
                                            right: "6px",
                                            backgroundColor: "#3b82f6",
                                            color: "white",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "10px",
                                            fontWeight: "bold",
                                            zIndex: 2
                                        }}>
                                            ✓
                                        </div>
                                    )}

                                    {/* Wireframe Drawings based on type */}
                                    {tpl === "classic" && (
                                        <>
                                            <div style={{ height: "12px", width: "60%", backgroundColor: "#333", margin: "0 auto 8px auto" }} />
                                            <div style={{ height: "4px", width: "100%", backgroundColor: "#111", marginBottom: "4px" }} />
                                            <div style={{ height: "4px", width: "100%", backgroundColor: "#E5E5E5", marginBottom: "2px" }} />
                                            <div style={{ height: "4px", width: "80%", backgroundColor: "#E5E5E5", marginBottom: "8px" }} />
                                            <div style={{ height: "4px", width: "100%", backgroundColor: "#111", marginBottom: "4px" }} />
                                            <div style={{ height: "4px", width: "100%", backgroundColor: "#E5E5E5", marginBottom: "2px" }} />
                                            <div style={{ height: "4px", width: "90%", backgroundColor: "#E5E5E5", marginBottom: "2px" }} />
                                            <div style={{ height: "4px", width: "70%", backgroundColor: "#E5E5E5" }} />
                                        </>
                                    )}

                                    {tpl === "modern" && (
                                        <>
                                            {/* Left sidebar */}
                                            <div style={{ width: "35%", height: "100%", backgroundColor: currentThemeColor, opacity: isActive ? 1 : 0.4 }} />
                                            {/* Right content */}
                                            <div style={{ width: "60%", height: "100%", display: "flex", flexDirection: "column", gap: "4px", paddingTop: "8px" }}>
                                                <div style={{ height: "8px", width: "80%", backgroundColor: "#333", marginBottom: "8px" }} />
                                                <div style={{ height: "4px", width: "100%", backgroundColor: "#E5E5E5" }} />
                                                <div style={{ height: "4px", width: "100%", backgroundColor: "#E5E5E5" }} />
                                                <div style={{ height: "4px", width: "80%", backgroundColor: "#E5E5E5", marginBottom: "8px" }} />
                                                <div style={{ height: "4px", width: "100%", backgroundColor: "#E5E5E5" }} />
                                                <div style={{ height: "4px", width: "90%", backgroundColor: "#E5E5E5" }} />
                                            </div>
                                        </>
                                    )}

                                    {tpl === "minimal" && (
                                        <div style={{ padding: "8px 0" }}>
                                            <div style={{ height: "10px", width: "50%", backgroundColor: "#333", marginBottom: "12px" }} />
                                            <div style={{ height: "6px", width: "40%", backgroundColor: "#999", marginBottom: "4px" }} />
                                            <div style={{ height: "4px", width: "100%", backgroundColor: "#E5E5E5", marginBottom: "2px" }} />
                                            <div style={{ height: "4px", width: "80%", backgroundColor: "#E5E5E5", marginBottom: "12px" }} />
                                            <div style={{ height: "6px", width: "40%", backgroundColor: "#999", marginBottom: "4px" }} />
                                            <div style={{ height: "4px", width: "100%", backgroundColor: "#E5E5E5", marginBottom: "2px" }} />
                                            <div style={{ height: "4px", width: "90%", backgroundColor: "#E5E5E5", marginBottom: "2px" }} />
                                        </div>
                                    )}
                                </div>

                                {/* Label */}
                                <span style={{
                                    fontSize: "13px",
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? "#111" : "#666",
                                    textTransform: "capitalize"
                                }}>
                                    {tpl}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Theme Colors */}
            <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Accent Color</div>
                <div style={{ display: "flex", gap: "12px" }}>
                    {THEME_COLORS.map(color => {
                        const isActive = currentThemeColor === color.value;
                        return (
                            <button
                                key={color.name}
                                onClick={() => setThemeColor(color.value)}
                                title={color.name}
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    backgroundColor: color.value,
                                    border: isActive ? "2px solid white" : "none",
                                    boxShadow: isActive ? `0 0 0 2px ${color.value}, 0 4px 8px rgba(0,0,0,0.1)` : "0 2px 4px rgba(0,0,0,0.1)",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    transform: isActive ? "scale(1.1)" : "scale(1)",
                                    padding: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {isActive && <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>✓</span>}
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
