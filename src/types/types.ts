import dayjs from "dayjs";
import { LangLevel, LangList } from "../utils/Languages";

/**********************************************************************************/
/** RESUME DEFINITION  */

/** GENERAL INFORMATION */
export type GeneralInfoType = {
    'first name': string;
    'last name' : string;
    'languages' : LanguageType;
    'phone number': string;
    'role_title': string;
    'linkedin': string;
    'email address': string;
}

/** LANGUAGE */
export type LanguageKeys = keyof typeof LangList;
export type LanguageLevelKeys = keyof typeof LangLevel;
export type LanguageType = Partial<Record<LanguageKeys, LanguageLevelKeys>>;

/** EDUCATION */
// TODO Specify Type
// type DegreeType = 'Associate' | 'Bachelor' | 'Master' | 'Doctorate' | 'College';
export type Education = {
    'degree': string;
    'field of study': string;
    'school name': string;
    'school address': string;
    'start date': string;
    'end date': string;
}

export type EducationList = {
    [index: string]: Education;
}

export type Education_DayJs = Omit<Education, 
    'end date' | 
    'start date'> & 
    { 
        'end date': dayjs.Dayjs, 
        'start date': dayjs.Dayjs
    };

export type EducationInputErrors = {
    'degree': boolean,
    'field of study': boolean,
    'school name': boolean,
    'school address': boolean,
    'start date':boolean,
    'end date': boolean,
}

/** SKILLS */
// Define the Skill type with title and description
export type Skill = {
    title: string;
};

// Define the SkillsFlat type as an index signature where the index is a string and the value is a Skill
export type SkillsFlat = Skill[];

// Define the SkillsHierarchical type as an index signature where the section title is a string and the value is SkillsFlat
export type SkillsHierarchical = {
    [sectionTitle: string]: SkillsFlat;
};

// Define the Skills type as a discriminated union with hasSections as the discriminant
export type Skills = 
    | { hasSections: true; content: SkillsHierarchical }
    | { hasSections: false; content: SkillsFlat };

/** EXPERIENCE */
export type Experience = {
    workingExperience: WorkingExperience;
    volunteerExperience: VolunteeringExperience;
    projectExperience: ProjectExperience;
}
export type WorkingExperience = {
    [index: string]: Work
};

export type Work = {
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

export type WorkExperienceInputErrors = {
    organizationName: boolean;
    jobTitle: boolean;
    taskDescription: boolean;
    startDate: boolean;
    stillWorking: boolean;
    endDate: boolean;
}

export type Work_DayJs = {
    organizationName: string;
    jobTitle: string;
    taskDescription: string[];
    startDate: dayjs.Dayjs;
    stillWorking: true;
} | {
    organizationName: string;
    jobTitle: string;
    taskDescription: string[];
    startDate: dayjs.Dayjs;
    stillWorking: false;
    // Only if not still working there
    endDate: dayjs.Dayjs;
}


export type VolunteeringExperience = {
    [index:string]: Volunteering
}

export type Volunteering = {
    organizationName: string;
    jobTitle: string;
    description: string[];
    startDate: string;
    stillWorking: true;
} | {
    organizationName: string;
    jobTitle: string;
    description: string[];
    startDate: string;
    stillWorking: false;
    endDate: string;
}
export type Volunteering_DaysJs = {
    organizationName: string;
    jobTitle: string;
    description: string[];
    startDate: dayjs.Dayjs | null;
    stillWorking: true;
} | {
    organizationName: string;
    jobTitle: string;
    description: string[];
    startDate: dayjs.Dayjs | null;
    stillWorking: false;
    endDate: dayjs.Dayjs | null;
}
export type VolunteeringInputErrors = {
    organizationName: boolean,
    jobTitle: boolean,
    description: boolean,
    startDate: boolean,
    stillWorking: boolean,
    endDate: boolean,
}

export type ProjectExperience = {
    [index: string]: Project;
};

export type Project = {
    title: string;
    description: string;
}

export type ProjectExperienceInputErrors = {
    title: boolean;
    description: boolean;
}

/************************* */
/** FULL RESUME TYPE */
export type ResumeContentType = {
    generalInfo: GeneralInfoType;
    education: EducationList;
    skills: Skills;
    experience: Experience;
}

interface Path {
    pathname: string;
    search: string;
    hash: string;
  }

interface Location<State = unknown> extends Path {
    state: State;
    key: string;
  }

export type Blocker =
  | {
      state: "unblocked";
      reset: undefined;
      proceed: undefined;
      location: undefined;
    }
  | {
      state: "blocked";
      reset(): void;
      proceed(): void;
      location: Location;
    }
  | {
      state: "proceeding";
      reset: undefined;
      proceed: undefined;
      location: Location;
    };

export type IconProps = {
    fill?: string;
    width?: number;
    height?: number;
}

/**********************************************************************************/
/** RESUMES DB DEFINITION */

export type  ResumeStatusType = 'Reviewed' | 'New' | 'ToBeReviewed' | 'Edited' | 'Approved';
/**
 * A resume is defined by 
 */
export type ResumeDefinition = {
    status: ResumeStatusType;
    creationDate: string;
    content: ResumeContentType;
}

/**
 * Resumes are grouped by their ID and their content
 */
export type ResumeGroup = {
    [resumeID: string]: ResumeDefinition;
}

/**
 * The Resume DB section contains all of the resumes by ID
 */
export type ResumeDB = {
    resumes: ResumeGroup;
}

/**********************************************************************************/
/** USERS DB DEFINITION */

export type UserRole = 'reviewer' | 'student';
/**
 * DB Users section
 */
export type UsersType = {
    [index: string]: StudentType | ReviewerType
};

/**
 * Student user type
 */
export type StudentType = {
    userRole: UserRole;
    resumeIDs: string[];
}

/**
 * Reviewer user type
 */
export type ReviewerType = {
    userRole: UserRole,
    firstName: string,
    lastName: string,
}