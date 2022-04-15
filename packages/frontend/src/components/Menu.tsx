import { createResource, ErrorBoundary, For, Show, Suspense } from 'solid-js';
import type { Component } from 'solid-js';
import { fetchLunch } from '../api';
import { useI18n } from '@solid-primitives/i18n';

export const Menu: Component<{ title: string; name: string }> = (props) => {
  const [t, { locale }] = useI18n();
  const lang = () => {
    const l = locale();
    switch (l) {
      case 'sv':
      case 'sv-SE':
        return 'Swedish';
      case 'en':
      case 'en-US':
      case 'en-GB':
      case 'en-AU':
        return 'English';

      default:
        return 'English';
    }
  };

  const [menu] = createResource(
    () => ({ id: props.name, lang: lang() }),
    fetchLunch
  );

  return (
    <div class=''>
      <h1 class='mb-2 text-xl font-semibold'>{props.title}</h1>
      <ErrorBoundary fallback={<div>Could not find the lunch today</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <div class='flex flex-col gap-2'>
            <For each={menu()} fallback={<div>No lunch for today</div>}>
              {(dish) => (
                <div class='flex flex-wrap gap-x-2 text-sm'>
                  <Show when={dish.title}>
                    <span class='shrink-0 font-semibold'>{dish.title}</span>
                  </Show>
                  <Show
                    when={dish.preformatted}
                    fallback={<span>{dish.body}</span>}
                  >
                    <pre>{dish.body}</pre>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
