import { Knex } from 'knex';
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
  constructor(private knex: Knex) {}

  async getByDate(opts: Options = {}): Promise<Model[]> {
    const query = this.knex('dtek_events')
      .select([
        'id',
        'title',
        'body',
        'created_at',
        'updated_at',
        'start_at',
        'end_at',
        'place',
      ])
      .orderBy('start_at', 'desc');
    applyOptions(query, opts);

    return await query;
  }

  async getAll(): Promise<Model[]> {
    return await this.knex('dtek_events').select([
      'id',
      'title',
      'body',
      'created_at',
      'updated_at',
      'start_at',
      'end_at',
      'place',
    ]);
  }

  async create(news: Create[]): Promise<void> {
    return await this.knex('dtek_events').insert(news);
  }
}
