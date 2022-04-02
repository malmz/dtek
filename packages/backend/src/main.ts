// Read the .env file.
import 'dotenv/config';

// Require the framework
import fastify from 'fastify';

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace';

const development = process.env.NODE_ENV === 'development';
console.log('DATABASE_URL', process.env.DATABASE_URL);

// Instantiate Fastify with some config
const app = fastify({
  logger: {
    prettyPrint: development
      ? {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        }
      : false,
  },
});

// Register your application as a normal plugin.
app.register(import('./app.js'));

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: 500 },
  async ({ err }: { err?: Error }) => {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  }
);

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

const host = process.env.HOST ?? '127.0.0.1';
const port = process.env.PORT ?? 3001;
console.log('Hello from containder');

// Start listening.
app.listen(port, host, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

/* import { fastify } from 'fastify';
import { routes } from './router.js';
import fastifypg from 'fastify-postgres';

const app = fastify({ logger: true });

app.register(fastifypg, {
  connectionString: process.env.DATABASE_URL,
});

app.register(routes);

try {
  console.log('Listening on port 3000');
  await app.listen(3000);
} catch (err) {
  app.log.error(err);
  process.exit(1);
} */

/* import {
  Day,
  setISOWeek,
  setWeek,
  startOfISOWeek,
  startOfWeek,
} from 'date-fns';
import fetch from 'node-fetch';
import pdfjs from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';

const data = await fetch(
  'http://www.cafelinsen.se/menyer/cafe-linsen-lunch-meny.pdf'
);
const buffer = await data.arrayBuffer();

const pdf = await pdfjs.getDocument(new Uint8Array(buffer)).promise;
const page = await pdf.getPage(1);
const textContent = await page.getTextContent();

const lines: string[] = [];
let current = '';

for (const text of textContent.items as TextItem[]) {
  current = current.concat(text.str);
  if (text.hasEOL) {
    lines.push(current.trim());
    current = '';
  }
}
if (current !== '') {
  lines.push(current.trim());
}

function parseWeekString(str: string): Day {
  switch (str) {
    case 'Måndag':
      return 1;
    case 'Tisdag':
      return 2;
    case 'Onsdag':
      return 3;
    case 'Torsdag':
      return 4;
    case 'Fredag':
      return 5;
    case 'Lördag':
      return 6;
    case 'Söndag':
      return 0;

    default:
      return 1;
  }
}

const weekReg = /^Cafè Linsen Vecka (\d+)$/;
const dayReg = /^(Måndag|Tisdag|Onsdag|Torsdag|Fredag|Lördag|Söndag):\s+(.+)/;

const week = parseInt(lines[0].match(weekReg)?.[1] ?? '', 10);
const weekDate = startOfISOWeek(setISOWeek(new Date(), week));

const days: { day: Day; dishes: string[] }[] = [];
let currentDishes: string[] = [];
let currentDay: Day = 1;

for (const line of lines.slice(1)) {
  const dayMatch = line.match(dayReg);
  if (dayMatch) {
    days.push({ day: currentDay, dishes: currentDishes });
    currentDishes = [];
    currentDay = parseWeekString(dayMatch[1]);
    currentDishes.push(dayMatch[2]);
  } else {
    currentDishes.push(line);
  }
}
days.push({ day: currentDay, dishes: currentDishes });

console.log('Week', week);
console.log('Week date', weekDate.toLocaleString('sv-SE'));
console.log('Days', days); */

//console.log(lines);
