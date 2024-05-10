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

export type ResumeType = {
    status: 'Reviewed' | 'New' | 'ToBeReviewed' | 'Edited' | 'Approved'
    content: ResumeFormType;
}

export type UserRole = 'reviser' | 'student';

export type SupervisorType = {
    [id: string]: {
        firstName: string,
        lastName: string,
    }
}