export interface News {
  title: string;
  body: string;
  published: Date;
  startDate?: Date;
  endDate?: Date;
}

export interface Menu {
  lastUpdated: Date;
  dishes: Dish[];
}

export interface Dish {
  type: string;
  name: string;
}

export async function fetchNews(): Promise<News[]> {
  const response = await fetch("/api/news");
  const news = await response.json();
  return news;
}

export async function fetchLunch(): Promise<Menu> {
  const response = await fetch("/api/lunch");
  const menu = await response.json();
  return menu;
}
