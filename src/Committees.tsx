import { Link } from 'solid-app-router';
import type { Component } from 'solid-js';
import { For } from 'solid-js';

const committeesData = [
  {
    name: 'D-Styret',
    url: 'https://wiki.dtek.se/wiki/Styret',
    logo: 'https://wiki.dtek.se/images/7/79/Styretlogga.png',
  },
  {
    name: 'DLude',
    description: 'Gaming of all kinds',
    url: 'https://wiki.dtek.se/wiki/DLude',
    logo: 'https://wiki.dtek.se/images/thumb/2/24/DLude21.png/600px-DLude21.png',
  },
  {
    name: 'DNS',
    description: 'Helps you study',
    url: 'https://wiki.dtek.se/wiki/DNS',
    logo: 'https://wiki.dtek.se/images/thumb/d/dd/DNS21.png/600px-DNS21.png',
  },
  {
    name: 'D6',
    description: 'Here to party',
    url: 'https://wiki.dtek.se/wiki/D6',
    logo: 'https://wiki.dtek.se/images/thumb/b/bd/D621-grad.png/600px-D621-grad.png',
  },
  {
    name: 'DNollK',
    description: 'Gives you a warm welcome',
    url: 'https://wiki.dtek.se/wiki/DNollK',
    logo: 'https://dnollk.se/cdn/storage/images/gjnmFQLEZ3BCtZGHL/original/gjnmFQLEZ3BCtZGHL.png',
  },
];

export const Committees: Component = (props) => {
  const committees = () => committeesData;
  let scrollElem: HTMLDivElement;
  const btnclick = (e: Event) => {
    const elem = document.getElementById('committee-2');
    scrollElem.
  };

  return (
    <>
      <div
        ref={scrollElem!}
        class='snap-mandatory snap-x grid grid-flow-col overflow-x-auto sm:gap-4'
      >
        <div class='w-12 sm:w-72'></div>
        <For each={committees()}>
          {(data, i) => (
            <div class=''>
              <a
                id={`committee-${i()}`}
                href={data.url}
                class='p-8 w-screen h-48 flex items-center snap-center gap-5 scroll-m-4 snap-always sm:bg-gradient-to-tr sm:from-orange-400 sm:to-red-400 sm:text-zinc-50 sm:w-96 sm:shrink-0 sm:rounded-md sm:shadow-md'
              >
                {/* sm:shadow-md sm:rounded-lg bg-gradient-to-tr from-orange-400 to-red-400 text-zinc-50 gap-5 */}
                <img src={data.logo} alt='Logo' class='h-32' />
                <div>
                  <h3 class='font-semibold text-2xl'>{data.name}</h3>
                  <p>{data.description}</p>
                </div>
              </a>
            </div>
          )}
        </For>
        <div class='w-12 sm:w-72'></div>
      </div>
      <div>
        <button onClick={btnclick}>Hello</button>
      </div>
      <div class='flex justify-center gap-2 mt-2'>
        <For each={committees()}>
          {(_, i) => (
            <Link
              class='bg-orange-300 py-1 px-3 rounded-md'
              href={`#committee-${i()}`}
              rel='external'
            >
              {i()}
            </Link>
          )}
        </For>
      </div>
    </>
  );
};
