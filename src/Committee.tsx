import { Link } from 'solid-app-router';
import type { Component } from 'solid-js';

export interface CommitteeProps {
  name: string;
  description: string;
  imageUrl: string;
  homepage: string;
  mask?: boolean;
}

export const Committee: Component<CommitteeProps> = (props) => {
  return (
    <Link
      class='card card-side bg-gradient-to-tr from-orange-400 to-red-400 text-zinc-50 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl'
      href={props.homepage}
    >
      <figure class='pl-8'>
        <img
          src={props.imageUrl}
          alt='Logo'
          class='h-32'
          classList={{ mask: props.mask, 'mask-squircle': props.mask }}
        />
      </figure>
      <div class='card-body max-w-sm content-center'>
        <h2 class='card-title'>{props.name}</h2>
        <p>{props.description}</p>
      </div>
    </Link>
  );
};
