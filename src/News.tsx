import { Component, createResource, For } from 'solid-js';
import { fetchNews } from './api';
import { NewsEntry } from './NewsEntry';

export const News: Component = () => {

  const [news] = createResource(fetchNews);

  return (
    <For each={news()}>
      {(entry) => <NewsEntry {...entry}></NewsEntry>}
    </For>
  );
}
