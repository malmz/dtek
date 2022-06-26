import {
  createMemo,
  createResource,
  ErrorBoundary,
  For,
  JSX,
  Show,
  Suspense,
} from 'solid-js';
import type { Component } from 'solid-js';
import { fetchLunch } from '../lib/api';
import { useI18n } from '@solid-primitives/i18n';
import {
  addBusinessDays,
  isFriday,
  isPast,
  isWeekend,
  nextMonday,
  setHours,
  startOfDay,
  startOfHour,
} from 'date-fns';

export const MenuTitle: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (
  props
) => {
  const [t] = useI18n();

  const title = () => {
    const today = startOfDay(new Date());
    const afternoon = startOfHour(setHours(today, 18));

    if (isWeekend(new Date())) {
      return t('menu.monday');
    } else if (isPast(afternoon)) {
      if (isFriday(today)) {
        return t('menu.monday');
      } else {
        return t('menu.tomorrow');
      }
    } else {
      return t('menu.today');
    }
  };

  return <span {...props}>{title()} Lunch</span>;
};

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
