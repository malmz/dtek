import { Configuration, V0alpha2Api } from '@ory/kratos-client';
import axios from 'axios';
import type { CommitteeProps } from '../components/Committee';

export interface News {
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}

export interface Events {
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
  start_at: Date;
  end_at: Date;
  place?: string;
}

export interface Dish {
  title?: string;
  body: string;
  preformatted: boolean;
  allergens?: { codes: string[] };
  emmissions?: number;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  /* transformResponse: (data) => {
    for (const key of Object.keys(data)) {
      if (key.endsWith('_at')) {
        data[key] = new Date(data[key]);
      }
    }
    return data;
  }, */
});
api.interceptors.response.use((response) => {
  for (const key of Object.keys(response.data)) {
    if (key.endsWith('_at')) {
      response.data[key] = new Date(response.data[key]);
    }
  }
  return response;
});

export const ory = new V0alpha2Api(
  new Configuration({
    basePath: import.meta.env.VITE_AUTH_URL ?? import.meta.env.VITE_API_URL,
    baseOptions: {
      withCredentials: true,
    },
  })
);

export async function fetchNews(): Promise<News[]> {
  const response = await api.get<{ news: News[] }>('/news');
  const { news } = response.data;
  return news;
}

export async function addNews(news: News): Promise<void> {
  await api.post('/news', news);
}

export async function fetchLunch(params: {
  id: string;
  lang: string;
  date?: Date;
}): Promise<Dish[]> {
  const response = await api.get<{ dishes: Dish[] }>('/lunch', {
    params: {
      resturant: params.id,
      lang: params.lang,
      date: params.date?.toISOString(),
    },
  });

  const { dishes } = response.data;

  return dishes;
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
