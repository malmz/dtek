import fp from 'fastify-plugin';
import { Knex, knex } from 'knex';
import { attachPaginate } from 'knex-paginate';

declare module 'fastify' {
  export interface FastifyInstance {
    knex: Knex;
  }
}

declare module 'knex/types/tables' {
  interface News {
    id: number;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
  }

  interface Tables {
    news: Knex.CompositeTableType<
      News,
      Omit<News, 'id' | 'created_at' | 'updated_at'>
    >;
  }
}

export default fp(
  async (app) => {
    const handler = knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        tableName: 'dtek_migrations',
        directory: new URL('../../migrations', import.meta.url).pathname,
        loadExtensions: ['.mjs'],
      },
      log: app.log.child({ name: 'knex' }),
      searchPath: ['dtek', 'public'],
    });

    attachPaginate();

    app.decorate('knex', handler);
    app.addHook('onClose', async (instance) => {
      instance.knex.destroy();
    });
  },
  {
    name: 'dtek-knex',
  }
);
