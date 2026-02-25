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
        techStack: string[];
        githubUrl?: string;
        liveUrl?: string;
    }>;
    skills: {
        technical: string[];
        soft: string[];
        tools: string[];
    };
    links: {
        github: string;
        linkedin: string;
    };
    template: "classic" | "modern" | "minimal";
    themeColor: string;
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
    skills: {
        technical: [],
        soft: [],
        tools: []
    },
    links: {
        github: "",
        linkedin: "",
    },
    template: "classic",
    themeColor: "hsl(168, 60%, 40%)", // Default Teal
};
