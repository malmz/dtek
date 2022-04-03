import { Pool } from 'pg';
import SQL, { SQLStatement } from 'sql-template-strings';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = pool.query.bind(pool);

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

export * as lunch from './lunch.js';
export * as news from './news.js';
export * as events from './events.js';
