import { ResumeData } from "../types/resume";

export function generateSuggestions(data: ResumeData): string[] {
    const suggestions: string[] = [];

    // Suggestion 1: Check summary length
    const summaryWordCount = data.summary.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (summaryWordCount < 40 || summaryWordCount > 120) {
        suggestions.push("Write a stronger summary (40–120 words).");
    }

    // Suggestion 2: Check projects count
    if (data.projects.length < 2) {
        suggestions.push("Add at least 2 projects.");
    }

    // Suggestion 3: Check experience presence
    if (data.experience.length === 0) {
        suggestions.push("Add at least 1 work experience entry.");
    }

    // Suggestion 4: Check skills count
    const skillsList = data.skills.split(",").map(s => s.trim()).filter(s => s.length > 0);
    if (skillsList.length < 8 && suggestions.length < 3) {
        suggestions.push("Add more skills (target 8+).");
    }

    // Suggestion 5: Check measurable impact
    const hasNumberRegex = /\d/;
    let foundNumber = false;
    data.experience.forEach(exp => { if (hasNumberRegex.test(exp.description)) foundNumber = true; });
    data.projects.forEach(proj => { if (hasNumberRegex.test(proj.description)) foundNumber = true; });

    if (!foundNumber && suggestions.length < 3) {
        suggestions.push("Add measurable impact (numbers) in bullets.");
    }

    // Suggestion 6: Missing Links
    if (data.links.github.trim() === "" && data.links.linkedin.trim() === "" && suggestions.length < 3) {
        suggestions.push("Add a GitHub or LinkedIn profile link.");
    }

    // Suggestion 7: Incomplete Education
    if (data.education.length === 0 && suggestions.length < 3) {
        suggestions.push("Add and complete your education details.");
    }

    // Strictly cap at max 3 suggestions
    return suggestions.slice(0, 3);
}
