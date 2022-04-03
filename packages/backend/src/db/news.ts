import SQL from 'sql-template-strings';
import { applyOptions, Options, query } from './index.js';

export type Model = {
  id: number;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
};

export async function getByDate(opts: Options = {}): Promise<Model[]> {
  const statement = SQL`
    SELECT id, title, body, created_at, updated_at
    FROM dtek_news
    ORDER BY updated_at DESC
  `;
  applyOptions(statement, opts);
  const result = await query<Model>(statement);
  return result.rows;
}

export async function getAll(): Promise<Model[]> {
  const result = await query<Model>(SQL`
    SELECT id, title, body, created_at, updated_at
    FROM dtek_news
  `);
  return result.rows;
}

export type Create = {
  title: string;
  body: string;
};

export async function create(news: Create): Promise<void> {
  await query(SQL`
    INSERT INTO dtek_news (title, body)
    VALUES (${news.title}, ${news.body})
  `);
}
