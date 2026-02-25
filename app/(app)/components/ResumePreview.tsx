import React from "react";
import { ResumeData } from "../types/resume";

interface ResumePreviewProps {
    data: ResumeData;
    template: "classic" | "modern" | "minimal";
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
    const { personalInfo, summary, education, experience, projects, skills, links, themeColor } = data;

    const getTemplateStyles = () => {
        switch (template) {
            case "modern":
                return {
                    headerFont: "var(--font-inter)",
                    headerSize: "28px",
                    bodyFont: "var(--font-inter)",
                    sectionTitleAlign: "left" as const,
                    divider: `1px solid ${themeColor}`,
                    accentColor: themeColor,
                    spacing: "var(--spacing-4)"
                };
            case "minimal":
                return {
                    headerFont: "var(--font-inter)",
                    headerSize: "24px",
                    bodyFont: "var(--font-inter)",
                    sectionTitleAlign: "left" as const,
                    divider: "none",
                    accentColor: themeColor,
                    spacing: "var(--spacing-5)"
                };
            case "classic":
            default:
                return {
                    headerFont: "var(--font-playfair)",
                    headerSize: "32px",
                    bodyFont: "var(--font-inter)",
                    sectionTitleAlign: "center" as const,
                    divider: "1px solid #111",
                    accentColor: themeColor,
                    spacing: "var(--spacing-4)"
                };
        }
    };

    const styles = getTemplateStyles();

    // Reusable Sub-components for rendering sections cleanly
    const TitleBar = ({ title }: { title: string }) => (
        <h2 style={{
            fontSize: "14px",
            textTransform: "uppercase",
            borderBottom: template === "minimal" ? "none" : styles.divider,
            paddingBottom: "4px",
            marginBottom: "8px",
            fontWeight: 700,
            color: template === "modern" ? "var(--text-primary)" : styles.accentColor, // In Modern, headers are dark, accents are dots/borders
            textAlign: styles.sectionTitleAlign,
            letterSpacing: "0.5px"
        }}>
            {title}
        </h2>
    );

    const ModernSidebarTemplate = () => (
        <div style={{ display: "flex", minHeight: "1000px", backgroundColor: "white", color: "black", fontFamily: styles.bodyFont, transition: "all 0.3s ease" }}>

            {/* Left Column (30%) - Highlighted with Theme Color */}
            <div style={{ width: "32%", backgroundColor: styles.accentColor, color: "white", padding: styles.spacing, wordBreak: "break-word" }}>
                <h1 style={{ fontSize: styles.headerSize, margin: "0 0 16px 0", fontFamily: styles.headerFont, fontWeight: 700, lineHeight: 1.2 }}>
                    {personalInfo.fullName || "YOUR NAME"}
                </h1>

                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
                    {personalInfo.email && <div><span style={{ color: "rgba(255,255,255,0.6)", marginRight: "8px" }}>✉</span>{personalInfo.email}</div>}
                    {personalInfo.phone && <div><span style={{ color: "rgba(255,255,255,0.6)", marginRight: "8px" }}>☎</span>{personalInfo.phone}</div>}
                    {personalInfo.location && <div><span style={{ color: "rgba(255,255,255,0.6)", marginRight: "8px" }}>📍</span>{personalInfo.location}</div>}
                    {links.linkedin && <div style={{ wordBreak: "break-all" }}><span style={{ color: "rgba(255,255,255,0.6)", marginRight: "8px" }}>🔗</span>{links.linkedin}</div>}
                    {links.github && <div style={{ wordBreak: "break-all" }}><span style={{ color: "rgba(255,255,255,0.6)", marginRight: "8px" }}>🐈</span>{links.github}</div>}
                </div>

                {(skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0) && (
                    <div style={{ marginTop: "16px" }}>
                        <h2 style={{ fontSize: "14px", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "4px", marginBottom: "12px", fontWeight: 700, letterSpacing: "0.5px" }}>Skills</h2>
                        <div className="space-y-4">
                            {skills.technical.length > 0 && (
                                <div style={{ fontSize: "13px", lineHeight: 1.5 }}>
                                    <strong style={{ display: "block", marginBottom: "4px", color: "rgba(255,255,255,0.8)" }}>Technical</strong>
                                    {skills.technical.join(", ")}
                                </div>
                            )}
                            {skills.soft.length > 0 && (
                                <div style={{ fontSize: "13px", lineHeight: 1.5 }}>
                                    <strong style={{ display: "block", marginBottom: "4px", color: "rgba(255,255,255,0.8)" }}>Soft Skills</strong>
                                    {skills.soft.join(", ")}
                                </div>
                            )}
                            {skills.tools.length > 0 && (
                                <div style={{ fontSize: "13px", lineHeight: 1.5 }}>
                                    <strong style={{ display: "block", marginBottom: "4px", color: "rgba(255,255,255,0.8)" }}>Tools</strong>
                                    {skills.tools.join(", ")}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column (70%) - Main content */}
            <div style={{ width: "68%", padding: styles.spacing, display: "flex", flexDirection: "column", gap: "24px" }}>

                {summary.trim() !== "" && (
                    <div>
                        <TitleBar title="Professional Summary" />
                        <p style={{ fontSize: "13px", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap", color: "#333" }}>{summary}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div>
                        <TitleBar title="Experience" />
                        {experience.map(exp => (
                            <div key={exp.id} style={{ marginBottom: "16px", pageBreakInside: "avoid" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px", color: "#111" }}>
                                    <span>{exp.title}</span>
                                    <span style={{ color: styles.accentColor }}>{exp.date}</span>
                                </div>
                                <div style={{ fontStyle: "italic", fontSize: "14px", marginBottom: "4px", color: "#444" }}>{exp.company}</div>
                                <ul style={{ fontSize: "13px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6, color: "#333" }}>
                                    {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {projects.length > 0 && (
                    <div>
                        <TitleBar title="Projects" />
                        {projects.map(proj => (
                            <div key={proj.id} style={{ marginBottom: "16px", pageBreakInside: "avoid" }}>
                                <div style={{ fontWeight: 700, fontSize: "14px", color: "#111", display: "flex", justifyContent: "space-between" }}>
                                    <span>{proj.name}</span>
                                    {(proj.liveUrl || proj.githubUrl) && (
                                        <span style={{ fontWeight: 400, fontSize: "12px", gap: "8px", display: "flex" }}>
                                            {proj.liveUrl && <a href={proj.liveUrl} style={{ color: styles.accentColor, textDecoration: "none" }}>Live</a>}
                                            {proj.githubUrl && <a href={proj.githubUrl} style={{ color: styles.accentColor, textDecoration: "none" }}>GitHub</a>}
                                        </span>
                                    )}
                                </div>
                                {proj.techStack && proj.techStack.length > 0 && (
                                    <div style={{ fontSize: "12px", color: "#666", marginTop: "2px", marginBottom: "4px" }}>
                                        <span style={{ color: styles.accentColor }}>Stack:</span> {proj.techStack.join(", ")}
                                    </div>
                                )}
                                <ul style={{ fontSize: "13px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6, color: "#333" }}>
                                    {proj.description.split('\n').filter(Boolean).map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {education.length > 0 && (
                    <div>
                        <TitleBar title="Education" />
                        {education.map(edu => (
                            <div key={edu.id} style={{ marginBottom: "8px", pageBreakInside: "avoid" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px", color: "#111" }}>
                                    <span>{edu.school}</span>
                                    <span style={{ color: styles.accentColor }}>{edu.date}</span>
                                </div>
                                <div style={{ fontSize: "14px", fontStyle: "italic", marginTop: "2px", color: "#444" }}>{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const SingleColumnTemplate = () => (
        <div style={{ maxWidth: "800px", margin: "0 auto", border: template === "minimal" ? "none" : "1px solid #CCC", minHeight: "1000px", padding: styles.spacing, backgroundColor: "white", color: "black", fontFamily: styles.bodyFont, transition: "all 0.3s ease", display: "flex", flexDirection: "column", gap: template === "minimal" ? "32px" : "24px" }}>

            {/* Header */}
            <div style={{ textAlign: template === "minimal" ? "left" : "center", wordBreak: "break-word" }}>
                <h1 style={{ fontSize: styles.headerSize, margin: 0, fontFamily: styles.headerFont, fontWeight: 700, color: styles.accentColor, letterSpacing: template === "minimal" ? "-0.5px" : "normal" }}>
                    {personalInfo.fullName || "YOUR NAME"}
                </h1>
                <div style={{ fontSize: "13px", color: template === "minimal" ? "#666" : "#444", marginTop: "8px" }}>
                    {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" • ")}
                    {links.linkedin && ` • ${links.linkedin}`}
                    {links.github && ` • ${links.github}`}
                </div>
            </div>

            {/* Content Sections */}
            {summary.trim() !== "" && (
                <div>
                    <TitleBar title="Professional Summary" />
                    <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap", color: "#333" }}>{summary}</p>
                </div>
            )}

            {experience.length > 0 && (
                <div>
                    <TitleBar title="Experience" />
                    {experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: "16px", pageBreakInside: "avoid" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px", color: "#111" }}>
                                <span>{exp.title}</span>
                                <span style={{ color: template === "minimal" ? "#666" : "#111" }}>{exp.date}</span>
                            </div>
                            <div style={{ fontStyle: template === "minimal" ? "normal" : "italic", fontSize: "14px", marginBottom: "4px", color: template === "minimal" ? styles.accentColor : "#333", fontWeight: template === "minimal" ? 500 : 400 }}>{exp.company}</div>
                            <ul style={{ fontSize: "14px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6, color: "#333" }}>
                                {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {education.length > 0 && (
                <div>
                    <TitleBar title="Education" />
                    {education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: "8px", pageBreakInside: "avoid" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px", color: "#111" }}>
                                <span>{edu.school}</span>
                                <span style={{ color: template === "minimal" ? "#666" : "#111" }}>{edu.date}</span>
                            </div>
                            <div style={{ fontSize: "14px", fontStyle: template === "minimal" ? "normal" : "italic", marginTop: "2px", color: template === "minimal" ? styles.accentColor : "#333", fontWeight: template === "minimal" ? 500 : 400 }}>{edu.degree}</div>
                        </div>
                    ))}
                </div>
            )}

            {projects.length > 0 && (
                <div>
                    <TitleBar title="Projects" />
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: "16px", pageBreakInside: "avoid" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ fontWeight: 700, fontSize: "14px", color: "#111", display: "flex", alignItems: "center", gap: "8px" }}>
                                    {proj.name}
                                    {(proj.liveUrl || proj.githubUrl) && (
                                        <span style={{ fontWeight: 400, fontSize: "12px", gap: "6px", display: "inline-flex" }}>
                                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: styles.accentColor, textDecoration: "none" }}>Live</a>}
                                            {proj.liveUrl && proj.githubUrl && <span style={{ color: "#E5E5E5" }}>|</span>}
                                            {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: styles.accentColor, textDecoration: "none" }}>GitHub</a>}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {proj.techStack && proj.techStack.length > 0 && (
                                <div style={{ fontSize: "12px", color: "#666", marginTop: "2px", marginBottom: "4px" }}>
                                    <strong style={{ color: template === "minimal" ? styles.accentColor : "inherit" }}>Stack:</strong> {proj.techStack.join(", ")}
                                </div>
                            )}
                            <ul style={{ fontSize: "14px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6, color: "#333" }}>
                                {proj.description.split('\n').filter(Boolean).map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {(skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0) && (
                <div>
                    <TitleBar title="Skills" />
                    <div className="space-y-2">
                        {skills.technical.length > 0 && (
                            <div style={{ fontSize: "14px", lineHeight: 1.6, color: "#333" }}>
                                <strong style={{ color: template === "minimal" ? styles.accentColor : "inherit" }}>Technical:</strong> {skills.technical.join(", ")}
                            </div>
                        )}
                        {skills.soft.length > 0 && (
                            <div style={{ fontSize: "14px", lineHeight: 1.6, color: "#333" }}>
                                <strong style={{ color: template === "minimal" ? styles.accentColor : "inherit" }}>Soft Skills:</strong> {skills.soft.join(", ")}
                            </div>
                        )}
                        {skills.tools.length > 0 && (
                            <div style={{ fontSize: "14px", lineHeight: 1.6, color: "#333" }}>
                                <strong style={{ color: template === "minimal" ? styles.accentColor : "inherit" }}>Tools:</strong> {skills.tools.join(", ")}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // Dynamic Render Return
    if (template === "modern") {
        return <ModernSidebarTemplate />;
    }

    return <SingleColumnTemplate />;
}
