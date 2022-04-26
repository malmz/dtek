/* eslint-disable @typescript-eslint/no-namespace */
import { createForm } from '@felte/solid';
import { useRouteData } from 'solid-app-router';
import type { Component } from 'solid-js';
import { ErrorBoundary, For, Suspense } from 'solid-js';
import type { Events, News as NewsType } from '../lib/api';
import { addNews } from '../lib/api';
import { EventEntry } from '../components/EventEntry.jsx';
import { NewsEntry } from '../components/NewsEntry';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { directive } from '../utils';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      form: boolean;
    }
  }
}

const News: Component = () => {
  const { news } = useRouteData<{ news: () => NewsType[] }>();

  const events = () => [
    {
      title: 'Extrainsatt Sektionsmöte LP4',
      body: 'Dags för ett väldigt spännande sektionsmöte! Detta mötet är det såkallade stora invalsmötet. VIKTIGT att notera är att detta möte kommer sträcka sig över två dagar, nämligen 18/4 och 20/4. Båda börjar 17:17 och vi kommer vara i HA1. Mat kommer att arrangeras under båda dagarna. Kallelsen hittar ni som på https://wiki.dtek.se/images/c/cf/StoraInvalsmötet2022Kallelse.pdf Om ni har frågor kontakta oss på talhenspresidiet@dtek.se',
      created_at: new Date('2022-04-16'),
      updated_at: new Date('2022-04-16'),
      start_at: new Date('2022-04-18T17:17:00'),
      end_at: new Date('2022-04-18T23:59:00'),
      place: 'HA1',
    },
    {
      title: 'Extrainsatt Sektionsmöte LP4',
      body: 'Dags för ett väldigt spännande sektionsmöte! Detta mötet är det såkallade stora invalsmötet. VIKTIGT att notera är att detta möte kommer sträcka sig över två dagar, nämligen 18/4 och 20/4. Båda börjar 17:17 och vi kommer vara i HA1. Mat kommer att arrangeras under båda dagarna. Kallelsen hittar ni som på https://wiki.dtek.se/images/c/cf/StoraInvalsmötet2022Kallelse.pdf Om ni har frågor kontakta oss på talhenspresidiet@dtek.se',
      created_at: new Date('2022-04-16'),
      updated_at: new Date('2022-04-16'),
      start_at: new Date('2022-04-20T17:17:00'),
      end_at: new Date('2022-04-20T23:59:00'),
      place: 'HA1',
    },
    {
      title: 'Paintball med Sigma och Electro!',
      body: `Hej kära datateknologer! Vi iDrott'21 arrangerar tillsammans med Sigma och Elektro paintball den 9/5! Gå till evenemanget nedan för all information och för att hålla er uppdaterade!

      iDrott'21`,
      created_at: new Date('2022-04-24'),
      updated_at: new Date('2022-04-24'),
      start_at: new Date('2022-05-09T13:00:00'),
      end_at: new Date('2022-05-09T17:00:00'),
      place:
        'https://www.google.com/maps?ll=57.579673,11.957663&z=12&t=m&hl=sv-SE&gl=US&mapclient=embed&cid=83726',
    },
  ];

  const { form } = createForm({
    onSubmit: async (v) => {
      await addNews(v as NewsType);
    },
  });

  directive(form);

  return (
    <main>
      <div class='flex flex-row gap-4 p-8'>
        <div class='flex-grow max-w-lg mr-4'>
          <SectionHeader title='Upcomming events'></SectionHeader>
          <div class='flex flex-col gap-6 mt-4'>
            <ErrorBoundary fallback={<div>Error loading events...</div>}>
              <Suspense fallback={<div>Loading...</div>}>
                <For each={events()} fallback={<div>No events for now</div>}>
                  {(entry) => <EventEntry event={entry}></EventEntry>}
                </For>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        <div class='lg:divider lg:divider-horizontal hidden'></div>

        <div class='flex-grow'>
          <SectionHeader title='Latest news'></SectionHeader>
          <ErrorBoundary fallback={<div>Error loading news...</div>}>
            <Suspense fallback={<div>Loading...</div>}>
              <For each={news()} fallback={<div>No news for now</div>}>
                {(entry) => <NewsEntry {...entry}></NewsEntry>}
              </For>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
};

export default News;

/* <div class='card m-8 mr-auto max-w-lg bg-base-200 shadow-lg'>
        <div class='card-body '>
          <form use:form class='form-control gap-2'>
            <input
              type='text'
              name='title'
              placeholder='Title'
              class='input input-bordered input-primary'
            />
            <textarea
              name='body'
              class='textarea textarea-primary'
              placeholder='Post...'
            ></textarea>
            <label class='label'>
              <span class='label-text'>Start</span>
            </label>
            <input
              type='datetime-local'
              name='startDate'
              placeholder='Start'
              class='input input-primary'
            />
            <label class='label'>
              <span class='label-text'>End</span>
            </label>
            <input
              type='datetime-local'
              name='endDate'
              placeholder='End'
              class='input input-primary'
            />
            <input
              type='text'
              name='place'
              placeholder='Place'
              class='input input-bordered input-primary'
            />
            <button type='submit' class='btn btn-primary'>
              Post
            </button>
          </form>
        </div>
      </div> */
