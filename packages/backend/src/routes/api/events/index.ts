import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

const getSchema = {
  querystring: Type.Object({
    per_page: Type.Number({ default: 10 }),
    current_page: Type.Number({ default: 1 }),
  }),
  response: {
    200: Type.Object({
      events: Type.Array(
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
      const data = await app
        .knex('events')
        .select('*')
        .orderBy('updated_at', 'desc')
        .paginate({
          perPage: req.query.per_page,
          currentPage: req.query.current_page,
        });
      return {
        events: data.data,
      };
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
      await app.knex('events').insert(data);
    }
  );
};

export default plugin;
