//import { sanitize } from 'dompurify';
import { Component } from 'solid-js';

const eventDateFormat = new Intl.DateTimeFormat('sv-SE', { dateStyle: 'full', timeStyle: 'short' });

export const NewsEntry: Component<{ title: string, body: string, published: Date }> = (props) => {

  //const body = () => sanitize(props.body);
  const body = () => props.body;

  return (
    <article class=''>
      <h1 class='text-xl font-semibold'>{props.title}</h1>
      <div class='prose prose-xs my-1' innerHTML={body()}></div>
      <p>{eventDateFormat.format(props.published)}</p>
    </article>
  );
}
