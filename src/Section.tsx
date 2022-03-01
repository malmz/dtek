import { Link } from 'solid-app-router';
import { Component, Show } from 'solid-js';

export const Section: Component<{ title: string, link?: { title: string, href: string, } }> = (props) => {
  return (
    <section>
      <div class='flex justify-between justify-items-center bg-gradient-to-r from-orange-500 to-red-500 text-zinc-50 px-8 py-4'>
        <h1 class='text-3xl font-semibold '>{props.title}</h1>
        <Show when={props.link}>
          <Link class='flex' href={props.link!.href}>
            <span class='my-auto'>{`${props.link!.title} >`}</span>
          </Link>
        </Show>
      </div>
      {props.children}
    </section>
  );
}
