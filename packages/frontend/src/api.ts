import { Configuration, V0alpha2Api } from '@ory/kratos-client';
import type { CommitteeProps } from './components/Committee';

export interface News {
  title: string;
  body: string;
  published: Date;
  place?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Lunch {
  dishes?: Dish[];
  preformatted?: string;
}

export interface Dish {
  type?: string;
  name: string;
  allergens?: string[];
  emmissions?: number;
}

interface Response {
  news: News[];
}

const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchNews(): Promise<News[]> {
  const url = new URL('/api/news', apiUrl);
  const response = await fetch(url.toString());
  const { news } = (await response.json()) as Response;

  return news.map((n) => ({
    ...n,
    published: new Date(n.published),
    startDate: n.startDate ? new Date(n.startDate) : undefined,
    endDate: n.endDate ? new Date(n.endDate) : undefined,
  }));
}

export async function addNews(news: News): Promise<void> {
  const url = new URL('/api/news', apiUrl);
  await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(news),
  });
}

export async function fetchLunch(id: string): Promise<Lunch> {
  const url = new URL(`/api/lunch`, apiUrl);
  url.searchParams.append('name', id);
  const response = await fetch(url.toString());
  const menu = (await response.json()) as Lunch;
  return menu;
}

const committeesData: CommitteeProps[] = [
  {
    name: 'D-Styret',
    homepage: 'https://wiki.dtek.se/wiki/Styret',
    imageUrl: 'https://wiki.dtek.se/images/7/79/Styretlogga.png',
    description: 'Tells people what to do',
    mask: true,
  },
  {
    name: 'DLude',
    description:
      'Provides the devision with boardgame of all kinds. Come and play!',
    homepage: 'https://wiki.dtek.se/wiki/DLude',
    imageUrl:
      'https://wiki.dtek.se/images/thumb/2/24/DLude21.png/600px-DLude21.png',
  },
  {
    name: 'DNS',
    description: 'Helps you study',
    homepage: 'https://wiki.dtek.se/wiki/DNS',
    imageUrl:
      'https://wiki.dtek.se/images/thumb/d/dd/DNS21.png/600px-DNS21.png',
  },
  {
    name: 'D6',
    description: 'Here to party',
    homepage: 'https://wiki.dtek.se/wiki/D6',
    imageUrl:
      'https://wiki.dtek.se/images/thumb/b/bd/D621-grad.png/600px-D621-grad.png',
  },
  {
    name: 'DNollK',
    description: 'Gives you a warm welcome',
    homepage: 'https://wiki.dtek.se/wiki/DNollK',
    imageUrl:
      'https://dnollk.se/cdn/storage/images/gjnmFQLEZ3BCtZGHL/original/gjnmFQLEZ3BCtZGHL.png',
  },
];

export async function fetchCommittees(): Promise<CommitteeProps[]> {
  return Promise.resolve(committeesData);
}

export const ory = new V0alpha2Api(
  new Configuration({
    basePath: new URL('/auth', apiUrl).href,
    baseOptions: {
      withCredentials: true,
    },
  })
);
