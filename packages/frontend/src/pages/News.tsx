/* eslint-disable @typescript-eslint/no-namespace */
import { createForm } from '@felte/solid';
import { useRouteData } from 'solid-app-router';
import type { Component } from 'solid-js';
import { ErrorBoundary, For, Suspense } from 'solid-js';
import type { News as NewsType } from '../api';
import { addNews } from '../api';
import { NewsEntry } from '../components/NewsEntry';
import { directive } from '../utils';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      form: boolean;
    }
  }
}

const News: Component = () => {
  const { news } = useRouteData<{ news: () => NewsType[] }>();

  const { form } = createForm({
    onSubmit: async (v) => {
      await addNews(v as NewsType);
    },
  });

  directive(form);

  return (
    <main>
      <div class='card m-8 mr-auto max-w-lg bg-base-200 shadow-lg'>
        <div class='card-body '>
          <form use:form class='form-control gap-2'>
            <input
              type='text'
              name='title'
              placeholder='Title'
              class='input input-bordered input-primary'
            />
            <textarea
              name='body'
              class='textarea textarea-primary'
              placeholder='Post...'
            ></textarea>
            <label class='label'>
              <span class='label-text'>Start</span>
            </label>
            <input
              type='datetime-local'
              name='startDate'
              placeholder='Start'
              class='input input-primary'
            />
            <label class='label'>
              <span class='label-text'>End</span>
            </label>
            <input
              type='datetime-local'
              name='endDate'
              placeholder='End'
              class='input input-primary'
            />
            <input
              type='text'
              name='place'
              placeholder='Place'
              class='input input-bordered input-primary'
            />
            <button type='submit' class='btn btn-primary'>
              Post
            </button>
          </form>
        </div>
      </div>
      <div class='flex flex-col gap-4 p-8'>
        <ErrorBoundary fallback={<div>Error loading news...</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <For each={news()} fallback={<div>No news for now</div>}>
              {(entry) => <NewsEntry {...entry}></NewsEntry>}
            </For>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default News;
