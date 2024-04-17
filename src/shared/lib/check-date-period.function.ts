import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import startOfToday from 'date-fns/startOfToday';
import subDays from 'date-fns/subDays';
import subMonths from 'date-fns/subMonths';

import { DateIntervals } from '../contract';

export const checkDatePeriod = (date: Date): DateIntervals => {
  const periodDates = {
    [DateIntervals.today]: {
      start: startOfToday(),
    },
    [DateIntervals.yesterday]: {
      start: subDays(startOfToday(), 1),
      end: subDays(startOfToday(), 1),
    },
    [DateIntervals.week]: {
      start: subDays(startOfToday(), 7),
      end: startOfToday(),
    },
    [DateIntervals.month]: {
      start: subMonths(startOfToday(), 1),
    },
  };

  const checkPeriod = (date: Date, { start, end }: { start?: Date; end?: Date }): boolean => {
    if (start && end) {
      return !isBefore(date, start) && !isAfter(date, end);
    }

    if (start) {
      return !isBefore(date, start);
    }

    if (end) {
      return !isAfter(date, end);
    }

    return false;
  };

  if (checkPeriod(date, periodDates[DateIntervals.today])) {
    return DateIntervals.today;
  }

  if (checkPeriod(date, periodDates[DateIntervals.yesterday])) {
    return DateIntervals.yesterday;
  }

  if (checkPeriod(date, periodDates[DateIntervals.week])) {
    return DateIntervals.week;
  }

  if (checkPeriod(date, periodDates[DateIntervals.month])) {
    return DateIntervals.month;
  }

  return DateIntervals.all;
};
