import { Link } from 'solid-app-router';
import type { Component } from 'solid-js';

export interface CommitteeProps {
  name: string;
  description: string;
  imageUrl: string;
  homepage: string;
  mask?: boolean;
}

//sm:from-primary sm:to-secondary sm:text-primary-content

export const Committee: Component<CommitteeProps> = (props) => {
  return (
    <Link
      class='card flex-col bg-gradient-to-tr sm:flex-row sm:bg-base-200 sm:shadow-lg sm:duration-300 sm:ease-in-out sm:hover:-translate-y-1 sm:hover:shadow-xl'
      href={props.homepage}
    >
      <figure class='shrink-0 pl-8'>
        <img
          src={props.imageUrl}
          alt='Logo'
          class='h-32'
          classList={{ mask: props.mask, 'mask-squircle': props.mask }}
        />
      </figure>
      <div class='card-body content-center'>
        <h2 class='card-title'>{props.name}</h2>
        <p>{props.description}</p>
      </div>
    </Link>
  );
};
