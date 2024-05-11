import { ResumeFormType } from "./resumeTypes";

export type StudentsType = {
    [index: string]: StudentType
};

export type StudentType = {
    resumes: ResumesType;
    
}

export type ResumesType = {
    [index: string]: ResumeType;
}

export type  ResumeStatusType = 'Reviewed' | 'New' | 'ToBeReviewed' | 'Edited' | 'Approved';

export type ResumeType = {
    id: string;
    status: ResumeStatusType;
    creationDate: string;
    content: ResumeFormType;
}

export type UserRole = 'reviser' | 'student';

export type SupervisorType = {
    [id: string]: {
        firstName: string,
        lastName: string,
    }
}