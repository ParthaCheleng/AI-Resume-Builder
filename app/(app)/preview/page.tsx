"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../hooks/useResumeStore";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import { generatePlainTextResume } from "../utils/export";

export default function PreviewPage() {
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const store = useResumeStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ padding: "var(--spacing-5)" }}>Loading Preview...</div>;
    }

    const { data, setTemplate } = store;

    const validateExport = () => {
        const isNameMissing = !data.personalInfo.fullName.trim();
        const isCoreMissing = data.projects.length === 0 && data.experience.length === 0;

        if (isNameMissing || isCoreMissing) {
            return window.confirm("Your resume may look incomplete. Continue anyway?");
        }
        return true; // OK to proceed
    };

    const handlePrint = () => {
        if (validateExport()) {
            window.print();
        }
    };

    const handleCopyText = async () => {
        if (validateExport()) {
            try {
                const textToCopy = generatePlainTextResume(data);
                await navigator.clipboard.writeText(textToCopy);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Clear success message after 2s
            } catch (err) {
                console.error("Failed to copy text:", err);
                alert("Failed to copy text to clipboard.");
            }
        }
    };

    return (
        <div className="preview-container" style={{ backgroundColor: "#F9F9F9", minHeight: "100vh", padding: "var(--spacing-5)", color: "black", fontFamily: "var(--font-inter)" }}>

            {/* Top Action Bar */}
            <div className="no-print" style={{
                maxWidth: "800px",
                margin: "0 auto var(--spacing-4) auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #E5E5E5"
            }}>
                <TemplateSelector currentTemplate={data.template} setTemplate={setTemplate} />

                <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={handlePrint} className="btn-primary">
                        Print / Save as PDF
                    </button>
                    <button onClick={handleCopyText} className="btn-secondary">
                        {copied ? "Copied!" : "Copy Resume as Text"}
                    </button>
                </div>
            </div>

            <div className="print-wrapper">
                <ResumePreview data={data} template={data.template} />
            </div>

        </div>
    );
}
