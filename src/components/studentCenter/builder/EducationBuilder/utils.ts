import { Education, Education_DayJs } from "@types";
import dayjs from "dayjs";
import { getDateString } from "../../../../utils/dateUtils";

export const educationToDayjs = (curr: Education): Education_DayJs => {
    return {
        ...curr,
        ["end date"]: curr["end date"] ? dayjs(curr["end date"]) : null, 
        ["start date"]: curr["start date"] ? dayjs(curr["start date"]): null
    }
}

export const dayjsToEducation = (curr: Education_DayJs): Education => {
    return {
        ...curr,
        ["end date"]: curr["end date"] ? getDateString(curr["end date"]) : '',
        ["start date"]: curr["start date"] ? getDateString(curr["start date"]) : ''
    }
}