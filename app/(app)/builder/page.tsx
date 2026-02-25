"use client";

import React, { useEffect, useState } from "react";
import { useResumeStore } from "../hooks/useResumeStore";
import ScoreMeter from "../components/ScoreMeter";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import PillInput from "../components/PillInput";

export default function BuilderPage() {
    const [mounted, setMounted] = useState(false);
    const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);
    const [openProjectId, setOpenProjectId] = useState<string | null>(null);
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
        setTemplate,
        setThemeColor
    } = store;

    const { personalInfo, summary, education, experience, projects, skills, links, template, themeColor } = data;

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

                <div style={{ padding: "24px 0", borderBottom: "1px solid #E5E5E5", marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600, marginBottom: "16px" }}>Resume Settings</h3>
                    <TemplateSelector
                        currentTemplate={template}
                        setTemplate={setTemplate}
                        currentThemeColor={themeColor}
                        setThemeColor={setThemeColor}
                    />
                </div>

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
                        const charCount = proj.description.length;
                        const isOverLimit = charCount > 200;

                        return (
                            <details
                                key={proj.id}
                                style={{ border: "1px solid #E5E5E5", borderRadius: "8px", backgroundColor: "white" }}
                                open={openProjectId === proj.id}
                                onToggle={(e) => {
                                    if ((e.target as HTMLDetailsElement).open) {
                                        setOpenProjectId(proj.id);
                                    } else if (openProjectId === proj.id) {
                                        setOpenProjectId(null);
                                    }
                                }}
                            >
                                <summary style={{ padding: "16px", fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between", outline: "none" }}>
                                    <span>{proj.name || `Project #${index + 1}`}</span>
                                </summary>

                                <div style={{ padding: "0 16px 16px 16px", position: "relative" }} className="space-y-4">
                                    <button
                                        onClick={() => removeProject(proj.id)}
                                        style={{ position: "absolute", top: "0", right: "16px", background: "none", border: "none", color: "var(--accent-color)", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                                    >
                                        ✕ REMOVE
                                    </button>

                                    <div className="space-y-2">
                                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>Project Details</label>
                                        <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex-between">
                                            <label style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>Description</label>
                                            <span style={{ fontSize: "12px", color: isOverLimit ? "var(--accent-color)" : "#999", fontWeight: isOverLimit ? 700 : 400 }}>
                                                {charCount} / 200
                                            </span>
                                        </div>
                                        <textarea
                                            rows={3}
                                            placeholder="Description (bullets)"
                                            value={proj.description}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val.length <= 200) {
                                                    updateProject(proj.id, "description", val);
                                                }
                                            }}
                                            style={{ width: "100%", boxSizing: "border-box", resize: "vertical", borderColor: isOverLimit ? "var(--accent-color)" : "#D1D1D1" }}
                                        />

                                        {/* Inline Bullet Guidance */}
                                        {(needsVerb || needsImpact) && (
                                            <div style={{ backgroundColor: "var(--bg-color)", padding: "8px", borderRadius: "4px", fontSize: "12px", color: "var(--warning-color)", borderLeft: "3px solid var(--warning-color)" }}>
                                                {needsVerb && <div style={{ marginBottom: "2px" }}>💡 Start with a strong action verb.</div>}
                                                {needsImpact && <div>💡 Add measurable impact (numbers).</div>}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>Tech Stack</label>
                                        <PillInput
                                            placeholder="Add tech stack item & press enter..."
                                            items={proj.techStack || []}
                                            onChange={(items) => updateProject(proj.id, "techStack", items as any)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>Links (Optional)</label>
                                        <input type="url" placeholder="Live URL" value={proj.liveUrl || ""} onChange={(e) => updateProject(proj.id, "liveUrl", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                                        <input type="url" placeholder="GitHub URL" value={proj.githubUrl || ""} onChange={(e) => updateProject(proj.id, "githubUrl", e.target.value)} style={{ width: "100%", boxSizing: "border-box", marginTop: "8px" }} />
                                    </div>
                                </div>
                            </details>
                        );
                    })}
                    <button onClick={() => {
                        addProject();
                        const newIndex = projects.length;
                        // Best effort to open the next item (will rely on stable render)
                    }} className="btn-secondary" style={{ width: "100%" }}>+ Add Project</button>
                </div>

                <div className="card space-y-4">
                    <div className="flex-between">
                        <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Skills</h3>
                        <button
                            className="btn-secondary"
                            style={{ fontSize: "12px", padding: "4px 8px" }}
                            disabled={isSuggestingSkills}
                            onClick={() => {
                                setIsSuggestingSkills(true);
                                setTimeout(() => {
                                    const technicalSet = new Set([...skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"]);
                                    const softSet = new Set([...skills.soft, "Team Leadership", "Problem Solving"]);
                                    const toolsSet = new Set([...skills.tools, "Git", "Docker", "AWS"]);

                                    updateSkills("technical", Array.from(technicalSet));
                                    updateSkills("soft", Array.from(softSet));
                                    updateSkills("tools", Array.from(toolsSet));
                                    setIsSuggestingSkills(false);
                                }, 1000);
                            }}
                        >
                            {isSuggestingSkills ? "Loading..." : "✨ Suggest Skills"}
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>Technical Skills ({skills.technical.length})</label>
                        <PillInput
                            placeholder="Add generic technical skill..."
                            items={skills.technical}
                            onChange={(items) => updateSkills("technical", items)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>Soft Skills ({skills.soft.length})</label>
                        <PillInput
                            placeholder="Add soft skill..."
                            items={skills.soft}
                            onChange={(items) => updateSkills("soft", items)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>Tools & Technologies ({skills.tools.length})</label>
                        <PillInput
                            placeholder="Add tool/software..."
                            items={skills.tools}
                            onChange={(items) => updateSkills("tools", items)}
                        />
                    </div>
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
