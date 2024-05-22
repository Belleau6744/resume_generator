import { ResumeFormType } from "./resumeTypes";

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
    resumes: ResumesType;
}

/**
 * Reviewer user type
 */
export type ReviewerType = {
    userRole: UserRole,
    firstName: string,
    lastName: string,
}


/**
 * RESUME -
 */

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