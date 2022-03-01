import { Component, createResource, For, Suspense } from 'solid-js';
import { fetchMenu } from './menu';



const resturants = [
  { name: 'Express', id: '3d519481-1667-4cad-d2a3-08d558129279' }
];

export const LunchMenu: Component = () => {

  const lunch = resturants.map((resturant) => {
    const [data] = createResource(async () => {
      return fetchMenu(resturant.id, 'Swedish');
    });

    return {
      name: resturant.name,
      menu: data,
    };
  });

  return (
    <div>
      <For each={lunch}>
        {(m) =>
          <Suspense fallback={'Loading...'}>
            <h1 class='text-xl font-semibold'>{m.name}</h1>
            <For each={m.menu()}>
              {(dish) =>
                <div class='flex gap-2'>
                  <span class='font-semibold text-sm'>{dish.resturantName}</span>
                  <span class='text-sm text-zinc-800'>{dish.dishName}</span>
                </div>
              }
            </For>
          </Suspense>
        }
      </For>
    </div>
  );
}
