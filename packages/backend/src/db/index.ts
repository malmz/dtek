import fp from 'fastify-plugin';
import fastifyPostgres from 'fastify-postgres';
import SQL, { SQLStatement } from 'sql-template-strings';

import { Events } from './events.js';
import { Lunch } from './lunch.js';
import { News } from './news.js';

export * as lunch from './lunch.js';
export * as events from './events.js';
export * as news from './news.js';

export type DtekDb = {
  lunch: Lunch;
  events: Events;
  news: News;
};

declare module 'fastify' {
  export interface FastifyInstance {
    db: DtekDb;
  }
}

export default fp<{ connectionString: string }>(
  async (app) => {
    const db: DtekDb = {
      lunch: new Lunch(app.pg),
      events: new Events(app.pg),
      news: new News(app.pg),
    };

    app.decorate('db', db);
  },
  {
    fastify: '3.X',
    name: 'dtek-database',
    dependencies: ['fastify-postgres'],
  }
);

export type Options = {
  count?: number;
  offset?: number;
};

export function applyOptions(query: SQLStatement, opts: Options) {
  if (opts.count) {
    query.append(SQL`LIMIT ${opts.count}`);
  }
  if (opts.offset) {
    query.append(SQL`OFFSET ${opts.offset}`);
  }
}
