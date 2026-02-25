"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../hooks/useResumeStore";
import ScoreMeter from "../components/ScoreMeter";
// We no longer need the separate Preview component here, we will build a lightweight shell directly.

export default function BuilderPage() {
    const [mounted, setMounted] = useState(false);
    const store = useResumeStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ padding: "var(--spacing-5)" }}>Loading Editor...</div>;
    }

    const {
        data,
        updatePersonalInfo,
        updateSummary,
        updateSkills,
        updateLinks,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        loadSampleData
    } = store;

    const { personalInfo, summary, education, experience, projects, skills, links } = data;

    return (
        <div style={{ display: "flex", flexWrap: "wrap", minHeight: "calc(100vh - 70px)" }}>
            {/* Left Column (Forms) */}
            <div style={{ flex: "1 1 400px", padding: "var(--spacing-4)", borderRight: "1px solid #E5E5E5", overflowY: "auto", maxHeight: "calc(100vh - 70px)" }} className="space-y-4">

                <ScoreMeter />

                <div className="flex-between">
                    <h2 style={{ fontSize: "24px" }}>Resume Details</h2>
                    <button onClick={loadSampleData} className="btn-secondary" style={{ fontSize: "14px" }}>Load Sample Data</button>
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Personal Info</h3>
                    <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>(name, email, phone, location)</p>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box" }}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={personalInfo.email}
                        onChange={(e) => updatePersonalInfo("email", e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box" }}
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={personalInfo.phone}
                        onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box" }}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={personalInfo.location}
                        onChange={(e) => updatePersonalInfo("location", e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box" }}
                    />
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Summary</h3>
                    <textarea
                        rows={4}
                        placeholder="Professional summary..."
                        value={summary}
                        onChange={(e) => updateSummary(e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box", resize: "vertical" }}
                    />
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Experience</h3>
                    {experience.map((exp, index) => (
                        <div key={exp.id} style={{ border: "1px solid #E5E5E5", padding: "16px", borderRadius: "8px", position: "relative" }} className="space-y-2">
                            <button
                                onClick={() => removeExperience(exp.id)}
                                style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--accent-color)", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                            >
                                ✕ REMOVE
                            </button>
                            <div style={{ fontWeight: 600, fontSize: "14px", color: "#666", marginBottom: "8px" }}>Role #{index + 1}</div>
                            <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => updateExperience(exp.id, "title", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                            <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                            <input type="text" placeholder="Date (e.g. Jan 2020 - Present)" value={exp.date} onChange={(e) => updateExperience(exp.id, "date", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                            <textarea rows={3} placeholder="Description (bullets)" value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} style={{ width: "100%", boxSizing: "border-box", resize: "vertical" }} />
                        </div>
                    ))}
                    <button onClick={addExperience} className="btn-secondary" style={{ width: "100%" }}>+ Add Experience</button>
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Education</h3>
                    {education.map((edu, index) => (
                        <div key={edu.id} style={{ border: "1px solid #E5E5E5", padding: "16px", borderRadius: "8px", position: "relative" }} className="space-y-2">
                            <button
                                onClick={() => removeEducation(edu.id)}
                                style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--accent-color)", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                            >
                                ✕ REMOVE
                            </button>
                            <div style={{ fontWeight: 600, fontSize: "14px", color: "#666", marginBottom: "8px" }}>School #{index + 1}</div>
                            <input type="text" placeholder="School Name" value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                            <input type="text" placeholder="Date (e.g. May 2017)" value={edu.date} onChange={(e) => updateEducation(edu.id, "date", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                        </div>
                    ))}
                    <button onClick={addEducation} className="btn-secondary" style={{ width: "100%" }}>+ Add Education</button>
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Projects</h3>
                    {projects.map((proj, index) => (
                        <div key={proj.id} style={{ border: "1px solid #E5E5E5", padding: "16px", borderRadius: "8px", position: "relative" }} className="space-y-2">
                            <button
                                onClick={() => removeProject(proj.id)}
                                style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--accent-color)", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                            >
                                ✕ REMOVE
                            </button>
                            <div style={{ fontWeight: 600, fontSize: "14px", color: "#666", marginBottom: "8px" }}>Project #{index + 1}</div>
                            <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                            <textarea rows={3} placeholder="Description (bullets)" value={proj.description} onChange={(e) => updateProject(proj.id, "description", e.target.value)} style={{ width: "100%", boxSizing: "border-box", resize: "vertical" }} />
                        </div>
                    ))}
                    <button onClick={addProject} className="btn-secondary" style={{ width: "100%" }}>+ Add Project</button>
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Skills</h3>
                    <input type="text" value={skills} onChange={(e) => updateSkills(e.target.value)} placeholder="Comma-separated skills..." style={{ width: "100%", boxSizing: "border-box" }} />
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Links</h3>
                    <input type="text" value={links.github} onChange={(e) => updateLinks("github", e.target.value)} placeholder="GitHub URL" style={{ width: "100%", boxSizing: "border-box" }} />
                    <input type="text" value={links.linkedin} onChange={(e) => updateLinks("linkedin", e.target.value)} placeholder="LinkedIn URL" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
            </div>

            {/* Right Column (Live Preview Miniature Shell) */}
            <div style={{ flex: "1 1 500px", padding: "var(--spacing-4)", backgroundColor: "#EEE", display: "flex", justifyContent: "center", alignItems: "flex-start", overflowY: "auto", maxHeight: "calc(100vh - 70px)" }}>
                <div style={{
                    width: "100%",
                    maxWidth: "800px",
                    minHeight: "800px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    padding: "var(--spacing-4)",
                    color: "black",
                    border: "1px solid #DDD",
                    fontFamily: "var(--font-inter)" // Standard readable preview font
                }}>
                    {/* Header Block Always Exists, but text falls back to prevent layout shift initially */}
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
        </div>
    );
}
