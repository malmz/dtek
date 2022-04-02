import { isAfter } from 'date-fns';
import fp from 'fastify-plugin';
import schedule from 'node-schedule';
import { lunch } from '../db/index.js';
import * as karen from './karen.js';
import * as linsen from './linsen.js';

const onMonday = new schedule.RecurrenceRule();
onMonday.dayOfWeek = 1;
onMonday.hour = 8;
onMonday.minute = 0;

const onFriday = new schedule.RecurrenceRule();
onFriday.dayOfWeek = 5;
onFriday.hour = 14;
onFriday.minute = 0;

const karenResturants = [
  ['johanneberg-express', '3d519481-1667-4cad-d2a3-08d558129279'],
  ['karresturangen', '21f31565-5c2b-4b47-d2a1-08d558129279'],
  ['hyllan', 'a7f0f75b-c1cb-4fc3-d2a6-08d558129279'],
  ['smak', '3ac68e11-bcee-425e-d2a8-08d558129279'],
];

export default fp((app) => {
  schedule.scheduleJob('monday-lunch-sync', onMonday, async () => {
    app.log.debug('Fetching this weeks meny');
    const tasks: (() => Promise<void>)[] = [];

    tasks.push(async () => {
      try {
        app.log.debug(`Fetching 'linsen'...`);
        const lastDate = await lunch.getLastDate(app.pg, 'linsen');
        if (isAfter(new Date(), lastDate)) {
          lunch.create(app.pg, await linsen.fetchCurrentWeek());
          app.log.debug(`Done fetching 'linsen'`);
        } else {
          app.log.debug(`Done fetching 'linsen', already up-to-date`);
        }
      } catch (error) {
        app.log.error(
          `Error fetching 'linsen', error: ${(error as Error).message}`
        );
      }
    });

    for (const [name, id] of karenResturants) {
      tasks.push(async () => {
        try {
          app.log.debug(`Fetching '${name}'...`);
          const lastDate = await lunch.getLastDate(app.pg, name);
          if (isAfter(new Date(), lastDate)) {
            lunch.create(app.pg, await karen.fetchCurrentWeek(name, id));
            app.log.debug(`Done fetching '${name}'`);
          } else {
            app.log.debug(`Done fetching '${name}', already up-to-date`);
          }
        } catch (error) {
          app.log.error(
            `Error fetching '${name}', error: ${(error as Error).message}`
          );
        }
      });
    }

    await Promise.all(tasks.map((task) => task()));
    app.log.debug('Done fetching this weeks meny');
  });

  schedule.scheduleJob('friday-lunch-sync', onFriday, async () => {
    app.log.debug('Fetching next weeks meny');
    const tasks: (() => Promise<void>)[] = [];

    for (const [name, id] of karenResturants) {
      tasks.push(async () => {
        try {
          app.log.debug(`Fetching '${name}'...`);
          const lastDate = await lunch.getLastDate(app.pg, name);
          if (isAfter(new Date(), lastDate)) {
            lunch.create(app.pg, await karen.fetchNextWeek(name, id));
            app.log.debug(`Done fetching '${name}'`);
          } else {
            app.log.debug(`Done fetching '${name}', already up-to-date`);
          }
        } catch (error) {
          app.log.error(
            `Error fetching '${name}', error: ${(error as Error).message}`
          );
        }
      });
    }

    await Promise.all(tasks.map((task) => task()));
    app.log.debug('Done fetching next weeks meny');
  });
});
