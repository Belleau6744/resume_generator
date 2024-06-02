import { Time } from '@internationalized/date';
import * as dateFunc from 'date-fns';
import dayjs from 'dayjs';
import { TimeValue } from 'react-aria-components';

export const getWeekArray = (startDate: Date): Date[] => {
    const tempArray: Date[] = [];
    for (let i = 0; i < 7; i++) {
        tempArray[i] = dateOffset(startDate, i);
    }
    return tempArray;
};

export const getDateString = (date: dayjs.Dayjs) => {
    return date.toISOString().split("T")[0];
};

export const dateOffset = (date, offset) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + offset)
    return newDate;
};

export const getStartDate = (today: Date): Date => {
    today.setHours(0,0,0,0);
    const dayNumber: number = today.getDay();
    const sundayDate = new Date();
    sundayDate.setHours(0,0,0,0);
    sundayDate.setDate(today.getDate() - (dayNumber - 1));
    if (dateFunc.getISOWeek(sundayDate) !== dateFunc.getISOWeek(today)) {
      console.warn("ISO WEEK DIFFERENT");
    }
    return sundayDate;
};

export const separateTime = (time: number): Time => {
    // Extract hour and minute components
    const hour = Math.floor(time / 100);
    const minute = time % 100;
    return new Time(hour, minute);
};

export const TimeToNumber = (time: TimeValue) => {
    const timeString = time.hour.toString() + time.minute.toString();
    return Number(timeString);
  };