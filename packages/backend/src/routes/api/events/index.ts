import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

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
          start_at: Type.String(),
          end_at: Type.String(),
          place: Type.Optional(Type.String()),
        })
      ),
    }),
  },
} as const;

const postSchema = {
  body: Type.Object({
    title: Type.String(),
    body: Type.String(),
    start_at: Type.String(),
    end_at: Type.String(),
  }),
} as const;

const plugin: FastifyPluginAsync = async (app) => {
  app.get<{ Querystring: Static<typeof getSchema.querystring> }>(
    '/',
    { schema: getSchema },
    async (req) => {
      return { news: await app.db.events.getByDate(req.query) };
    }
  );

  app.post<{ Body: Static<typeof postSchema.body> }>(
    '/',
    { schema: postSchema },
    async (req) => {
      const { body } = req;
      const data = {
        ...body,
        start_at: new Date(body.start_at),
        end_at: new Date(body.end_at),
      };
      await app.db.events.create([data]);
    }
  );
};

export default plugin;
