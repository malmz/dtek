import { Link } from 'solid-app-router';
import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { Committees } from '../Committees';
import { Menu } from '../Menu';
import { NewsList } from '../NewsList';
import { Section } from '../Section';

const Main: Component = () => {
  /*
   *const [express] = createResource(async () => {
   *let id = '3d519481-1667-4cad-d2a3-08d558129279';
   *const resp = await fetch(`http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/${id}/dishoccurrences`);
   *const data: ExpressResponse[] = await resp.json();
   *return parseExpressResponse(data, 'Swedish');
   *});
   */

  const posts = [
    {
      title: 'Hackkväll',
      body: '<p>Har du en lurig labb, ett kul projekt att leka med, eller är du bara fikasugen? Ta dig då till NC:s övervåning efter afterschool på onsdag för hackkväll!</p>',
      place: 'NC',
      published: new Date(2022, 1, 30, 18, 18),
    },
    {
      title: 'DLudeaspning',
      body: '<p>Vill du veta vad spel är egentligen? Vill du öppna ditt tredje öga? Då ska du aspa DLude! Vi drar igång med aspning i Bibblan (NC) den 28/2 18:18 med info, spel och fika så det är bara att dyka upp!</p>',
      place: 'Bibblan',
      published: new Date(2022, 1, 28, 18, 18),
    },
  ];

  const scrollHandle = (e: Event) => {
    console.log(e);
  };

  return (
    <main class='text-zinc-900'>
      <div class=''>
        <section>
          <div class='p-8'>
            <h2 class='text-3xl'>
              <span class='text-orange-500'>Welcome</span> to computer science
              and enginering!
            </h2>
            <div class='mt-8 space-y-3'>
              <p>
                This is the Dtek portal, containing useful links and infromation
                about studen life at chalmers. Here you can read about upcomming
                events, find out whats for lunch and much more.
              </p>
              <p>
                Datateknologssektionen is a non-profit organisation whos mission
                is to improve student life for all studens in the computer
                science and enginering program. We organize the opening weeks
                for new studens, thow parties, bring student feedback to
                Chalmers and lots more.
              </p>
            </div>
          </div>
        </section>

        <Section title='Meet the committees'>
          <div class='bg-orange-200  py-8'>
            <Committees></Committees>
          </div>
        </Section>

        <Section
          title='Lunch'
          link={{ title: 'See more menus', href: '/lunch' }}
        >
          <div class='p-8 flex flex-col gap-4'>
            <Menu title='Express Johanneberg' name='johanneberg-express'></Menu>
            <Menu
              title='Kårresturangen Johanneberg'
              name='karresturangen'
            ></Menu>
          </div>
        </Section>

        <Section title='News' link={{ title: 'See all news', href: '/news' }}>
          <div class='p-8 flex flex-col gap-4'>
            <NewsList></NewsList>
          </div>
        </Section>

        <Section title='Proud partners with'>
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
        </Section>
      </div>
    </main>
  );
};

export default Main;
