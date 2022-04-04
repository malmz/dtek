import { PostgresDb } from 'fastify-postgres';
import SQL from 'sql-template-strings';
import { applyOptions, Options } from './index.js';

export type Model = {
  id: number;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
  start_at: Date;
  end_at: Date;
  place?: string;
};

export type Create = {
  title: string;
  body: string;
  start_at: Date;
  end_at: Date;
  place?: string;
};

export class Events {
  constructor(private db: PostgresDb) {}

  async getByDate(opts: Options = {}): Promise<Model[]> {
    const statement = SQL`
      SELECT id, title, body, created_at, updated_at, start_at, end_at, place,
      FROM dtek_events
      ORDER BY start_at DESC
    `;
    applyOptions(statement, opts);
    const result = await this.db.query<Model>(statement);
    return result.rows;
  }

  async getAll(): Promise<Model[]> {
    const result = await this.db.query<Model>(SQL`
      SELECT id, title, body, created_at, updated_at, start_at, end_at, place,
      FROM dtek_events
    `);
    return result.rows;
  }

  async create(news: Create): Promise<void> {
    await this.db.query(SQL`
      INSERT INTO dtek_events (title, body, start_at, end_at, place)
      VALUES (${news.title}, ${news.body}, ${news.start_at}, ${news.end_at}, ${news.place})
    `);
  }
}
