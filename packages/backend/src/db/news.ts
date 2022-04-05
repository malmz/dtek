import { Knex } from 'knex';
import { News } from 'knex/types/tables';
import { applyOptions, Options } from './index.js';

export class NewsController {
  constructor(private knex: Knex) {}

  async getByDate(opts: Options = {}): Promise<News[]> {
    const query = this.knex('news')
      .select(['id', 'title', 'body', 'created_at', 'updated_at'])
      .orderBy('updated_at', 'desc');
    applyOptions(query, opts);
    return await query;
  }

  async getAll(): Promise<News[]> {
    return await this.knex('dtek_news').select([
      'id',
      'title',
      'body',
      'created_at',
      'updated_at',
    ]);
  }

  async create(news: News[]): Promise<void> {
    await this.knex('dtek_news').insert(news);
  }
}
