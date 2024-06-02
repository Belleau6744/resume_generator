import dayjs from "dayjs"
import { Volunteering, Volunteering_DaysJs } from "../../../../../types/resumeTypes"
import { getDateString } from "../../../../../utils/dateUtils"

export const volunteeringExperienceToDayJs = (curr: Volunteering): Volunteering_DaysJs => {
    if (curr.stillWorking === true) {
        return {
            ...curr,
            'startDate': curr.startDate ? dayjs(curr.startDate) : null, 
        }
    } else {
        return {
            ...curr,
            'startDate': curr.startDate ? dayjs(curr.startDate) : null, 
            'endDate': curr.endDate ? dayjs(curr.endDate): null
        }
    }
}

export const dayJsToVolunteeringExperience = (curr: Volunteering_DaysJs): Volunteering => {
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