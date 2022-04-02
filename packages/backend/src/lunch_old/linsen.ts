import { Dish, Menu, Resturant, WeekMenu, WeekMenuFetcher } from './lunch.js';
import { extract_pdf, WeekMenu as LpeWeekMenu } from 'linsen-pdf-extractor';
import fetch from 'node-fetch';

function convertMenu(menu: LpeWeekMenu): WeekMenu {
  const toDish = (dish: string): Dish => ({ name: dish });
  const days: Menu[] = menu.days.map((day) => {
    const swedish = day.dishes.swedish.map(toDish);
    const english = day.dishes.english.map(toDish);
    return {
      date: day.date,
      dishes: { swedish, english },
    } as Menu;
  });
  const date = menu.days[0].date;
  return {
    date,
    days,
  };
}

function createWeekFetcher(): WeekMenuFetcher {
  return async () => {
    const ab = new AbortController();
    const t = setTimeout(() => ab.abort(), 20000);
    const response = await fetch(
      'http://www.cafelinsen.se/menyer/cafe-linsen-lunch-meny.pdf',
      {
        signal: ab.signal,
      }
    );
    clearTimeout(t);
    const data = await response.arrayBuffer();
    const doc = extract_pdf(new Uint8Array(data));
    return convertMenu(doc);
  };
}

export function createResturant(): Resturant {
  return {
    weekFetcher: createWeekFetcher(),
  };
}
