import { isAfter, isWeekend } from 'date-fns';
import { FastifyLoggerInstance } from 'fastify';
import fp from 'fastify-plugin';
import { LunchInsert, MenuItemInsert } from 'knex/types/tables';
import * as karen from './karen.js';
import * as linsen from './linsen.js';

const createKarenFetcher = (name: string, id: string) => ({
  name,
  fetcher: () => karen.fetchCurrentWeek(name, id),
  nextfetcher: () => karen.fetchNextWeek(name, id),
});

const createLinsenFetcher = () => ({
  name: 'linsen',
  fetcher: () => linsen.fetchCurrentWeek(),
  nextfetcher: () => linsen.fetchNextWeek(),
});

interface Resturant {
  name: string;
  fetcher: () => Promise<
    { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
  >;
  nextfetcher?: () => Promise<
    { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
  >;
}

const karenResturants: Resturant[] = [
  createKarenFetcher(
    'johanneberg-express',
    '3d519481-1667-4cad-d2a3-08d558129279'
  ),
  createKarenFetcher('karresturangen', '21f31565-5c2b-4b47-d2a1-08d558129279'),
  createKarenFetcher('hyllan', 'a7f0f75b-c1cb-4fc3-d2a6-08d558129279'),
  createKarenFetcher('smak', '3ac68e11-bcee-425e-d2a8-08d558129279'),
];

const linsenResturants: Resturant[] = [createLinsenFetcher()];

const thisWeekResturants: Resturant[] = [
  ...karenResturants,
  ...linsenResturants,
];

const nextWeekResturants: Resturant[] = [
  ...karenResturants,
  ...linsenResturants,
].map((rest) => ({
  ...rest,
  fetcher:
    rest.nextfetcher ??
    (async () => {
      throw new Error('No next fetcher');
    }),
}));

export default fp(
  async (app) => {
    const fetchMenus =
      (resturants: Resturant[], logger: FastifyLoggerInstance) => async () => {
        logger.debug('Fetching weekly menu');
        await Promise.all(
          resturants
            .map((resturant) => {
              return async () => {
                const log = logger.child({ name: resturant.name });
                try {
                  log.debug('Fetching...');
                  const lastDate = await app
                    .knex('lunch')
                    .where('resturant', resturant.name)
                    .max('for_date');

                  if (isAfter(new Date(), lastDate[0].max ?? new Date(0))) {
                    const menus = await resturant.fetcher();

                    for (const menu of menus) {
                      await app.knex.transaction(async (trx) => {
                        const lunch_id = await trx('lunch').insert(
                          menu.lunch,
                          'id'
                        );

                        await trx('menu_item').insert(
                          menu.menu_item.map((item) => ({
                            ...item,
                            lunch_id: lunch_id[0].id,
                          }))
                        );
                      });
                    }
                    log.debug({ updated: true }, 'Done fetching');
                  } else {
                    log.debug({ updated: false }, 'Done fetching');
                  }
                } catch (error) {
                  if (error instanceof Error) {
                    log.error(error, 'Error fetching');
                  } else {
                    log.error('Error fetching');
                  }
                }
              };
            })
            .map((task) => task())
        );
        logger.debug('Done fetching weekly menu');
      };

    const fetchThisWeek = fetchMenus(
      thisWeekResturants,
      app.log.child({ next: false })
    );
    const fetchNextWeek = fetchMenus(
      nextWeekResturants,
      app.log.child({ next: true })
    );

    app.schedule.scheduleJob(
      'monday-lunch-sync',
      { dayOfWeek: 1, hour: 8, minute: 0 },
      fetchThisWeek
    );

    app.schedule.scheduleJob(
      'friday-lunch-sync',
      { dayOfWeek: 5, hour: 14, minute: 0 },
      fetchNextWeek
    );

    if (isWeekend(new Date())) {
      fetchNextWeek();
    } else {
      fetchThisWeek();
    }
  },
  {
    name: 'dtek-lunch',
    dependencies: ['dtek-knex', 'dtek-schedule'],
  }
);
