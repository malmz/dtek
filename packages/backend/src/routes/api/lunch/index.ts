import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import { getLunchDate } from '../../../date.js';
import { lunch } from '../../../db/index.js';

const getSchema = {
  querystring: Type.Object({
    name: Type.String(),
    lang: Type.KeyOf(
      Type.Object({ Swedish: Type.String(), English: Type.String() }),
      { default: 'Swedish' }
    ),
    date: Type.Optional(Type.String()),
  }),
  response: {
    200: Type.Object({
      dishes: Type.Array(
        Type.Object({
          title: Type.Optional(Type.String()),
          body: Type.String(),
          allergens: Type.Optional(Type.Array(Type.String())),
          emmissions: Type.Optional(Type.Number()),
        })
      ),
      preformatted: Type.String(),
    }),
  },
} as const;

const plugin: FastifyPluginAsync = async (app) => {
  app.get<{ Querystring: Static<typeof getSchema.querystring> }>(
    '/',
    { schema: getSchema },
    async (req) => {
      const { name, lang, date } = req.query;
      try {
        const data = await lunch.getByResturantAndDay(app.pg, {
          resturant: name,
          lang,
          date: date ? new Date(date) : getLunchDate(),
        });
        return data;
      } catch (error) {
        return {};
      }
    }
  );
};

export default plugin;
