import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

const getSchema = {
  querystring: Type.Object({
    per_page: Type.Number({ default: 10 }),
    current_page: Type.Number({ default: 1 }),
  }),
  response: {
    200: Type.Object({
      news: Type.Array(
        Type.Object({
          id: Type.Number(),
          title: Type.String(),
          body: Type.String(),
          created_at: Type.String(),
          updated_at: Type.String(),
        })
      ),
    }),
  },
} as const;

const postSchema = {
  body: Type.Object({
    title: Type.String(),
    body: Type.String(),
  }),
} as const;

const plugin: FastifyPluginAsync = async (app) => {
  app.get<{ Querystring: Static<typeof getSchema.querystring> }>(
    '/',
    { schema: getSchema },
    async (req) => {
      return {
        news: await app
          .knex('news')
          .select()
          .orderBy('updated_at', 'desc')
          .paginate({
            perPage: req.query.per_page,
            currentPage: req.query.current_page,
          }),
      };
    }
  );

  app.post<{ Body: Static<typeof postSchema.body> }>(
    '/',
    { schema: postSchema },
    async (req) => {
      const { body } = req;
      await app.knex('news').insert([body]);
    }
  );
};

export default plugin;
