"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../hooks/useResumeStore";
import ScoreMeter from "../components/ScoreMeter";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";

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
        loadSampleData,
        setTemplate
    } = store;

    const { personalInfo, summary, education, experience, projects, skills, links, template } = data;

    const checkActionVerb = (text: string) => {
        if (!text.trim()) return true; // Don't complain about empty boxes immediately
        const firstWord = text.trim().split(/\s+/)[0].toLowerCase();
        const strongVerbs = ["built", "developed", "designed", "implemented", "led", "improved", "created", "optimized", "automated"];
        return strongVerbs.includes(firstWord);
    };

    const checkMeasurableImpact = (text: string) => {
        if (!text.trim()) return true;
        return /[\d%xk]/i.test(text); // Basic test for numbers, percentages, or 'X' / 'K'
    };

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
                    {experience.map((exp, index) => {
                        const needsVerb = !checkActionVerb(exp.description);
                        const needsImpact = !checkMeasurableImpact(exp.description);

                        return (
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

                                {/* Inline Bullet Guidance */}
                                {(needsVerb || needsImpact) && (
                                    <div style={{ backgroundColor: "var(--bg-color)", padding: "8px", borderRadius: "4px", fontSize: "12px", color: "var(--warning-color)", borderLeft: "3px solid var(--warning-color)" }}>
                                        {needsVerb && <div style={{ marginBottom: "2px" }}>💡 Start with a strong action verb.</div>}
                                        {needsImpact && <div>💡 Add measurable impact (numbers).</div>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
                    {projects.map((proj, index) => {
                        const needsVerb = !checkActionVerb(proj.description);
                        const needsImpact = !checkMeasurableImpact(proj.description);

                        return (
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

                                {/* Inline Bullet Guidance */}
                                {(needsVerb || needsImpact) && (
                                    <div style={{ backgroundColor: "var(--bg-color)", padding: "8px", borderRadius: "4px", fontSize: "12px", color: "var(--warning-color)", borderLeft: "3px solid var(--warning-color)" }}>
                                        {needsVerb && <div style={{ marginBottom: "2px" }}>💡 Start with a strong action verb.</div>}
                                        {needsImpact && <div>💡 Add measurable impact (numbers).</div>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
            <div style={{ flex: "1 1 500px", padding: "var(--spacing-4)", backgroundColor: "#EEE", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", maxHeight: "calc(100vh - 70px)" }}>

                <TemplateSelector currentTemplate={template} setTemplate={setTemplate} />
                <ResumePreview data={data} template={template} />

            </div>
        </div>
    );
}
