import { PostgresDb } from 'fastify-postgres';
import SQL from 'sql-template-strings';

export type Model = {
  id: number;
  resturant: string;
  for_date: Date;
  lang: string;
  preformatted: boolean;
  title?: string;
  body: string;
};

export async function getByResturantAndDay(
  db: PostgresDb,
  params: {
    resturant: string;
    date: Date;
    lang?: string;
  }
): Promise<Model[]> {
  const query = SQL`
    SELECT preformatted, title, body
    FROM dtek_lunch
    WHERE resturant = ${params.resturant}
    AND lang = ${params.lang ?? 'Swedish'}
    AND for_date = ${params.date}
  `;
  const result = await db.query<Model>(query);
  return result.rows;
}

export async function getLastDate(
  db: PostgresDb,
  resturant: string
): Promise<Date> {
  const data = await db.query<{ for_date: Date }>(SQL`
    SELECT for_date
    FROM dtek_lunch
    WHERE resturant = ${resturant}
    ORDER BY for_date DESC
    LIMIT 1
  `);
  return data.rows[0].for_date;
}

export type Create = {
  resturant: string;
  for_date: Date;
  lang: string;
  preformatted?: boolean;
  title?: string;
  body: string;
};

export async function create(db: PostgresDb, dishes: Create[]): Promise<void> {
  const query = SQL`INSERT INTO dtek_lunch (resturant, for_date, lang, preformatted, title, body)`;
  for (const dish of dishes) {
    query.append(SQL`
      VALUES (${dish.resturant}, ${dish.for_date} ${dish.lang}, ${
      dish.preformatted ?? false
    }, ${dish.title}, ${dish.body})
    `);
  }
  await db.query(query);
}
