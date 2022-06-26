import {
  endOfISOWeek,
  isAfter,
  isBefore,
  isWithinInterval,
  nextFriday,
  nextMonday,
  setHours,
  startOfDay,
  startOfHour,
  startOfISOWeek,
} from 'date-fns';
import { FastifyLoggerInstance } from 'fastify';
import fp from 'fastify-plugin';
import { Knex } from 'knex';
import { LunchInsert, MenuItemInsert } from 'knex/types/tables';
import { RecurrenceSpecObjLit } from 'node-schedule';
import { KarenFetcher } from './karen.js';
import { LinsenFetcher } from './linsen.js';

export interface Fetcher {
  name: string;
  fetch(
    startDate: Date,
    endDate: Date
  ): Promise<
    { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
  >;
}

const fetchers: Fetcher[] = [
  new KarenFetcher(
    'johanneberg-express',
    '3d519481-1667-4cad-d2a3-08d558129279'
  ),
  new KarenFetcher('karresturangen', '21f31565-5c2b-4b47-d2a1-08d558129279'),
  new KarenFetcher('hyllan', 'a7f0f75b-c1cb-4fc3-d2a6-08d558129279'),
  new KarenFetcher('smak', '3ac68e11-bcee-425e-d2a8-08d558129279'),
  new LinsenFetcher(),
];

async function insertMenu(
  knex: Knex,
  menus: { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
) {
  for (const menu of menus) {
    await knex.transaction(async (trx) => {
      const lunch_id = (await trx('lunch').insert(menu.lunch, 'id'))[0].id;

      await trx('menu_item').insert(
        menu.menu_item.map((item) => ({
          ...item,
          lunch_id: lunch_id,
        }))
      );
    });
  }
}

async function lastDate(knex: Knex, name: string): Promise<Date> {
  const lastDate = await knex('lunch').where('resturant', name).max('for_date');
  return lastDate[0].max ?? new Date(0);
}

function getFetchRange(lastDate: Date): { start: Date; end: Date } | undefined {
  const now = new Date();
  const startWeek = startOfISOWeek(now);
  const friday = nextFriday(startWeek);
  const fridayAfternoon = startOfHour(setHours(friday, 18));
  const endWeek = endOfISOWeek(now);
  const startNextWeek = nextMonday(startWeek);
  const fridayNext = nextFriday(startNextWeek);

  const begin = isAfter(now, lastDate) ? now : lastDate;
  const nextBegin = isAfter(lastDate, startNextWeek) ? lastDate : startNextWeek;

  if (isWithinInterval(begin, { start: startWeek, end: fridayAfternoon })) {
    if (isBefore(begin, friday)) {
      return { start: startOfDay(begin), end: friday };
    } else {
      return undefined;
    }
  } else if (isWithinInterval(now, { start: fridayAfternoon, end: endWeek })) {
    if (isBefore(nextBegin, fridayNext)) {
      return { start: nextBegin, end: fridayNext };
    } else {
      return undefined;
    }
  }
}

async function cacheResturant(
  knex: Knex,
  fetcher: Fetcher,
  logger: FastifyLoggerInstance
) {
  const log = logger.child({ name: fetcher.name });
  try {
    const date = await lastDate(knex, fetcher.name);
    const range = getFetchRange(date);
    if (range) {
      log.info(
        `Fetching ${range.start.toISOString()} - ${range.end.toISOString()}`
      );
      const menu = await fetcher.fetch(range.start, range.end);
      await insertMenu(knex, menu);
      log.debug('Done fetching');
    } else {
      log.debug('Done fetching (no change)');
    }
  } catch (error) {
    log.error(error, 'Error fetching');
  }
}

async function cacheResturants(
  knex: Knex,
  logger: FastifyLoggerInstance,
  fetchers: Fetcher[]
) {
  await Promise.all(
    fetchers.map((fetcher) => cacheResturant(knex, fetcher, logger))
  );
}

export default fp(
  async (app) => {
    app.schedule.scheduleJob(
      'lunch-sync',
      <RecurrenceSpecObjLit>{ dayOfWeek: [1, 5, 7], hour: [8, 18], minute: 1 },
      () => cacheResturants(app.knex, app.log, fetchers)
    );

    cacheResturants(app.knex, app.log, fetchers);
  },
  {
    name: 'dtek-lunch',
    dependencies: ['dtek-knex', 'dtek-schedule'],
  }
);
