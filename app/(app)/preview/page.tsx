"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../hooks/useResumeStore";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";

export default function PreviewPage() {
    const [mounted, setMounted] = useState(false);
    const store = useResumeStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ padding: "var(--spacing-5)" }}>Loading Preview...</div>;
    }

    const { data, setTemplate } = store;

    return (
        <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh", padding: "var(--spacing-5)", color: "black", fontFamily: "var(--font-inter)" }}>
            <TemplateSelector currentTemplate={data.template} setTemplate={setTemplate} />
            <ResumePreview data={data} template={data.template} />
        </div>
    );
}
