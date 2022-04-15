import {
  lightFormat,
  nextFriday,
  nextMonday,
  parse,
  startOfISOWeek,
} from 'date-fns';
import { LunchInsert, MenuItemInsert } from 'knex/types/tables';
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

export async function fetchApi(
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
    const data = (await response.json()) as DishOccurrence[];
    if (data.length === 0) {
      throw new Error('No lunch found');
    }
    return data;
  } catch (error) {
    throw new Error('Failed to fetch menu', { cause: error as Error });
  }
}

async function fetchWeekMenu(
  resturant: string,
  id: string,
  date: Date
): Promise<
  { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
> {
  const startDate = startOfISOWeek(date);
  const endDate = nextFriday(startDate);
  const data = await fetchApi(id, startDate, endDate);

  const menus = new Map<
    string,
    {
      lunch: LunchInsert;
      menu_item: Omit<MenuItemInsert, 'lunch_id'>[];
    }
  >();

  for (const dish of data) {
    const menuDate = parseApiDate(dish.startDate);

    for (const displayName of dish.displayNames) {
      switch (displayName.displayNameCategory.displayNameCategoryName) {
        case 'English':
          {
            const entry = menus.get(
              menuDate.toISOString().concat('-english')
            ) ?? {
              lunch: { resturant, for_date: menuDate, lang: 'English' },
              menu_item: [],
            };

            const allergens =
              dish.dish.recipes[0].allergens.length > 0
                ? {
                    codes: dish.dish.recipes[0].allergens.map(
                      (all) => all.allergenCode
                    ),
                  }
                : undefined;
            entry.menu_item.push({
              title: dish.dishType.dishTypeNameEnglish,
              body: displayName.dishDisplayName,
              allergens,
              emission:
                dish.dish.totalEmission !== 0
                  ? dish.dish.totalEmission
                  : undefined,
              price: dish.dish.prices,
            });
            menus.set(menuDate.toISOString().concat('-english'), entry);
          }
          break;
        case 'Swedish':
          {
            const entry = menus.get(
              menuDate.toISOString().concat('-swedish')
            ) ?? {
              lunch: { resturant, for_date: menuDate, lang: 'Swedish' },
              menu_item: [],
            };
            const allergens =
              dish.dish.recipes[0].allergens.length > 0
                ? {
                    codes: dish.dish.recipes[0].allergens.map(
                      (all) => all.allergenCode
                    ),
                  }
                : undefined;

            entry.menu_item.push({
              title: dish.dishType.dishTypeName,
              body: displayName.dishDisplayName,
              allergens,
              emission:
                dish.dish.totalEmission !== 0
                  ? dish.dish.totalEmission
                  : undefined,
              price: dish.dish.prices,
            });
            menus.set(menuDate.toISOString().concat('-swedish'), entry);
          }
          break;

        default:
          throw new Error('Unknown menu language');
      }
    }
  }
  return Array.from(menus.values());
}

export async function fetchCurrentWeek(
  resturant: string,
  id: string
): Promise<
  { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
> {
  return await fetchWeekMenu(resturant, id, new Date());
}

export async function fetchNextWeek(
  resturant: string,
  id: string
): Promise<
  { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
> {
  return await fetchWeekMenu(resturant, id, nextMonday(new Date()));
}
