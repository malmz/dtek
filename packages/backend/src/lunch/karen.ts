import { lightFormat, parse } from 'date-fns';
import { LunchInsert, MenuItemInsert } from 'knex/types/tables';
import { Fetcher } from './index.js';
import axios from 'axios';

interface DishOccurrence {
  startDate: string;
  mealProvidingUnit: { mealProvidingUnitName: string };
  displayNames: {
    dishDisplayName: string;
    displayNameCategory: {
      displayNameCategoryName: string;
    };
  }[];
  dishType?: {
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

const apiClient = axios.create({
  baseURL:
    'http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/',
  timeout: 20000,
});

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
  try {
    const res = await apiClient.get<DishOccurrence[]>(`${id}/dishoccurrences`, {
      params: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
    });
    if (res.data.length === 0) {
      throw new Error('No lunch found');
    }
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch menu', { cause: error as Error });
  }
}

export class KarenFetcher implements Fetcher {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  async fetch(
    startDate: Date,
    endDate: Date
  ): Promise<
    { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
  > {
    const menus = new Map<
      string,
      {
        lunch: LunchInsert;
        menu_item: Omit<MenuItemInsert, 'lunch_id'>[];
      }
    >();

    const data = await fetchApi(this.id, startDate, endDate);

    for (const dish of data) {
      const menuDate = parseApiDate(dish.startDate);

      for (const displayName of dish.displayNames) {
        const key = `${menuDate.toISOString()}-${
          displayName.displayNameCategory.displayNameCategoryName
        }`;

        const title =
          displayName.displayNameCategory.displayNameCategoryName === 'English'
            ? dish.dishType?.dishTypeNameEnglish
            : dish.dishType?.dishTypeName;

        const entry = menus.get(key) ?? {
          lunch: {
            resturant: this.name,
            for_date: menuDate,
            lang: displayName.displayNameCategory.displayNameCategoryName,
          },
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

        const emission =
          dish.dish.totalEmission !== 0 ? dish.dish.totalEmission : undefined;

        entry.menu_item.push({
          title,
          body: displayName.dishDisplayName,
          allergens,
          emission,
          price: dish.dish.prices,
        });

        menus.set(key, entry);
      }
    }
    return Array.from(menus.values());
  }
}
