import { Link } from 'solid-app-router';
import type { Component, JSX } from 'solid-js';
import { Show } from 'solid-js';

export const SectionHeader: Component<{
  title: JSX.Element;
  link?: { title: JSX.Element; href: string };
}> = (props) => {
  return (
    <div class='mt-4 flex justify-between justify-items-center px-8 py-4'>
      <h1 class='text-3xl font-semibold '>{props.title}</h1>
      <Show when={props.link}>
        <Link
          class='link link-hover flex flex-row gap-1 items-center'
          href={props.link!.href}
        >
          <span>{props.link!.title}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fill-rule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clip-rule='evenodd'
            />
          </svg>
        </Link>
      </Show>
    </div>
  );
};
