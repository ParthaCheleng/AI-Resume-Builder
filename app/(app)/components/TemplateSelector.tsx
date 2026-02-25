import React from "react";
import { ResumeData } from "../types/resume";

interface Props {
    currentTemplate: ResumeData["template"];
    setTemplate: (tpl: ResumeData["template"]) => void;
}

export default function TemplateSelector({ currentTemplate, setTemplate }: Props) {
    const templates: ResumeData["template"][] = ["classic", "modern", "minimal"];

    return (
        <div style={{ display: "flex", gap: "8px", marginBottom: "var(--spacing-3)", justifyContent: "center" }}>
            {templates.map(tpl => (
                <button
                    key={tpl}
                    onClick={() => setTemplate(tpl)}
                    style={{
                        padding: "8px 16px",
                        borderRadius: "var(--border-radius)",
                        border: currentTemplate === tpl ? "1px solid var(--accent-color)" : "1px solid #CCC",
                        backgroundColor: currentTemplate === tpl ? "var(--bg-color)" : "transparent",
                        color: currentTemplate === tpl ? "var(--accent-color)" : "#666",
                        cursor: "pointer",
                        fontWeight: 600,
                        textTransform: "capitalize",
                        fontSize: "14px",
                        transition: "all 0.2s ease"
                    }}
                >
                    {tpl}
                </button>
            ))}
        </div>
    );
}
