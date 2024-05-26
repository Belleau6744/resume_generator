import { ResumeType } from "../types/dbStructType"
import { Education, Education_DayJs } from "../types/resumeTypes"

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

export const defaultEducation: Education = {
    'degree': "",
    'field of study': "",
    'school name': "",
    'school address': "",
    'start date': "",
    'end date': ""
}

export const defaultEducationDayjs: Education_DayJs = {
    'degree': "",
    'field of study': "",
    'school name': "",
    'school address': "",
    'start date': null,
    'end date': null
}