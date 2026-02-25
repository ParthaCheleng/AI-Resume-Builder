import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ResumeData, defaultResumeData } from "../types/resume";

interface ResumeStore {
    data: ResumeData;
    updatePersonalInfo: (field: keyof ResumeData["personalInfo"], value: string) => void;
    updateSummary: (value: string) => void;
    updateSkills: (value: string) => void;
    updateLinks: (field: keyof ResumeData["links"], value: string) => void;
    setTemplate: (template: ResumeData["template"]) => void;

    // Array operations
    addEducation: () => void;
    updateEducation: (id: string, field: keyof ResumeData["education"][0], value: string) => void;
    removeEducation: (id: string) => void;

    addExperience: () => void;
    updateExperience: (id: string, field: keyof ResumeData["experience"][0], value: string) => void;
    removeExperience: (id: string) => void;

    addProject: () => void;
    updateProject: (id: string, field: keyof ResumeData["projects"][0], value: string) => void;
    removeProject: (id: string) => void;

    loadSampleData: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useResumeStore = create<ResumeStore>()(
    persist(
        (set) => ({
            data: defaultResumeData,

            updatePersonalInfo: (field, value) =>
                set((state) => ({ data: { ...state.data, personalInfo: { ...state.data.personalInfo, [field]: value } } })),

            updateSummary: (value) =>
                set((state) => ({ data: { ...state.data, summary: value } })),

            updateSkills: (value) =>
                set((state) => ({ data: { ...state.data, skills: value } })),

            updateLinks: (field, value) =>
                set((state) => ({ data: { ...state.data, links: { ...state.data.links, [field]: value } } })),

            setTemplate: (template) =>
                set((state) => ({ data: { ...state.data, template } })),

            addEducation: () =>
                set((state) => ({ data: { ...state.data, education: [...state.data.education, { id: generateId(), school: "", degree: "", date: "" }] } })),

            updateEducation: (id, field, value) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        education: state.data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
                    }
                })),

            removeEducation: (id) =>
                set((state) => ({ data: { ...state.data, education: state.data.education.filter(edu => edu.id !== id) } })),

            addExperience: () =>
                set((state) => ({ data: { ...state.data, experience: [...state.data.experience, { id: generateId(), title: "", company: "", date: "", description: "" }] } })),

            updateExperience: (id, field, value) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        experience: state.data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
                    }
                })),

            removeExperience: (id) =>
                set((state) => ({ data: { ...state.data, experience: state.data.experience.filter(exp => exp.id !== id) } })),

            addProject: () =>
                set((state) => ({ data: { ...state.data, projects: [...state.data.projects, { id: generateId(), name: "", description: "" }] } })),

            updateProject: (id, field, value) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        projects: state.data.projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj)
                    }
                })),

            removeProject: (id) =>
                set((state) => ({ data: { ...state.data, projects: state.data.projects.filter(proj => proj.id !== id) } })),

            loadSampleData: () => set({
                data: {
                    personalInfo: {
                        fullName: "Alex Developer",
                        email: "alex@example.com",
                        phone: "(555) 123-4567",
                        location: "San Francisco, CA",
                    },
                    summary: "Software Engineer with extensive experience in developing highly scalable and efficient applications. Proven ability to architect complex systems, lead cross-functional teams, and deploy enterprise-level solutions leveraging modern frameworks and cloud technologies. Focus on clean code and robust design patterns.",
                    education: [
                        { id: generateId(), school: "University of Technology", degree: "B.S. in Computer Science", date: "May 2017" }
                    ],
                    experience: [
                        { id: generateId(), title: "Senior Software Engineer", company: "Tech Innovators Inc.", date: "Jan 2020 - Present", description: "Led modularization of legacy monolithic application into microservices architecture.\nEngineered zero-downtime deployment pipelines reducing deployment issues by 40%.\nMentored 4 junior engineers on React and Node.js best practices and code reviews." },
                        { id: generateId(), title: "Software Engineer", company: "Global Software Solutions", date: "Jun 2017 - Dec 2019", description: "Implemented key tracking features improving data resolution for client dashboards.\nOptimized SQL queries cutting report generation time by 30 seconds on average." }
                    ],
                    projects: [
                        { id: generateId(), name: "E-Commerce Platform Redesign", description: "Migrated legacy frontend to Next.js, improving page load speeds by 50% and increasing conversion rate by 15%." }
                    ],
                    skills: "TypeScript, JavaScript, Python, React, Next.js, Node.js, Express, PostgreSQL, MongoDB, AWS, Docker, Git",
                    links: {
                        github: "github.com/alexdev",
                        linkedin: "linkedin.com/in/alexdev"
                    },
                    template: "classic"
                }
            }),
        }),
        {
            name: "resumeBuilderData", // localStorage key
            // Safely handle potential corruption by merging state carefully or catching parse errors
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error("An error occurred during hydration", error);
                }
            },
        }
    )
);
