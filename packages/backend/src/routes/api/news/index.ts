import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import { news } from '../../../db/index.js';

const getSchema = {
  querystring: Type.Object({
    count: Type.Optional(Type.Number()),
    offset: Type.Optional(Type.Number()),
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
      return { news: await news.getByDate(app.pg, req.query) };
    }
  );

  app.post<{ Body: Static<typeof postSchema.body> }>(
    '/',
    { schema: postSchema },
    async (req) => {
      const { body } = req;
      await news.create(app.pg, body);
    }
  );
};

export default plugin;
