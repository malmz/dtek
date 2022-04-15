import fp from 'fastify-plugin';
import knex, { Knex } from 'knex';
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

  type NewsInsert = Omit<News, 'id' | 'created_at' | 'updated_at'>;

  interface Events {
    id: number;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
    start_at: Date;
    end_at: Date;
    place?: string;
  }

  type EventsInsert = Omit<Events, 'id' | 'created_at' | 'updated_at'>;

  interface Lunch {
    id: number;
    resturant: string;
    for_date: Date;
    preformatted: boolean;
    lang: string;
  }

  type LunchInsert = Omit<Lunch, 'id' | 'preformatted' | 'lang'> &
    Partial<Pick<Lunch, 'preformatted' | 'lang'>>;

  interface MenuItem {
    id: number;
    lunch_id: number;
    title?: string;
    body: string;
    allergens?: { codes: string[] };
    emission?: number;
    price?: string;
  }

  type MenuItemInsert = Omit<MenuItem, 'id'>;

  interface Tables {
    news: Knex.CompositeTableType<News, NewsInsert>;

    events: Knex.CompositeTableType<Events, EventsInsert>;

    lunch: Knex.CompositeTableType<Lunch, LunchInsert>;

    menu_item: Knex.CompositeTableType<MenuItem, MenuItemInsert>;
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

    await handler.migrate.latest();

    app.decorate('knex', handler);
    app.addHook('onClose', async (instance) => {
      instance.knex.destroy();
    });
  },
  {
    name: 'dtek-knex',
  }
);
