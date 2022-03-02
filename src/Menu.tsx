import { createResource, ErrorBoundary, For, Suspense } from 'solid-js';
import type { Component } from 'solid-js';
import { fetchLunch } from './api';

export const Menu: Component<{ title: string; name: string }> = (props) => {
  const [menu] = createResource(() => props.name, fetchLunch);

  return (
    <div class=''>
      <h1 class='text-xl font-semibold mb-2'>{props.title}</h1>
      <ErrorBoundary fallback={<div>Error loading menu</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <div class='flex flex-col gap-2'>
            <For each={menu()?.dishes}>
              {(dish) => (
                <div class='flex gap-x-2 text-sm flex-wrap'>
                  <span class='font-semibold shrink-0'>{dish.type}</span>
                  <span>{dish.name}</span>
                </div>
              )}
            </For>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
