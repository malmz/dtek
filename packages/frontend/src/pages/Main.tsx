import { useI18n } from '@solid-primitives/i18n';
import { Component, createEffect, Show } from 'solid-js';
import { For, createResource } from 'solid-js';
import { fetchCommittees } from '../lib/api';
import { useSession } from '../lib/auth.jsx';
import { Committee } from '../components/Committee';
import { Menu, MenuTitle } from '../components/Menu';
import { NewsList } from '../components/content/NewsList';
import { SectionHeader } from '../components/SectionHeader';
import { Welcome } from '../components/content/Welcome';

const Main: Component = () => {
  const [t] = useI18n();
  const [committees] = createResource(fetchCommittees);

  return (
    <main class=''>
      <section>
        <Welcome></Welcome>
      </section>

      <section class='flex lg:my-12 lg:mx-12 xl:mx-24'>
        <div class='hidden max-w-md shrink-0 p-8 lg:block'>
          <h1 class='my-4 text-3xl font-semibold'>{t('committees.greet')}</h1>
          <p>{t('committees.get-to-know')}</p>
        </div>

        <div class='carousel-center carousel bg-primary lg:carousel-center lg:rounded-box space-x-4 p-6 sm:snap-start sm:scroll-px-6'>
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
            title={<MenuTitle></MenuTitle>}
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

        <div class='lg:divider lg:divider-horizontal hidden'></div>

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

      <section class='my-8 flex flex-col lg:mx-12 xl:mx-24'>
        <SectionHeader title='Proud partners with'></SectionHeader>
        <div class='gap-4 flex p-8'>
          <img
            class='mx-auto h-16'
            src='https://dtek.se/static/images/sponsors/cpac.png'
            alt='CPAC'
          />
          <div class='flex flex-col gap-4'>
            <img
              src='/src/assets/DAG_logga.webp'
              alt='DAG Logo'
              class='w-52 self-center'
            />
            <div class='flex flex-col gap-4'>
              <p class='text-xl max-w-lg'>
                <span class='font-bold'>{t('company.bang')}</span>{' '}
                {t('company.body')}
              </p>
              <a class='btn-link text-center' href='https://dtek.se/dag'>
                {t('general.read-more')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
