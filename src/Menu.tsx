import { createResource, ErrorBoundary, For, Show, Suspense } from 'solid-js';
import type { Component } from 'solid-js';
import { fetchLunch } from './api';

export const Menu: Component<{ title: string; name: string }> = (props) => {
  const [menu] = createResource(() => props.name, fetchLunch);

  return (
    <div class=''>
      <h1 class='mb-2 text-xl font-semibold'>{props.title}</h1>
      <ErrorBoundary fallback={<div>Error loading menu</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <div class='flex flex-col gap-2'>
            <For each={menu()}>
              {(dish) => (
                <div class='flex flex-wrap gap-x-2 text-sm'>
                  <Show when={dish.type}>
                    <span class='shrink-0 font-semibold'>{dish.type}</span>
                  </Show>
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
