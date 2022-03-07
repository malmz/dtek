import { NavLink } from 'solid-app-router';
import type { Component } from 'solid-js';
import { For } from 'solid-js';

// import styles from './Navbar.module.css';
import './Navbar.css';

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
  );

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
