import { ResumeData } from "../types/resume";

export function calculateATSScore(data: ResumeData): number {
    let score = 0;

    // +10 if name is provided
    if (data.personalInfo.fullName.trim() !== "") {
        score += 10;
    }

    // +10 if email is provided
    if (data.personalInfo.email.trim() !== "") {
        score += 10;
    }

    // +10 if summary length is greater than 50 characters
    if (data.summary.trim().length > 50) {
        score += 10;
    }

    // +15 if at least 1 experience entry exists with bullet points
    const hasExpWithBullets = data.experience.some(exp => exp.description.trim() !== "");
    if (hasExpWithBullets) {
        score += 15;
    }

    // +10 if at least 1 education entry exists
    if (data.education.length >= 1) {
        score += 10;
    }

    // +10 if at least 5 skills are added
    const totalSkills = data.skills.technical.length + data.skills.soft.length + data.skills.tools.length;
    if (totalSkills >= 5) {
        score += 10;
    }

    // +10 if at least 1 project is added
    if (data.projects.length >= 1) {
        score += 10;
    }

    // +5 if phone number is provided
    if (data.personalInfo.phone.trim() !== "") {
        score += 5;
    }

    // +5 if LinkedIn is provided
    if (data.links.linkedin.trim() !== "") {
        score += 5;
    }

    // +5 if GitHub is provided
    if (data.links.github.trim() !== "") {
        score += 5;
    }

    // +10 if summary contains action verbs (e.g., built, led, designed, improved, developed, created)
    const actionVerbs = ["built", "led", "designed", "improved", "developed", "created"];
    const summaryLower = data.summary.toLowerCase();
    const hasActionVerb = actionVerbs.some(verb => summaryLower.includes(verb));
    if (hasActionVerb) {
        score += 10;
    }

    return Math.min(score, 100);
}
