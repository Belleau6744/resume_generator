import { ResumeType } from "../types/dbStructType"
import { Education, Education_DayJs, EducationInputErrors, Project, ProjectExperienceInputErrors, Volunteering, Volunteering_DaysJs, VolunteeringInputErrors, Work, Work_DayJs, WorkExperienceInputErrors } from "../types/resumeTypes"

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

export const getDefaultEducation = (): Education => ({
        'degree': "",
        'field of study': "",
        'school name': "",
        'school address': "",
        'start date': "",
        'end date': ""
    })

export const getDefaultEducationInputErrors = (): EducationInputErrors => ({
    "degree": false,
    "field of study": false,
    "school name": false,
    "school address": false,
    "start date": false,
    "end date": false
  })

export const getDefaultEducationDayjs = (): Education_DayJs => ({
    'degree': "",
    'field of study': "",
    'school name': "",
    'school address': "",
    'start date': null,
    'end date': null
})

export const getDefaultWorkingExperience = (): Work => ({
    organizationName: '',
    jobTitle: '',
    taskDescription: [],
    startDate: '',
    stillWorking: false,
    endDate: ''
})

export const getDefaultWorkingExperienceDayJs = (): Work_DayJs => ({
    organizationName: '',
    jobTitle: '',
    taskDescription: [],
    startDate: null,
    stillWorking: false,
    endDate: null
})
export const getDefaultWorkingExperienceInputErrors = (): WorkExperienceInputErrors => ({
    organizationName: false,
    jobTitle: false,
    taskDescription: false,
    startDate: false,
    stillWorking: false,
    endDate: false,
})


export const getDefaultVolunteeringExperience = (): Volunteering => ({
    organizationName: '',
    jobTitle: '',
    description: [],
    startDate: '',
    stillWorking: false,
    endDate: ''
})

export const getDefaultVolunteeringExperienceDayJs = (): Volunteering_DaysJs => ({
    organizationName: '',
    jobTitle: '',
    description: [],
    startDate: null,
    stillWorking: false,
    endDate: null
})
export const getDefaultVolunteeringExperienceInputErrors = (): VolunteeringInputErrors => ({
    organizationName: false,
    jobTitle: false,
    description: false,
    startDate: false,
    stillWorking: false,
    endDate: false
})

export const getDefaultProjectExperience = (): Project => ({
    title: '',
    description: ''
})

export const getDefaultProjectExperienceInputErrors = (): ProjectExperienceInputErrors => ({
    title: false,
    description: false,
})