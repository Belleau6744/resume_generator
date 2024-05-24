import { ResumeType } from "../types/dbStructType"

export const getEmptyResumeInit = (resumeID: string): ResumeType => {
    return {
        id: resumeID,
        status: 'New',
        creationDate: '',
        content: {
            generalInfo: {
                "first name": "",
                "last name": "",
                'languages': {},
                'phone number': '',
                'role_title': '',
                'linkedin': '',
                'email address': '',
            },
            education: {},
            skills: {},
            experience: {
                workingExperience: {},
                volunteerExperience: {},
                projectExperience: {}
            }
        }
    }
}