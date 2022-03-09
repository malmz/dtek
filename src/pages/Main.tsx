import { Link } from 'solid-app-router';
import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { Committees } from '../Committees';
import { Menu } from '../Menu';
import { NewsList } from '../NewsList';
import { SectionHeader } from '../Section';

const Main: Component = () => {
  return (
    <main class='text-zinc-900'>
      <div class=''>
        <div class='flex flex-col lg:flex-row overflow-hidden xl:mx-24 lg:justify-between'>
          <section class='lg:max-w-md lg:shrink-0'>
            <div class='p-8'>
              <h2 class='text-3xl'>
                <span class='text-orange-500'>Welcome</span> to computer science
                and enginering!
              </h2>
              <div class='mt-8 space-y-3'>
                <p>
                  This is the Dtek portal, containing useful links and
                  infromation about studen life at chalmers. Here you can read
                  about upcomming events, find out whats for lunch and much
                  more.
                </p>
                <p>
                  Datateknologssektionen is a non-profit organisation whos
                  mission is to improve student life for all studens in the
                  computer science and enginering program. We organize the
                  opening weeks for new studens, thow parties, bring student
                  feedback to Chalmers and lots more.
                </p>
              </div>
            </div>
          </section>

          <section class='grow overflow-hidden lg:my-auto'>
            <h1 class='text-3xl font-semibold mx-8 mb-4 lg:hidden'>
              Meet the committees
            </h1>
            <div class='bg-orange-200  py-8 lg:rounded-l-lg xl:rounded-lg'>
              <h1 class='text-3xl font-semibold mx-8 mb-4 hidden lg:block'>
                Meet the committees
              </h1>
              <Committees></Committees>
            </div>
          </section>
        </div>

        <div class='flex flex-col lg:flex-row'>
          <section class='flex-auto'>
            <SectionHeader
              title='Lunch'
              link={{ title: 'See more menus', href: '/lunch' }}
            ></SectionHeader>
            <div class='p-8 flex flex-col gap-4'>
              <Menu
                title='Express Johanneberg'
                name='johanneberg-express'
              ></Menu>
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
            <div class='p-8 flex flex-col gap-4'>
              <NewsList></NewsList>
            </div>
          </section>
        </div>

        <section>
          <SectionHeader title='Proud partners with'></SectionHeader>
          <div class='p-8 flex flex-col gap-4r'>
            <img
              class='h-16 mx-auto'
              src='https://dtek.se/static/images/sponsors/cpac.png'
              alt='CPAC'
            />
            <p>
              Are you a company looking to get in contact with students or a
              student looking for job offerings? Check out DAG for more info!
            </p>
            <a
              class='mx-auto inline-block text-zinc-50 bg-orange-500 rounded-lg shadow-md p-4'
              href='https://dtek.se/dag'
            >
              Read more
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Main;
