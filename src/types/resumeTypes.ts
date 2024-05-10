/************************* */
/** GENERAL INFORMATION */
type GeneralInfoType = {
    'First Name': string;
    'Last Name' : string;
    'Citizenship' : string;
    'Languages' : Language;
    'Phone Number'?: string;
    'Email Address'?: string;
    'Address'?: string;
}

/************************* */
/** LANGUAGE */

// TODO Specify Type
/**
 * [K in Lang]?
 */
// type Lang = 'Français' | 'English' | 'Espanol';

type Language = {
    [lang: string] : {
        oralLevel: string;
        writtenLevel: string;
        comprehensionLevel: string;
    }
}

/************************* */
/** EDUCATION */

// TODO Specify Type
// type DegreeType = 'Associate' | 'Bachelor' | 'Master' | 'Doctorate' | 'College';

type Education = {
    [index: string]: {
        // Bachelor | Master | Doctorate
        degree: string;
        // Education | Software Engineering | Biology
        fieldOfStudy: string;
        schoolName: string;
        schoolAddresss: string;
        startDate: string;
        endDate: string;
    };
}

/************************* */
/** SKILLS */
type Skills = {
    [index: string]: {
        title: string;
        description: string;
    }    
}

/************************* */
/** EXPERIENCE */
type Experience = {
    workingExperience?: WorkingExperience;
    volunteerExperience?: VolunteerExperience;
    projectExperience?: ProjectExperience;
}
type WorkingExperience = {
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
type VolunteerExperience = {
    organizationName: string;
    jobTitle: string;
    description: string[];
    startDate: string;
    stillWorking: true;
}
type ProjectExperience = {
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