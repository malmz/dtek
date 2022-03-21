import type { RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import { fetchNews } from '../api';

export const NewsData: RouteDataFunc = () => {
  const [news] = createResource(fetchNews);
  return {
    news,
  };
};
