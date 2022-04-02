import {
  addBusinessDays,
  isAfter,
  isWeekend,
  nextMonday,
  setHours,
  startOfDay,
  startOfISOWeek,
} from 'date-fns';

export function getLunchDate(): Date {
  const today = startOfDay(new Date());
  const afternoon = setHours(today, 18);

  if (isAfter(new Date(), afternoon)) {
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
