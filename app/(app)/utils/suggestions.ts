import { ResumeData } from "../types/resume";

export function generateSuggestions(data: ResumeData): string[] {
    const suggestions: string[] = [];

    if (data.personalInfo.fullName.trim() === "") {
        suggestions.push("Add your name (+10 points)");
    }
    if (data.personalInfo.email.trim() === "") {
        suggestions.push("Add your email address (+10 points)");
    }
    if (data.summary.trim().length <= 50) {
        suggestions.push("Add a professional summary > 50 chars (+10 points)");
    }

    const actionVerbs = ["built", "led", "designed", "improved", "developed", "created"];
    const summaryLower = data.summary.toLowerCase();
    const hasActionVerb = actionVerbs.some(verb => summaryLower.includes(verb));
    if (!hasActionVerb) {
        suggestions.push("Use action verbs in your summary (+10 points)");
    }

    const hasExpWithBullets = data.experience.some(exp => exp.description.trim() !== "");
    if (!hasExpWithBullets) {
        suggestions.push("Add experience with bullet points (+15 points)");
    }

    if (data.education.length === 0) {
        suggestions.push("Add an education entry (+10 points)");
    }

    const totalSkills = data.skills.technical.length + data.skills.soft.length + data.skills.tools.length;
    if (totalSkills < 5) {
        suggestions.push("Add at least 5 skills (+10 points)");
    }

    if (data.projects.length === 0) {
        suggestions.push("Add at least 1 project (+10 points)");
    }

    if (data.personalInfo.phone.trim() === "") {
        suggestions.push("Add your phone number (+5 points)");
    }

    if (data.links.linkedin.trim() === "") {
        suggestions.push("Add your LinkedIn profile (+5 points)");
    }

    if (data.links.github.trim() === "") {
        suggestions.push("Add your GitHub profile (+5 points)");
    }

    return suggestions;
}
