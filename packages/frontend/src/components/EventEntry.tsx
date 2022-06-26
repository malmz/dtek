import { useI18n } from '@solid-primitives/i18n';
import { Component, createMemo, Match, Show, Switch } from 'solid-js';
import { Events } from '../lib/api.js';
import {
  differenceInCalendarDays,
  isAfter,
  isBefore,
  isEqual,
  isFuture,
} from 'date-fns';

export const EventEntry: Component<{ event: Events }> = (props) => {
  const [_t, { locale }] = useI18n();

  const startDateToday = new Intl.DateTimeFormat(locale(), {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const badge = createMemo(() => {
    if (
      isFuture(props.event.start_at) &&
      differenceInCalendarDays(props.event.updated_at, new Date()) <= 3
    ) {
      if (isEqual(props.event.created_at, props.event.updated_at)) {
        return <span class='indicator-item badge badge-info'>new</span>;
      } else {
        return <span class='indicator-item badge badge-warning'>updated</span>;
      }
    }
  });

  const ongoing = () =>
    isBefore(props.event.start_at, new Date()) &&
    isAfter(props.event.end_at, new Date());

  const ended = () => isAfter(new Date(), props.event.end_at);

  return (
    <div class='indicator'>
      <Show when={badge()}>{badge()}</Show>
      <article class='card compact bg-base-200 shadow'>
        <div class='card-body max-w-lg'>
          <div class='flex justify-between'>
            <div class='flex gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-5 w-5 fill-primary'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clip-rule='evenodd'
                />
              </svg>
              <span>{startDateToday.format(props.event.start_at)}</span>
              <Switch>
                <Match when={ongoing()}>
                  <span class='badge badge-accent'>ongoing</span>
                </Match>
                <Match when={ended()}>
                  <span class='badge badge-error'>ended</span>
                </Match>
              </Switch>
            </div>
            <div class='flex gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clip-rule='evenodd'
                />
              </svg>
              <span>Dhack</span>
            </div>
          </div>

          <h1 class='card-title'>{props.event.title}</h1>
          <p class='line-clamp-3'>{props.event.body}</p>

          <div class='flex flex-row gap-0.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='h-5 w-5 flex-shrink-0'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fill-rule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clip-rule='evenodd'
              />
            </svg>
            <span class='truncate'>{props.event.place}</span>
          </div>
        </div>
      </article>
    </div>
  );
};
