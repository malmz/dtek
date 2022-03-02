import { Link } from 'solid-app-router';
import type { Component } from 'solid-js';
import { For } from 'solid-js';
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

  const committees = [
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
            <div class='snap-mandatory snap-x grid grid-flow-col overflow-x-auto'>
              <div class='w-12'></div>
              <For each={committees}>
                {(data, i) => (
                  <div class=''>
                    <a
                      id={`committee-${i()}`}
                      href={data.url}
                      class='p-8 w-screen h-48 flex items-center snap-center gap-5 scroll-m-4 snap-always'
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
              <div class='w-12'></div>
            </div>
            <div class='flex justify-center gap-2'>
              <For each={committees}>
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
            {/* <For each={posts}>
              {(post) =>
                <NewsEntry {...post}></NewsEntry>
              }
            </For> */}
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
