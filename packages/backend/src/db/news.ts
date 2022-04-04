import { PostgresDb } from 'fastify-postgres';
import SQL from 'sql-template-strings';
import { applyOptions, Options } from './index.js';

export type Model = {
  id: number;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
};

export type Create = {
  title: string;
  body: string;
};

export class News {
  constructor(private db: PostgresDb) {}

  async getByDate(opts: Options = {}): Promise<Model[]> {
    const statement = SQL`
    SELECT id, title, body, created_at, updated_at
    FROM dtek_news
    ORDER BY updated_at DESC
  `;
    applyOptions(statement, opts);
    const result = await this.db.query<Model>(statement);
    return result.rows;
  }

  async getAll(): Promise<Model[]> {
    const result = await this.db.query<Model>(SQL`
    SELECT id, title, body, created_at, updated_at
    FROM dtek_news
  `);
    return result.rows;
  }

  async create(news: Create): Promise<void> {
    await this.db.query(SQL`
    INSERT INTO dtek_news (title, body)
    VALUES (${news.title}, ${news.body})
  `);
  }
}
