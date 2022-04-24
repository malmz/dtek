/**
 * NOTE: To future readers. Do not try to parse this pdf further,
 * the structure of this document can not be relied on as it is handwritten
 * and will have inconsistencies.
 */

import fetch from 'node-fetch';
import pdfjs from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import {
  areIntervalsOverlapping,
  isWithinInterval,
  nextFriday,
  setISODay,
  setISOWeek,
  startOfISOWeek,
} from 'date-fns';
import { LunchInsert, MenuItemInsert } from 'knex/types/tables';
import { KarenFetcher } from './karen.js';
import axios from 'axios';

const pdfClient = axios.create({
  baseURL: 'http://www.cafelinsen.se/menyer/cafe-linsen-lunch-meny.pdf',
  responseType: 'arraybuffer',
  timeout: 20000,
});

async function fetchPdf(): Promise<ArrayBuffer> {
  try {
    const response = await pdfClient.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch menu', { cause: error as Error });
  }
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

async function parsePdf(
  buffer: ArrayBuffer
): Promise<
  { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
> {
  const pdf = await pdfjs.getDocument(new Uint8Array(buffer)).promise;

  const lines: string[] = [];
  let current = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

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
  }

  const dishes: {
    lunch: LunchInsert;
    menu_item: Omit<MenuItemInsert, 'lunch_id'>[];
  }[] = [];

  const week = parseInt(lines[0].match(weekReg)?.[1] ?? '', 10);
  const weekDate = startOfISOWeek(setISOWeek(new Date(), week));

  let currentDayString = '';
  let currentDate: Date = weekDate;

  for (const line of lines.splice(1)) {
    const dayMatch = line.match(dayReg);
    if (dayMatch) {
      if (currentDayString !== '') {
        dishes.push({
          lunch: {
            resturant: 'linsen',
            for_date: currentDate,
            preformatted: true,
            lang: 'Both',
          },
          menu_item: [
            {
              body: currentDayString,
            },
          ],
        });
      }
      currentDate = setISODay(weekDate, parseWeekString(dayMatch[1]));
      currentDayString = dayMatch[2];
    } else {
      currentDayString = currentDayString.concat('\n', line);
    }
  }
  dishes.push({
    lunch: {
      resturant: 'linsen',
      for_date: currentDate,
      preformatted: true,
      lang: 'Both',
    },
    menu_item: [
      {
        body: currentDayString,
      },
    ],
  });

  return dishes;
}

export class LinsenFetcher extends KarenFetcher {
  constructor() {
    super('linsen', 'b672efaf-032a-4bb8-d2a5-08d558129279');
  }

  async fetch(
    startDate: Date,
    endDate: Date
  ): Promise<
    { lunch: LunchInsert; menu_item: Omit<MenuItemInsert, 'lunch_id'>[] }[]
  > {
    try {
      const data = await super.fetch(startDate, endDate);
      data.forEach((lunch) => {
        lunch.menu_item.forEach((item) => {
          item.title = undefined;
        });
      });
      return data;
    } catch (error) {
      // If the requested span is this week, fall back to the pdf
      if (
        areIntervalsOverlapping(
          { start: startDate, end: endDate },
          {
            start: startOfISOWeek(new Date()),
            end: nextFriday(startOfISOWeek(new Date())),
          }
        )
      ) {
        const data = await fetchPdf();
        const menu = await parsePdf(data);
        return menu.filter((m) =>
          isWithinInterval(m.lunch.for_date, { start: startDate, end: endDate })
        );
      } else {
        throw error;
      }
    }
  }
}
