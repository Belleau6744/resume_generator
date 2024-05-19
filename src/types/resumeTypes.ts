import { LangLevel, LangList } from "../utils/Languages";

/** GENERAL INFORMATION */
export type GeneralInfoType = {
    'first name': string;
    'last name' : string;
    'languages' : LanguageType;
    'phone number': string;
    'title': string;
    'linkedin': string;
    'email address': string;
}

/************************* */
/** LANGUAGE */
export type LanguageKeys = keyof typeof LangList;
export type LanguageLevelKeys = keyof typeof LangLevel;
export type LanguageType = Partial<Record<LanguageKeys, LanguageLevelKeys>>;



/************************* */
/** EDUCATION */

// TODO Specify Type
// type DegreeType = 'Associate' | 'Bachelor' | 'Master' | 'Doctorate' | 'College';

export type Education = {
    [index: string]: {
        // Bachelor | Master | Doctorate
        degree: string;
        // Education | Software Engineering | Biology
        fieldOfStudy: string;
        schoolName: string;
        // schoolAddresss: string;
        startDate: string;
        endDate: string;
    };
}

/************************* */
/** SKILLS */
export type Skills = {
    [index: string]: {
        title: string;
        description: string;
    }    
}

/************************* */
/** EXPERIENCE */
export type Experience = {
    workingExperience: WorkingExperience;
    volunteerExperience: VolunteerExperience;
    projectExperience: ProjectExperience;
}
export type WorkingExperience = {
    [index: string]: {
        organizationName: string;
        jobTitle: string;
        taskDescription: string[];
        startDate: string;
        stillWorking: true;
    } | {
        organizationName: string;
        jobTitle: string;
        taskDescription: string[];
        startDate: string;
        stillWorking: false;
        // Only if not still working there
        endDate: string;
    }
};
export type VolunteerExperience = {
    [index:string]: {
        organizationName: string;
        jobTitle: string;
        description: string[];
        startDate: string;
        stillWorking: true;
    }
}
export type ProjectExperience = {
    [index: string]: {
        description: string;
    }
};


/************************* */
/** FULL RESUME TYPE */
export type ResumeFormType = {
    generalInfo: GeneralInfoType;
    education: Education;
    skills: Skills;
    experience: Experience;
}