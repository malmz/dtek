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
  const btnclick = (i: number) => {
    const elem = document.getElementById(`committee-${i}`);
    elem?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <>
      <div
        ref={scrollElem!}
        class='snap-mandatory snap-x grid grid-flow-col overflow-x-scroll sm:gap-4 scroll-p-8'
      >
        <div class='w-12 sm:w-72 md:w-80'></div>
        <For each={committees()}>
          {(data, i) => (
            <div class=''>
              <a
                id={`committee-${i()}`}
                href={data.url}
                class='p-8 w-screen h-48 flex items-center snap-center gap-5 scroll-m-4 snap-always sm:bg-gradient-to-tr sm:from-orange-400 sm:to-red-400 sm:text-zinc-50 sm:w-96 sm:shrink-0 sm:rounded-md sm:shadow-md lg:snap-start'
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
        <div class='w-12 sm:w-72 md:w-80'></div>
      </div>

      <div class='btn-group justify-center mt-4'>
        <For each={committees()}>
          {(_, i) => (
            <input
              type='radio'
              name='options'
              data-title={i()}
              class='btn'
              onclick={() => btnclick(i())}
              checked={i() === 0}
            ></input>
          )}
        </For>
      </div>
    </>
  );
};
