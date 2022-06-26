import { useI18n } from '@solid-primitives/i18n';
import { Link, NavLink } from 'solid-app-router';
import { Component, createEffect, Show } from 'solid-js';
import { For } from 'solid-js';
import { useSession } from '../lib/auth.jsx';
import { SigninLink } from './auth/SigninLink.jsx';

// import styles from './Navbar.module.css';

export const Navbar: Component = () => {
  const [t, { locale }] = useI18n();
  const { session, logout } = useSession();

  const links = [
    { title: 'Home', url: '/' },
    { title: 'News', url: '/upcoming' },
    { title: 'Lunch', url: '/lunch' },
  ];

  const firstName = () => session()?.identity.traits.name.first;
  const lastName = () => session()?.identity.traits.name.last;

  return (
    <header class='navbar'>
      <div class='flex-1'>
        {/* <img
          class='aspect-square h-8'
          src='https://dtek.se/static/datalogo.svg'
          alt='Datas logo'
        /> */}
        <Link href='/' class='btn btn-ghost text-2xl font-semibold normal-case'>
          <div class='flex items-baseline gap-0.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='h-5'
              viewBox='0 0 21 18'
              fill='currentColor'
            >
              <path d='M7 18H4L9 0h3L7 18ZM3 18H0L5 0h3L3 18ZM13 18H8l.8333-3H13c6.5 0 6.5-12 0-12h-.8333L13 0c10.5 0 10.5 18 0 18Z' />
            </svg>
            <span class='hidden lg:block'>atateknologsektionen</span>
            <span class='lg:hidden'>ata</span>
          </div>
        </Link>
      </div>

      <nav class='hidden flex-none lg:block'>
        <ul class='menu rounded-box menu-horizontal gap-1 p-2'>
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

      <Show
        when={session()}
        fallback={
          <div class='flex gap-1 p-2'>
            <SigninLink></SigninLink>
            <Link href='/signup' class='btn btn-outline'>
              Sign up
            </Link>
          </div>
        }
      >
        <div class='dropdown dropdown-end'>
          <label tabindex='0' class='btn btn-ghost btn-circle avatar'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='h-8 w-8'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fill-rule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                clip-rule='evenodd'
              />
            </svg>
          </label>
          <div
            tabindex='0'
            class='card compact shadow dropdown-content bg-base-100 rounded-box mt-4 pt-2'
          >
            <div class='card-body items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-16 w-16'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                  clip-rule='evenodd'
                />
              </svg>

              <div class='text-center text-lg'>
                {firstName()} {lastName()}
              </div>

              <ul class='menu rounded-box p-0 w-56 mt-2'>
                <li>
                  <Link class='justify-between' href='/profile'>
                    Profile
                  </Link>
                </li>
                <li>
                  <a onclick={logout()}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Show>

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
          class='dropdown-content menu rounded-box bg-base-100 mt-4 w-52 p-2 shadow'
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
    </header>
  );
};
