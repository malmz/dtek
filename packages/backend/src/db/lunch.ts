import SQL from 'sql-template-strings';
import { PostgresDb } from 'fastify-postgres';

export type Model = {
  id: number;
  resturant: string;
  for_date: Date;
  lang: string;
  preformatted: boolean;
  title?: string;
  body: string;
};

export type Create = {
  resturant: string;
  for_date: Date;
  lang: string;
  preformatted?: boolean;
  title?: string;
  body: string;
};

export class Lunch {
  constructor(private db: PostgresDb) {}

  async getByResturantAndDay(params: {
    resturant: string;
    date: Date;
    lang?: string;
  }): Promise<Model[]> {
    const statement = SQL`
    SELECT preformatted, title, body
    FROM dtek_lunch
    WHERE resturant = ${params.resturant}
    AND lang = ${params.lang ?? 'Swedish'}
    AND for_date = ${params.date}
  `;
    const result = await this.db.query<Model>(statement);
    return result.rows;
  }

  async getLastDate(resturant: string): Promise<Date> {
    const data = await this.db.query<{ for_date: Date }>(SQL`
        SELECT for_date
        FROM dtek_lunch
        WHERE resturant = ${resturant}
        ORDER BY for_date DESC
        LIMIT 1
      `);
    if (data.rowCount === 0) {
      return new Date(0);
    }
    return data.rows[0].for_date;
  }

  async create(dishes: Create[]): Promise<void> {
    const statement = SQL`INSERT INTO dtek_lunch (resturant, for_date, lang, preformatted, title, body)`;
    for (const dish of dishes) {
      statement.append(SQL`
        VALUES (${dish.resturant}, ${dish.for_date}, ${dish.lang}, ${
        dish.preformatted ?? false
      }, ${dish.title}, ${dish.body})
      `);
    }
    console.log(statement.text);

    await this.db.query(statement);
  }
}
