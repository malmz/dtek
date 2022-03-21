import { Link, NavLink } from 'solid-app-router';
import type { Component } from 'solid-js';
import { For } from 'solid-js';

// import styles from './Navbar.module.css';

export const Navbar: Component = () => {
  /*
   * const links = [
   * { title: 'Companies', url: 'https://www.datateknologer.se' },
   * { title: 'Wiki', url: 'https://wiki.dtek.se' },
   * { title: 'Styrdokument', url: 'https://dtek.se/styrdokument' },
   * { title: 'Databussen', url: 'https://dbus.dtek.se' },
   * { title: 'Schedule', url: 'https://cloud.timeedit.net/chalmers/web/public/' },
   * { title: 'Group Rooms', url: 'https://cloud.timeedit.net/chalmers/web/b1/' },
   * { title: 'Student Union Card', url: 'https://kortladdning3.chalmerskonferens.se/' },
   * { title: 'Map', url: 'https://maps.chalmers.se/#6967eb7c-ff54-4dd7-af00-9e19fcaba128' },
   * { title: 'Newsletter', url: 'https://dtek.se/newsletter' },
   * { title: 'Support', url: 'https://dtek.se/studiesocial-hjalp' },
   * ];
   */

  const links = [
    { title: 'Home', url: '/' },
    { title: 'News', url: '/news' },
    { title: 'Lunch', url: '/lunch' },
  ];

  return (
    <header class='navbar bg-base-100'>
      <div class='flex flex-1'>
        <img
          class='aspect-square h-8'
          src='https://dtek.se/static/datalogo.svg'
          alt='Datas logo'
        />
        <Link
          href='/'
          class='btn btn-ghost font-mono text-2xl font-semibold normal-case text-zinc-900'
        >
          Dtek
        </Link>
      </div>
      <nav class='dropdown-end dropdown flex-none lg:hidden'>
        <label tabindex='0' class='btn btn-ghost'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M4 6h16M4 12h8m-8 6h16'
            />
          </svg>
        </label>
        <ul
          tabindex='0'
          class='dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow'
        >
          <For each={links}>
            {({ title, url }) => (
              <li>
                <NavLink href={url} end>
                  <span>{title}</span>
                </NavLink>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <nav class='hidden flex-none lg:block'>
        <ul class='menu rounded-box menu-horizontal p-2'>
          <For each={links}>
            {({ title, url }) => (
              <li>
                <NavLink href={url} end>
                  <span>{title}</span>
                </NavLink>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </header>
  );

  /* return (
    <header class='p-8 flex justify-between'>
      <div class='flex'>
        <img
          class='h-8 aspect-square'
          src='https://dtek.se/static/datalogo.svg'
          alt='Datas logo'
        />
        <h1 class='text-zinc-900 text-2xl ml-3 font-mono font-semibold'>
          Dtek
        </h1>
      </div>

      <nav class='flex gap-4 sm:mr-12 sm:gap-12'>
        <For each={links}>
          {({ title, url }) => (
            <NavLink class='' href={url} end>
              <span>{title}</span>
            </NavLink>
          )}
        </For>
      </nav>
    </header>
  ); */

  /*
   * return (
   * <div>
   *  <header class='flex p-2 text-zinc-100 bg-zinc-900'>
   *    <img class='' src='https://dtek.se/static/datalogo.svg' alt='Datas logo' />
   *    <div class='px-2'>
   *      <h1 class='text-2xl font-semibold font-sans'>Computer Science and Engineering</h1>
   *      <h2 class='text-md font-zinc-600'>Chalmers Student Union</h2>
   *    </div>
   *  </header>
   *  <nav class='bg-zinc-900 text-zinc-100'>
   *    <ul class='flex flex-wrap justify-around items-center'>
   *      <For each={links}>
   *        {({ title, url }) =>
   *          <li class='block px-4 py-4'>
   *            <NavLink href={url} end>
   *              <span>{title}</span>
   *            </NavLink>
   *          </li>
   *        }
   *      </For>
   *    </ul>
   *  </nav>
   * </div>
   * );
   */
};
