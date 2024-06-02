import { ResumeType } from "../types/dbStructType"
import { Education, Education_DayJs, EducationInputErrors, Project, ProjectExperienceInputErrors, Volunteering, Volunteering_DaysJs, VolunteeringInputErrors, Work, Work_DayJs } from "../types/resumeTypes"

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
            skills: {
                hasSections: false,
                content: []
            },
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

export const defaultEducationInputErrors: EducationInputErrors = {
    "degree": false,
    "field of study": false,
    "school name": false,
    "school address": false,
    "start date": false,
    "end date": false
  }

export const defaultEducationDayjs: Education_DayJs = {
    'degree': "",
    'field of study': "",
    'school name': "",
    'school address': "",
    'start date': null,
    'end date': null
}

export const defaultWorkingExperience: Work = {
    organizationName: '',
    jobTitle: '',
    taskDescription: [],
    startDate: '',
    stillWorking: false,
    endDate: ''
}

export const defaultWorkingExperienceDayJs: Work_DayJs = {
    organizationName: '',
    jobTitle: '',
    taskDescription: [],
    startDate: null,
    stillWorking: false,
    endDate: null
}

export const defaultVolunteeringExperience: Volunteering = {
    organizationName: '',
    jobTitle: '',
    description: [],
    startDate: '',
    stillWorking: false,
    endDate: ''
   
}
export const defaultVolunteeringExperienceDayJs: Volunteering_DaysJs = {
    organizationName: '',
    jobTitle: '',
    description: [],
    startDate: null,
    stillWorking: false,
    endDate: null
}
export const defaultVolunteeringExperienceInputErrors: VolunteeringInputErrors = {
    organizationName: false,
    jobTitle: false,
    description: false,
    startDate: false,
    stillWorking: false,
    endDate: false
}

export const defaultProjectExperience: Project = {
    title: '',
    description: ''
}

export const defaultProjectExperienceInputErrors: ProjectExperienceInputErrors = {
    title: false,
    description: false,
}