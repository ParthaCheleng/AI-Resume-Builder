import { ResumeData } from "../types/resume";

export function calculateATSScore(data: ResumeData): number {
    let score = 0;

    // 1. +15 if summary length is 40–120 words
    const summaryWordCount = data.summary.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (summaryWordCount >= 40 && summaryWordCount <= 120) {
        score += 15;
    }

    // 2. +10 if at least 2 projects
    if (data.projects.length >= 2) {
        score += 10;
    }

    // 3. +10 if at least 1 experience entry
    if (data.experience.length >= 1) {
        score += 10;
    }

    // 4. +10 if skills list has ≥ 8 items total across categories
    const totalSkills = data.skills.technical.length + data.skills.soft.length + data.skills.tools.length;
    if (totalSkills >= 8) {
        score += 10;
    }

    // 5. +10 if GitHub or LinkedIn link exists
    if (data.links.github.trim() !== "" || data.links.linkedin.trim() !== "") {
        score += 10;
    }

    // 6. +15 if any experience/project bullet contains a number (%, X, k, etc.)
    const hasNumberRegex = /\d/;
    let foundNumber = false;

    data.experience.forEach(exp => {
        if (hasNumberRegex.test(exp.description)) foundNumber = true;
    });
    data.projects.forEach(proj => {
        if (hasNumberRegex.test(proj.description)) foundNumber = true;
    });

    if (foundNumber) {
        score += 15;
    }

    // 7. +10 if education section has complete fields (at least 1 entry, and school/degree filled)
    if (data.education.length > 0) {
        const isEducationComplete = data.education.every(edu => edu.school.trim() !== "" && edu.degree.trim() !== "");
        if (isEducationComplete) {
            score += 10;
        }
    }

    // Math.min to cap at 100 just in case future rules push it over
    return Math.min(score, 100);
}
