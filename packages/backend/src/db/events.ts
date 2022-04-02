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

export async function getByDate(
  db: PostgresDb,
  opts: Options = {}
): Promise<Model[]> {
  const query = SQL`
    SELECT id, title, body, created_at, updated_at, start_at, end_at, place,
    FROM dtek_events
    ORDER BY start_at DESC
  `;
  applyOptions(query, opts);
  const result = await db.query<Model>(query);
  return result.rows;
}

export async function getAll(db: PostgresDb): Promise<Model[]> {
  const result = await db.query<Model>(SQL`
    SELECT id, title, body, created_at, updated_at, start_at, end_at, place,
    FROM dtek_events
  `);
  return result.rows;
}

export type Create = {
  title: string;
  body: string;
  start_at: Date;
  end_at: Date;
  place?: string;
};

export async function create(db: PostgresDb, news: Create): Promise<void> {
  await db.query(SQL`
    INSERT INTO dtek_events (title, body, start_at, end_at, place)
    VALUES (${news.title}, ${news.body}, ${news.start_at}, ${news.end_at}, ${news.place})
  `);
}
