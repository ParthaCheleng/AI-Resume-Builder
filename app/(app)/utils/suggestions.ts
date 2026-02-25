import { ResumeData } from "../types/resume";

export function generateSuggestions(data: ResumeData): string[] {
    const suggestions: string[] = [];

    // Suggestion 1: Check experience presence
    if (data.experience.length === 0) {
        suggestions.push("Add internship or project experience.");
    }

    // Suggestion 2: Check projects count
    if (data.projects.length < 2 && suggestions.length < 3) {
        suggestions.push("Add at least 2 projects.");
    }

    // Suggestion 3: Check measurable impact in bullets
    const hasNumberRegex = /\d/;
    let foundNumber = false;
    data.experience.forEach(exp => { if (hasNumberRegex.test(exp.description)) foundNumber = true; });
    data.projects.forEach(proj => { if (hasNumberRegex.test(proj.description)) foundNumber = true; });

    if (!foundNumber && suggestions.length < 3) {
        suggestions.push("Add measurable impact in bullets.");
    }

    // Suggestion 4: Check summary length
    const summaryWordCount = data.summary.trim().split(/\s+/).filter(word => word.length > 0).length;
    if ((summaryWordCount < 40 || summaryWordCount > 120) && suggestions.length < 3) {
        suggestions.push("Expand your summary (40–120 words).");
    }

    // Suggestion 5: Check skills count
    const skillsList = data.skills.split(",").map(s => s.trim()).filter(s => s.length > 0);
    if (skillsList.length < 8 && suggestions.length < 3) {
        suggestions.push("Add more relevant skills.");
    }

    // Strictly cap at max 3 suggestions
    return suggestions.slice(0, 3);
}
