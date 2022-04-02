import {
  createResource,
  ErrorBoundary,
  For,
  Match,
  Show,
  Suspense,
  Switch,
} from 'solid-js';
import type { Component } from 'solid-js';
import { fetchLunch } from '../api';

export const Menu: Component<{ title: string; name: string }> = (props) => {
  const [menu] = createResource(() => props.name, fetchLunch);

  return (
    <div class=''>
      <h1 class='mb-2 text-xl font-semibold'>{props.title}</h1>
      <ErrorBoundary fallback={<div>Could not find the lunch today</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <div class='flex flex-col gap-2'>
            <Switch fallback={<div>No lunch for today</div>}>
              <Match when={menu()?.preformatted}>
                <pre>{menu()?.preformatted}</pre>
              </Match>
              <Match when={menu()?.dishes}>
                <For each={menu()?.dishes}>
                  {(dish) => (
                    <div class='flex flex-wrap gap-x-2 text-sm'>
                      <Show when={dish.type}>
                        <span class='shrink-0 font-semibold'>{dish.type}</span>
                      </Show>
                      <span>{dish.name}</span>
                    </div>
                  )}
                </For>
              </Match>
            </Switch>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
