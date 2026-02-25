"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../hooks/useResumeStore";

export default function PreviewPage() {
    const [mounted, setMounted] = useState(false);
    const data = useResumeStore((state) => state.data);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ padding: "var(--spacing-5)" }}>Loading Preview...</div>;
    }

    const { personalInfo, summary, education, experience, projects, skills, links } = data;

    return (
        <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "var(--spacing-5)", color: "black", fontFamily: "var(--font-inter)" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", border: "1px solid #CCC", minHeight: "1000px", padding: "var(--spacing-5)", backgroundColor: "white" }}>

                <div style={{ textAlign: "center", marginBottom: "var(--spacing-4)", wordBreak: "break-word" }}>
                    <h1 style={{ fontSize: "32px", margin: 0, fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
                        {personalInfo.fullName || "YOUR NAME"}
                    </h1>
                    <div style={{ fontSize: "14px", color: "#333", marginTop: "8px" }}>
                        {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" • ")}
                        {links.linkedin && ` • ${links.linkedin}`}
                        {links.github && ` • ${links.github}`}
                    </div>
                </div>

                {summary.trim() !== "" && (
                    <div style={{ marginBottom: "var(--spacing-3)" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Professional Summary</h2>
                        <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                            {summary}
                        </p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div style={{ marginBottom: "var(--spacing-3)" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Experience</h2>
                        {experience.map(exp => (
                            <div key={exp.id} style={{ marginBottom: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px" }}>
                                    <span>{exp.title}</span>
                                    <span>{exp.date}</span>
                                </div>
                                <div style={{ fontStyle: "italic", fontSize: "14px", marginBottom: "4px" }}>{exp.company}</div>
                                <ul style={{ fontSize: "14px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6 }}>
                                    {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {education.length > 0 && (
                    <div style={{ marginBottom: "var(--spacing-3)" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Education</h2>
                        {education.map(edu => (
                            <div key={edu.id} style={{ marginBottom: "8px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px" }}>
                                    <span>{edu.school}</span>
                                    <span>{edu.date}</span>
                                </div>
                                <div style={{ fontSize: "14px", fontStyle: "italic", marginTop: "2px" }}>{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                )}

                {projects.length > 0 && (
                    <div style={{ marginBottom: "var(--spacing-3)" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Projects</h2>
                        {projects.map(proj => (
                            <div key={proj.id} style={{ marginBottom: "12px" }}>
                                <div style={{ fontWeight: 700, fontSize: "14px" }}>{proj.name}</div>
                                <ul style={{ fontSize: "14px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6 }}>
                                    {proj.description.split('\n').filter(Boolean).map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {skills.trim() !== "" && (
                    <div style={{ marginBottom: "var(--spacing-3)" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Skills</h2>
                        <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.6 }}>{skills}</p>
                    </div>
                )}

            </div>
        </div>
    );
}
