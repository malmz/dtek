/**
 * NOTE: To future readers. Do not try to parse this pdf further,
 * the structure of this document can not be relied on as it is handwritten
 * and will have inconsistencies.
 */

import fetch from 'node-fetch';
import { lunch } from '../db/index.js';
import pdfjs from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import { setISODay, setISOWeek, startOfISOWeek } from 'date-fns';

const pdfUrl = 'http://www.cafelinsen.se/menyer/cafe-linsen-lunch-meny.pdf';

async function fetchPdf(): Promise<ArrayBuffer> {
  const ab = new AbortController();
  try {
    const t = setTimeout(() => ab.abort(), 20000);
    const response = await fetch(pdfUrl, {
      signal: ab.signal,
    });
    clearTimeout(t);
    return await response.arrayBuffer();
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

async function parsePdf(buffer: ArrayBuffer): Promise<lunch.Create[]> {
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

  const dishes: lunch.Create[] = [];

  const week = parseInt(lines[0].match(weekReg)?.[1] ?? '', 10);
  const weekDate = startOfISOWeek(setISOWeek(new Date(), week));

  let currentDayString = '';
  let currentDate: Date = weekDate;

  for (const line of lines.splice(1)) {
    const dayMatch = line.match(dayReg);
    if (dayMatch) {
      dishes.push({
        resturant: 'linsen',
        body: currentDayString,
        for_date: currentDate,
        preformatted: true,
        lang: 'Swedish',
      });
      currentDate = setISODay(weekDate, parseWeekString(dayMatch[1]));
      currentDayString = dayMatch[2];
    } else {
      currentDayString = currentDayString.concat('\n', line);
    }
  }
  dishes.push({
    resturant: 'linsen',
    body: currentDayString,
    for_date: currentDate,
    preformatted: true,
    lang: 'Swedish',
  });

  return dishes;
}

export async function fetchCurrentWeek(): Promise<lunch.Create[]> {
  const data = await fetchPdf();
  return await parsePdf(data);
}
