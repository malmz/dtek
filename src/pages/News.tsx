/* eslint-disable @typescript-eslint/no-namespace */
import { createForm } from '@felte/solid';
import type { Component } from 'solid-js';
import type { News as NewsType } from '../api';
import { addNews } from '../api';
import { NewsList } from '../NewsList';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      form: boolean;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function directive(_form: unknown) {
  // eslint-disable-next-line no-useless-return
  return;
}

const News: Component = () => {
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
        <NewsList></NewsList>
      </div>
    </main>
  );
};

export default News;
