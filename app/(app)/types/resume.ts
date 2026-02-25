export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
    };
    summary: string;
    education: Array<{
        id: string;
        school: string;
        degree: string;
        date: string;
    }>;
    experience: Array<{
        id: string;
        title: string;
        company: string;
        date: string;
        description: string;
    }>;
    projects: Array<{
        id: string;
        name: string;
        description: string;
    }>;
    skills: string;
    links: {
        github: string;
        linkedin: string;
    };
}

export const defaultResumeData: ResumeData = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
    },
    summary: "",
    education: [],
    experience: [],
    projects: [],
    skills: "",
    links: {
        github: "",
        linkedin: "",
    },
};
