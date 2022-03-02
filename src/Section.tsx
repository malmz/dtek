import { Link } from 'solid-app-router';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';

export const Section: Component<{
  title: string;
  link?: { title: string; href: string };
}> = (props) => {
  return (
    <section>
      <div class='flex justify-between justify-items-center px-8 py-4 mt-4'>
        <h1 class='text-3xl font-semibold '>{props.title}</h1>
        <Show when={props.link}>
          <Link class='flex hover:underline' href={props.link!.href}>
            <span class='my-auto'>{`${props.link!.title} >`}</span>
          </Link>
        </Show>
      </div>
      {props.children}
    </section>
  );
};
