import { Component, createEffect, createResource, For, Suspense } from 'solid-js';
import { fetchMenu } from '../menu';
import { NewsEntry } from '../NewsEntry';
import { Section } from '../Section';
import { Menu } from '../Menu';

const Main: Component = () => {

  /* const [express] = createResource(async () => {
    let id = '3d519481-1667-4cad-d2a3-08d558129279';
    const resp = await fetch(`http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/${id}/dishoccurrences`);
    const data: ExpressResponse[] = await resp.json();
    return parseExpressResponse(data, 'Swedish');
  }); */

  const [express] = createResource(async () => {
    let id = '3d519481-1667-4cad-d2a3-08d558129279';
    return fetchMenu(id, 'Swedish');
  });

  const [karen] = createResource(async () => {
    let id = '21f31565-5c2b-4b47-d2a1-08d558129279';
    return fetchMenu(id, 'Swedish');
  });




  createEffect(() => {
    console.log(express());
  });

  const commities = [
    { name: 'D-Styret', url: 'https://wiki.dtek.se/wiki/Styret', logo: 'https://wiki.dtek.se/images/7/79/Styretlogga.png' },
    { name: 'DLude', description: 'Gaming of all kinds', url: 'https://wiki.dtek.se/wiki/DLude', logo: 'https://wiki.dtek.se/images/thumb/2/24/DLude21.png/600px-DLude21.png' },
    { name: 'DNS', description: 'Helps you study', url: 'https://wiki.dtek.se/wiki/DNS', logo: 'https://wiki.dtek.se/images/thumb/d/dd/DNS21.png/600px-DNS21.png' },
    { name: 'D6', description: 'Here to party', url: 'https://wiki.dtek.se/wiki/D6', logo: 'https://wiki.dtek.se/images/thumb/b/bd/D621-grad.png/600px-D621-grad.png' },
    { name: 'DNollK', description: 'Gives you a warm welcome', url: 'https://wiki.dtek.se/wiki/DNollK', logo: 'https://dnollk.se/cdn/storage/images/gjnmFQLEZ3BCtZGHL/original/gjnmFQLEZ3BCtZGHL.png' },
  ];


  const posts = [
    {
      title: 'Hackkväll',
      body: '<p>Har du en lurig labb, ett kul projekt att leka med, eller är du bara fikasugen? Ta dig då till NC:s övervåning efter afterschool på onsdag för hackkväll!</p>',
      place: 'NC',
      date: new Date(2022, 1, 30, 18, 18),
    },
    {
      title: 'DLudeaspning',
      body: '<p>Vill du veta vad spel är egentligen? Vill du öppna ditt tredje öga? Då ska du aspa DLude! Vi drar igång med aspning i Bibblan (NC) den 28/2 18:18 med info, spel och fika så det är bara att dyka upp!</p>',
      place: 'Bibblan',
      date: new Date(2022, 1, 28, 18, 18),
    }
  ];

  return (
    <main class=''>

      <div class=''>
        <section class='py-4 px-8'>
          <div class='bg-zinc-50 shadow-md rounded-2xl p-8 flex flex-col justify-center text-center text-zinc-700'>
            <h1 class='text-4xl mt-6 font-semibold leading-10 text-center'>Welcome</h1>
            <p class='mt-6 leading-7'>This is the DTEK portal, containing a bunch of useful links to places you might want to go.</p>
            <p class='mt-6 leading-7'>Datateknologsektionen är en icke vinstdrivande organisation som är till för alla studenter på civilingenjörsprogrammet Datateknik på Chalmers och dess relaterade masterprogram.
              Vi ordnar mottagning för nyantagna, arrangerar fester, bedriver studiebevakning och mycket mer.</p>
          </div>
        </section>

        <Section title='Meet the commities'>
          <div class='snap-mandatory snap-x flex gap-6 overflow-x-auto py-8'>
            <div class='shrink-0 w-96'></div>
            <For each={commities}>
              {(data) =>
                <a href={data.url} class='p-8 shadow-md rounded-lg bg-gradient-to-tr from-orange-400 to-red-400 text-zinc-50 snap-center shrink-0 w-96 h-48 flex items-center gap-5'>
                  <img src={data.logo} alt='Logo' class='h-32' />
                  <div>
                    <h3 class='font-semibold text-2xl'>{data.name}</h3>
                    <p>{data.description}</p>
                  </div>
                </a>
              }
            </For>
            <div class='shrink-0 w-96'></div>
          </div>
        </Section>

        <Section title='Lunch'>
          <div class='p-8 flex flex-col gap-4'>
            <Menu title='Express Johanneberg' id='3d519481-1667-4cad-d2a3-08d558129279'></Menu>
            <Menu title='Kårresturangen Johanneberg' id='21f31565-5c2b-4b47-d2a1-08d558129279'></Menu>
          </div>
        </Section>

        <Section title='News' link={{ title: 'See all news', href: '/news' }}>
          <div class='p-8 flex flex-col gap-4'>
            <For each={posts}>
              {(post) =>
                <NewsEntry {...post}></NewsEntry>
              }
            </For>
          </div>
        </Section>

        <Section title='Proud partners with'>
          <div class='p-8 flex flex-col gap-4r'>
            <img class='h-16 mx-auto' src="https://dtek.se/static/images/sponsors/cpac.png" alt="CPAC" />
            <p>Are you a company looking to get in contact with students or a student looking for job offerings? Check out DAG for more info!</p>
            <a class='mx-auto inline-block text-zinc-50 bg-orange-500 rounded-lg shadow-md p-4' href='https://dtek.se/dag'>Read more</a>
          </div>
        </Section>
      </div>
    </main>
  );
};

export default Main;
