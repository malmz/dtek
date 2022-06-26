// import { sanitize } from 'dompurify';
import type { Component } from 'solid-js';
import type { News } from '../lib/api';

const eventDateFormat = new Intl.DateTimeFormat('sv-SE', {
  dateStyle: 'full',
  timeStyle: 'short',
});

export const NewsEntry: Component<News> = (props) => {
  // const body = () => sanitize(props.body);

  return (
    <article class='rounded-box bg-base-200 p-4'>
      <h1 class='text-xl font-semibold'>{props.title}</h1>
      <p>{props.body}</p>
      <p>{eventDateFormat.format(props.updated_at)}</p>
    </article>
  );
};
