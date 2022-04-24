import {
  addBusinessDays,
  isAfter,
  isPast,
  isWeekend,
  nextMonday,
  setHours,
  startOfDay,
  startOfHour,
  startOfISOWeek,
} from 'date-fns';

export function getLunchDate(): Date {
  const today = startOfDay(new Date());
  const afternoon = startOfHour(setHours(today, 18));

  if (isPast(afternoon)) {
    return addBusinessDays(today, 1);
  } else if (isWeekend(new Date())) {
    return nextMonday(today);
  } else {
    return today;
  }
}

export function getStartOfWeek(): Date {
  const now = new Date();
  if (isWeekend(now)) {
    return nextMonday(startOfDay(now));
  } else {
    return startOfISOWeek(now);
  }
}
