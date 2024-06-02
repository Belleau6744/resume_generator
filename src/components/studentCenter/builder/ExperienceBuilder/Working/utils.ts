import dayjs from "dayjs"
import { Work, Work_DayJs, WorkExperienceInputErrors } from "../../../../../types/resumeTypes"
import { getDateString } from "../../../../../utils/dateUtils"

export const workingExperienceToDayJs = (curr: Work): Work_DayJs => {
    if (curr.stillWorking === true) {
        return {
            ...curr,
            'startDate': curr.startDate ? dayjs(curr.startDate) : null, 
        }
    } else {
        return {
            ...curr,
            'startDate': curr.endDate ? dayjs(curr.startDate) : null, 
            'endDate': curr.endDate ? dayjs(curr.endDate): null
        }
    }
}

export const dayJsToWorkingExperience = (curr: Work_DayJs): Work => {
    if (curr.stillWorking === true) {
        return {
            ...curr,
            'startDate': curr.startDate ? getDateString(curr.startDate) : '', 
        }
    } else {
        return {
            ...curr,
            'startDate': curr.endDate ? getDateString(curr.startDate) : '', 
            'endDate': curr.endDate ? getDateString(curr.endDate): ''
        }
    }
}
// TODO RE-Organize
export const checkInputEmptyWorkingExperience = (inputFields: Work_DayJs): WorkExperienceInputErrors => {
    const inputErrors: WorkExperienceInputErrors = {
        organizationName: false,
        jobTitle: false,
        taskDescription: false,
        startDate: false,
        stillWorking: false,
        endDate: false,
    }
    Object.entries(inputFields).forEach(item => {
        if(item[1] === '' || item[1] === null || (Array.isArray(item[1]) && item[1].length === 0)) {
            inputErrors[item[0]] = true;
        }
    });
    return inputErrors;
}