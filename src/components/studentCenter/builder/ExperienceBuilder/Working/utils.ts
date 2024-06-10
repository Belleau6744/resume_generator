import { Work, Work_DayJs } from "@types";
import dayjs from "dayjs";
import { getDateString } from "../../../../../utils/dateUtils";

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