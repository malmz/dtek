import { useI18n } from '@amoutonbrady/solid-i18n';
import type { Component } from 'solid-js';
import { For, createResource } from 'solid-js';
import { fetchCommittees } from '../api';
import { Committee } from '../Committee';
import { Committees } from '../Committees';
import { Menu } from '../Menu';
import { NewsList } from '../NewsList';
import { SectionHeader } from '../Section';
import { Welcome } from '../Welcome';

const Main: Component = () => {
  const [t] = useI18n();
  const [committees] = createResource(fetchCommittees);

  return (
    <main class='text-zinc-900'>
      <section>
        <Welcome></Welcome>
      </section>

      <section class='flex lg:my-12 lg:mx-12 xl:mx-24'>
        <div class='hidden max-w-md shrink-0 p-8 lg:block'>
          <h1 class='my-4 text-3xl font-semibold'>{t('committees.greet')}</h1>
          <p>{t('committees.get-to-know')}</p>
        </div>

        <div class='carousel-center carousel space-x-4 bg-base-200 p-6 sm:snap-start sm:scroll-px-6 lg:carousel-center lg:rounded-box'>
          <div class='carousel-item w-full shrink-0 flex-col p-8 sm:w-auto sm:max-w-sm lg:hidden'>
            <h1 class='my-4 text-3xl font-semibold'>{t('committees.greet')}</h1>
            <p>{t('committees.get-to-know')}</p>
          </div>

          <For each={committees()}>
            {(committee) => (
              <div class='carousel-item w-full flex-col sm:w-auto sm:max-w-xs sm:flex-row xl:max-w-sm'>
                <Committee {...committee}></Committee>
              </div>
            )}
          </For>
        </div>
      </section>

      <div class='mt-8 flex flex-col lg:mx-12 lg:flex-row xl:mx-24'>
        <section class='flex-auto'>
          <SectionHeader
            title='Lunch'
            link={{ title: 'See more menus', href: '/lunch' }}
          ></SectionHeader>
          <div class='flex flex-col gap-4 p-8'>
            <Menu title='Express Johanneberg' name='johanneberg-express'></Menu>
            <Menu
              title='Kårresturangen Johanneberg'
              name='karresturangen'
            ></Menu>
          </div>
        </section>

        <div class='hidden lg:divider lg:divider-horizontal'></div>

        <section class='flex-auto'>
          <SectionHeader
            title='News'
            link={{ title: 'See all news', href: '/news' }}
          ></SectionHeader>
          <div class='flex flex-col gap-4 p-8'>
            <NewsList></NewsList>
          </div>
        </section>
      </div>

      <section>
        <SectionHeader title='Proud partners with'></SectionHeader>
        <div class='gap-4r flex flex-col p-8'>
          <img
            class='mx-auto h-16'
            src='https://dtek.se/static/images/sponsors/cpac.png'
            alt='CPAC'
          />
          <p>
            Are you a company looking to get in contact with students or a
            student looking for job offerings? Check out DAG for more info!
          </p>
          <a
            class='mx-auto inline-block rounded-lg bg-orange-500 p-4 text-zinc-50 shadow-md'
            href='https://dtek.se/dag'
          >
            Read more
          </a>
        </div>
      </section>
    </main>
  );
};

export default Main;
