export interface News {
  title: string;
  body: string;
  published: Date;
  place?: string;
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

const baseUrl = "http://localhost:3001";

export async function fetchNews(): Promise<News[]> {
  const url = new URL("/news", baseUrl);
  const response = await fetch(url.toString());
  const news: News[] = await response.json();

  return news.map((n) => ({
    ...n,
    published: new Date(n.published),
    startDate: n.startDate ? new Date(n.startDate) : undefined,
    endDate: n.endDate ? new Date(n.endDate) : undefined,
  }));
}

export async function fetchLunch(name: string): Promise<Menu> {
  const url = new URL(`/lunch`, baseUrl);
  url.searchParams.append("name", name);
  const response = await fetch(url.toString());
  const menu = await response.json();
  return menu;
}
