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
  const [committees] = createResource(fetchCommittees);

  return (
    <main class='text-zinc-900'>
      <section>
        <Welcome></Welcome>
      </section>

      <section class='my-12 flex lg:mx-24'>
        <div class='max-w-md p-8'>
          <h1 class='my-4 text-3xl font-semibold'>Meet the committees</h1>
          <p>
            Get to know all the wonderfull student run committees that help
            improve the quality of your education when studying and having lots
            of fun when you're not.
          </p>
        </div>

        <div class='carousel-center carousel rounded-box space-x-4 bg-base-200 p-6'>
          <For each={committees()}>
            {(committee) => (
              <div class='carousel-item'>
                <Committee {...committee}></Committee>
              </div>
            )}
          </For>
        </div>
      </section>

      <div class='mt-8 flex flex-col lg:mx-24 lg:flex-row'>
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
