import type { Component } from 'solid-js';
import {
  createEffect,
  createResource,
  ErrorBoundary,
  For,
  Suspense,
} from 'solid-js';
import { fetchNews } from '../../api';
import { NewsEntry } from '../NewsEntry';

export const NewsList: Component = () => {
  const [news] = createResource(fetchNews);

  return (
    <ErrorBoundary fallback={<div>Error loading news</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <For each={news()} fallback={<div>No news for now</div>}>
          {(entry) => <NewsEntry {...entry}></NewsEntry>}
        </For>
      </Suspense>
    </ErrorBoundary>
  );
};
