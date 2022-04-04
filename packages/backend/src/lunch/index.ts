import { isAfter } from 'date-fns';
import { FastifyLoggerInstance } from 'fastify';
import fp from 'fastify-plugin';
import { lunch } from '../db/index.js';
import * as karen from './karen.js';
import * as linsen from './linsen.js';

const createKarenFetcher = (name: string, id: string) => ({
  name,
  fetcher: () => karen.fetchCurrentWeek(name, id),
});

const createLinsenFetcher = () => ({
  name: 'linsen',
  fetcher: () => linsen.fetchCurrentWeek(),
});

interface Resturant {
  name: string;
  fetcher: () => Promise<lunch.Create[]>;
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

const thisWeekResturants = [...karenResturants, ...linsenResturants];

const nextWeekResturants = [...karenResturants];

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
                  const lastDate = await app.db.lunch.getLastDate(
                    resturant.name
                  );
                  if (isAfter(new Date(), lastDate)) {
                    app.db.lunch.create(await resturant.fetcher());
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

    await Promise.all([fetchThisWeek(), fetchNextWeek()]);
  },
  {
    name: 'dtek-lunch',
    dependencies: ['dtek-database', 'dtek-schedule'],
  }
);
