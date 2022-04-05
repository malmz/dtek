import fp from 'fastify-plugin';
import { Knex } from 'knex';

import { Events } from './events.js';
import { Lunch } from './lunch.js';
import { NewsController } from './news.js';

export * as lunch from './lunch.js';
export * as events from './events.js';
export * as news from './news.js';

export type DtekDb = {
  lunch: Lunch;
  events: Events;
  news: NewsController;
};

declare module 'fastify' {
  export interface FastifyInstance {
    db: DtekDb;
  }
}

export default fp<{ connectionString: string }>(
  async (app) => {
    const db: DtekDb = {
      lunch: new Lunch(app.knex),
      events: new Events(app.knex),
      news: new NewsController(app.knex),
    };

    app.decorate('db', db);
  },
  {
    fastify: '3.X',
    name: 'dtek-database',
    dependencies: ['dtek-knex'],
  }
);

export type Options = {
  count?: number;
  offset?: number;
};

export function applyOptions(query: Knex.QueryBuilder, opts: Options) {
  if (opts.count) {
    query.limit(opts.count);
  }
  if (opts.offset) {
    query.offset(opts.offset);
  }
}
