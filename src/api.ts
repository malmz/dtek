export interface News {
  title: string;
  body: string;
  published: Date;
  place?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Dish {
  type?: string;
  name: string;
}

const baseUrl = import.meta.env.VITE_API_URL;

export async function fetchNews(): Promise<News[]> {
  const url = new URL('/news', baseUrl);
  const response = await fetch(url.toString());
  const news = (await response.json()) as News[];

  return news.map((n) => ({
    ...n,
    published: new Date(n.published),
    startDate: n.startDate ? new Date(n.startDate) : undefined,
    endDate: n.endDate ? new Date(n.endDate) : undefined,
  }));
}

export async function fetchLunch(id: string): Promise<Dish[]> {
  const url = new URL(`/lunch`, baseUrl);
  url.searchParams.append('name', id);
  const response = await fetch(url.toString());
  const menu = (await response.json()) as Dish[];
  return menu;
}
