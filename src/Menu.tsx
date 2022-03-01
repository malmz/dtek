import { get, set } from 'idb-keyval';
import { Component, createResource, For, Suspense } from 'solid-js';

interface ExpressResponse {
  dishType: {
    name: string;
  },
  displayNames: [
    {
      name: string;
      sortOrder: number;
      categoryName: string;
    }
  ],
  startDate: string;
}

export interface MenuItem {
  resturantName: string;
  dishName: string;
}

// Thank you to IT for figureing this out so i dont have to
// https://github.com/cthit/chalmersit-lunch/blob/master/chalmrest.rb
// https://chalmerskonferens.se/en/api/
// Yes, this is weird undocumented stuff
const menuQuery = `
  query MealQuery(
    $mealProvidingUnitID: String
    $startDate: String
    $endDate: String
  ) {
    dishOccurrencesByTimeRange(
      mealProvidingUnitID: $mealProvidingUnitID
      startDate: $startDate
      endDate: $endDate
    ) {
      displayNames {
        sortOrder
        name
        categoryName
      }
      startDate
      dishType {
        name
      }
    }
  }
  `;

const apiUrl = 'https://heimdallprod.azurewebsites.net/graphql';

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

async function getCachedMenu(id: string, language: string, startDate?: Date, endDate?: Date): Promise<MenuItem[] | undefined> {
  const data = await get<MenuItem[]>(`${id}-${language}-${formatDate(startDate ?? new Date())}-${formatDate(endDate ?? new Date())}`);
  return data;
}

async function setCachedMenu(value: MenuItem[], id: string, language: string, startDate?: Date, endDate?: Date): Promise<void> {
  await set(`${id}-${language}-${formatDate(startDate ?? new Date())}-${formatDate(endDate ?? new Date())}`, value);
}

async function fetchRemoteMenu(id: string, language: 'Swedish' | 'English', startDate?: Date, endDate?: Date): Promise<MenuItem[]> {
  const body = {
    query: menuQuery,
    variables: {
      mealProvidingUnitID: id,
      startDate: formatDate(startDate ?? new Date()),
      endDate: formatDate(endDate ?? new Date()),
    },
  };

  console.log(body);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  const expressData: ExpressResponse[] = data.data.dishOccurrencesByTimeRange;

  return expressData.map((e) => {
    return {
      dishName: e.displayNames.find((n) => n.categoryName === language)!.name,
      resturantName: e.dishType.name
    };
  });
}

export async function fetchMenu(id: string, language: 'Swedish' | 'English', startDate?: Date, endDate?: Date): Promise<MenuItem[]> {
  const cached = await getCachedMenu(id, language, startDate, endDate);
  if (cached) {
    return cached;
  }

  const data = await fetchRemoteMenu(id, language, startDate, endDate);
  setCachedMenu(data, id, language, startDate, endDate);
  return data;
}



export const Menu: Component<{ title: string, id: string }> = (props) => {

  const [menu] = createResource(() => props.id, async (id) => {
    return fetchMenu(id, 'Swedish');
  });

  return (
    <div class=''>
      <h1 class='text-xl font-semibold mb-2'>{props.title}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div class='flex flex-col gap-2'>
          <For each={menu()}>
            {(dish) =>
              <div class='flex gap-x-2 text-sm flex-wrap'>
                <span class='font-semibold shrink-0'>{dish.resturantName}</span>
                <span>{dish.dishName}</span>
              </div>
            }
          </For>
        </div>
      </Suspense>

    </div>
  );
}
