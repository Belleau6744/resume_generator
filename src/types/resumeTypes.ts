import dayjs from "dayjs";
import { LangLevel, LangList } from "../utils/Languages";

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
