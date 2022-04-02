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

export async function getByDate(
  db: PostgresDb,
  opts: Options = {}
): Promise<Model[]> {
  const query = SQL`
    SELECT id, title, body, created_at, updated_at
    FROM dtek_news
    ORDER BY updated_at DESC
  `;
  applyOptions(query, opts);
  const result = await db.query<Model>(query);
  return result.rows;
}

export async function getAll(db: PostgresDb): Promise<Model[]> {
  const result = await db.query<Model>(SQL`
    SELECT id, title, body, created_at, updated_at
    FROM dtek_news
  `);
  return result.rows;
}

export type Create = {
  title: string;
  body: string;
};

export async function create(db: PostgresDb, news: Create): Promise<void> {
  await db.query(SQL`
    INSERT INTO dtek_news (title, body)
    VALUES (${news.title}, ${news.body})
  `);
}
