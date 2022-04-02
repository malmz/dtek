import SQL, { SQLStatement } from 'sql-template-strings';

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
