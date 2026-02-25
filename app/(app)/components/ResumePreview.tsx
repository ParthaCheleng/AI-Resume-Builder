import React from "react";
import { ResumeData } from "../types/resume";

interface ResumePreviewProps {
    data: ResumeData;
    template: "classic" | "modern" | "minimal";
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
    const { personalInfo, summary, education, experience, projects, skills, links } = data;

    const getTemplateStyles = () => {
        switch (template) {
            case "modern":
                return {
                    headerFont: "var(--font-inter)",
                    headerSize: "28px",
                    bodyFont: "var(--font-inter)",
                    sectionTitleAlign: "left" as const,
                    divider: "1px solid #E5E5E5",
                    accentColor: "var(--accent-color)", // Using deep red for small accents
                    spacing: "var(--spacing-4)"
                };
            case "minimal":
                return {
                    headerFont: "var(--font-inter)",
                    headerSize: "24px",
                    bodyFont: "var(--font-inter)",
                    sectionTitleAlign: "left" as const,
                    divider: "none",
                    accentColor: "#111", // Pure black for minimal
                    spacing: "var(--spacing-5)"
                };
            case "classic":
            default:
                return {
                    headerFont: "var(--font-playfair)",
                    headerSize: "32px",
                    bodyFont: "var(--font-inter)",
                    sectionTitleAlign: "center" as const,
                    divider: "1px solid #111", // Strong black divider
                    accentColor: "#111",
                    spacing: "var(--spacing-4)"
                };
        }
    };

    const styles = getTemplateStyles();

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", border: "1px solid #CCC", minHeight: "1000px", padding: styles.spacing, backgroundColor: "white", color: "black", fontFamily: styles.bodyFont, transition: "all 0.3s ease" }}>

            {/* HEADER SECTION */}
            <div style={{ textAlign: template === "minimal" ? "left" : "center", marginBottom: styles.spacing, wordBreak: "break-word" }}>
                <h1 style={{ fontSize: styles.headerSize, margin: 0, fontFamily: styles.headerFont, fontWeight: 700, color: styles.accentColor }}>
                    {personalInfo.fullName || "YOUR NAME"}
                </h1>
                <div style={{ fontSize: "14px", color: "#444", marginTop: "8px" }}>
                    {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" • ")}
                    {links.linkedin && ` • ${links.linkedin}`}
                    {links.github && ` • ${links.github}`}
                </div>
            </div>

            {/* SUMMARY */}
            {summary.trim() !== "" && (
                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", borderBottom: styles.divider, paddingBottom: "4px", marginBottom: "8px", fontWeight: 700, color: styles.accentColor, textAlign: styles.sectionTitleAlign }}>
                        Professional Summary
                    </h2>
                    <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap", color: "#222" }}>
                        {summary}
                    </p>
                </div>
            )}

            {/* EXPERIENCE */}
            {experience.length > 0 && (
                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", borderBottom: styles.divider, paddingBottom: "4px", marginBottom: "8px", fontWeight: 700, color: styles.accentColor, textAlign: styles.sectionTitleAlign }}>
                        Experience
                    </h2>
                    {experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: "16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px", color: "#111" }}>
                                <span>{exp.title}</span>
                                <span>{exp.date}</span>
                            </div>
                            <div style={{ fontStyle: "italic", fontSize: "14px", marginBottom: "4px", color: "#333" }}>{exp.company}</div>
                            <ul style={{ fontSize: "14px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6, color: "#222" }}>
                                {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", borderBottom: styles.divider, paddingBottom: "4px", marginBottom: "8px", fontWeight: 700, color: styles.accentColor, textAlign: styles.sectionTitleAlign }}>
                        Education
                    </h2>
                    {education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: "8px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px", color: "#111" }}>
                                <span>{edu.school}</span>
                                <span>{edu.date}</span>
                            </div>
                            <div style={{ fontSize: "14px", fontStyle: "italic", marginTop: "2px", color: "#333" }}>{edu.degree}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", borderBottom: styles.divider, paddingBottom: "4px", marginBottom: "8px", fontWeight: 700, color: styles.accentColor, textAlign: styles.sectionTitleAlign }}>
                        Projects
                    </h2>
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: "12px" }}>
                            <div style={{ fontWeight: 700, fontSize: "14px", color: "#111" }}>{proj.name}</div>
                            <ul style={{ fontSize: "14px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6, color: "#222" }}>
                                {proj.description.split('\n').filter(Boolean).map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* SKILLS */}
            {skills.trim() !== "" && (
                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", borderBottom: styles.divider, paddingBottom: "4px", marginBottom: "8px", fontWeight: 700, color: styles.accentColor, textAlign: styles.sectionTitleAlign }}>
                        Skills
                    </h2>
                    <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.6, color: "#222" }}>{skills}</p>
                </div>
            )}

        </div>
    );
}
