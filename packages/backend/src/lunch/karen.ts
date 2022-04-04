import {
  lightFormat,
  nextFriday,
  nextMonday,
  parse,
  startOfISOWeek,
} from 'date-fns';
import { lunch } from '../db/index.js';
import fetch from 'node-fetch';

interface DishOccurrence {
  startDate: string;
  mealProvidingUnit: { mealProvidingUnitName: string };
  displayNames: {
    dishDisplayName: string;
    displayNameCategory: {
      displayNameCategoryName: string;
    };
  }[];
  dishType: {
    dishTypeName: string;
    dishTypeNameEnglish: string;
  };
  dish: {
    recipes: {
      allergens: {
        allergenCode: string;
        allergenURL: string;
      }[];
    }[];
    dishName: string;
    totalEmission: number;
    prices: string;
  };
}

const apiUrl =
  'http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/';

function formatDate(date: Date): string {
  return lightFormat(date, 'yyyy-MM-dd');
}

function parseApiDate(date: string): Date {
  return parse(date, 'M/dd/yyyy hh:mm:ss a', new Date(), {});
}

async function fetchApi(
  id: string,
  startDate: Date,
  endDate: Date
): Promise<DishOccurrence[]> {
  const url = new URL(`${id}/dishoccurrences`, apiUrl);
  url.searchParams.set('startDate', formatDate(startDate));
  url.searchParams.set('endDate', formatDate(endDate));

  const ab = new AbortController();
  try {
    const t = setTimeout(() => ab.abort(), 20000);
    const response = await fetch(url.toString(), {
      signal: ab.signal,
    });
    clearTimeout(t);
    return (await response.json()) as DishOccurrence[];
  } catch (error) {
    throw new Error('Failed to fetch menu', { cause: error as Error });
  }
}

async function fetchWeekMenu(
  resturant: string,
  id: string,
  date: Date
): Promise<lunch.Create[]> {
  const startDate = startOfISOWeek(date);
  const endDate = nextFriday(date);
  const data = await fetchApi(id, startDate, endDate);
  const menus: lunch.Create[] = [];
  for (const dish of data) {
    const menuDate = parseApiDate(dish.startDate);
    for (const displayName of dish.displayNames) {
      const type =
        displayName.displayNameCategory.displayNameCategoryName === 'English'
          ? dish.dishType.dishTypeNameEnglish
          : dish.dishType.dishTypeName;

      menus.push({
        resturant: resturant,
        title: type,
        body: displayName.dishDisplayName,
        for_date: menuDate,
        lang: displayName.displayNameCategory.displayNameCategoryName,
      });
    }
  }
  return menus;
}

export async function fetchCurrentWeek(
  resturant: string,
  id: string
): Promise<lunch.Create[]> {
  return await fetchWeekMenu(resturant, id, new Date());
}

export async function fetchNextWeek(
  resturant: string,
  id: string
): Promise<lunch.Create[]> {
  return await fetchWeekMenu(resturant, id, nextMonday(new Date()));
}
