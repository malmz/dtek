import { Knex } from 'knex';

declare module 'knex/types/tables' {}

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
  constructor(private knex: Knex) {}

  async getByResturantAndDay(params: {
    resturant: string;
    date: Date;
    lang?: string;
  }): Promise<Model[]> {
    return await this.knex('dtek_lunch')
      .select(['preformatted', 'title', 'body'])
      .where('resturant', params.resturant)
      .andWhere('lang', params.lang ?? 'Swedish')
      .andWhere('for_date', params.date);
  }

  async getLastDate(resturant: string): Promise<Date> {
    const data = await this.knex('dtek_lunch')
      .select('for_date')
      .where('resturant', resturant)
      .orderBy('for_date', 'desc')
      .limit(1);

    if (data.length === 0) {
      return new Date(0);
    }
    return data[0].for_date;
  }

  async create(dishes: Create[]): Promise<void> {
    await this.knex('dtek_lunch').insert(dishes);
  }
}
