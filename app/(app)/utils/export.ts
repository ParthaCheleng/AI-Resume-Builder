import { ResumeData } from "../types/resume";

export function generatePlainTextResume(data: ResumeData): string {
    const lines: string[] = [];

    // Header
    if (data.personalInfo.fullName) {
        lines.push(data.personalInfo.fullName.toUpperCase());
    }

    const contactInfo = [
        data.personalInfo.email,
        data.personalInfo.phone,
        data.personalInfo.location,
        data.links.linkedin,
        data.links.github
    ].filter(Boolean);

    if (contactInfo.length > 0) {
        lines.push(contactInfo.join(" | "));
    }
    lines.push("");

    // Summary
    if (data.summary.trim()) {
        lines.push("SUMMARY");
        lines.push("-".repeat(40));
        lines.push(data.summary.trim());
        lines.push("");
    }

    // Experience
    if (data.experience.length > 0) {
        lines.push("EXPERIENCE");
        lines.push("-".repeat(40));
        data.experience.forEach(exp => {
            lines.push(`${exp.title} at ${exp.company} (${exp.date})`);
            if (exp.description) {
                exp.description.split("\n").filter(Boolean).forEach(bullet => {
                    lines.push(`• ${bullet.trim()}`);
                });
            }
            lines.push("");
        });
    }

    // Education
    if (data.education.length > 0) {
        lines.push("EDUCATION");
        lines.push("-".repeat(40));
        data.education.forEach(edu => {
            lines.push(`${edu.school} | ${edu.degree} (${edu.date})`);
        });
        lines.push("");
    }

    // Projects
    if (data.projects.length > 0) {
        lines.push("PROJECTS");
        lines.push("-".repeat(40));
        data.projects.forEach(proj => {
            let titleLine = proj.name;
            const links = [proj.liveUrl, proj.githubUrl].filter(Boolean);
            if (links.length > 0) {
                titleLine += ` | ${links.join(" - ")}`;
            }
            lines.push(titleLine);

            if (proj.techStack && proj.techStack.length > 0) {
                lines.push(`Tech Stack: ${proj.techStack.join(", ")}`);
            }

            if (proj.description) {
                proj.description.split("\n").filter(Boolean).forEach(bullet => {
                    lines.push(`• ${bullet.trim()}`);
                });
            }
            lines.push("");
        });
    }

    // Skills
    const hasTechnical = data.skills.technical.length > 0;
    const hasSoft = data.skills.soft.length > 0;
    const hasTools = data.skills.tools.length > 0;

    if (hasTechnical || hasSoft || hasTools) {
        lines.push("SKILLS");
        lines.push("-".repeat(40));
        if (hasTechnical) lines.push(`Technical: ${data.skills.technical.join(", ")}`);
        if (hasSoft) lines.push(`Soft: ${data.skills.soft.join(", ")}`);
        if (hasTools) lines.push(`Tools: ${data.skills.tools.join(", ")}`);
        lines.push("");
    }

    return lines.join("\n").trim();
}
