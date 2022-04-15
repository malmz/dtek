import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import { getLunchDate } from '../../../date.js';

const getSchema = {
  querystring: Type.Object({
    resturant: Type.String(),
    lang: Type.KeyOf(
      Type.Object({
        Swedish: Type.String(),
        English: Type.String(),
        Both: Type.String(),
      }),
      { default: 'Both' }
    ),
    date: Type.Optional(Type.String()),
  }),
  /* response: {
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
  }, */
} as const;

const plugin: FastifyPluginAsync = async (app) => {
  app.get<{ Querystring: Static<typeof getSchema.querystring> }>(
    '/',
    { schema: getSchema },
    async (req) => {
      const { resturant, lang, date } = req.query;
      const langList =
        lang === 'Both' ? ['Both', 'Swedish', 'English'] : [lang, 'Both'];
      try {
        return {
          dishes: await app
            .knex('lunch')
            .whereIn('lang', langList)
            .andWhere({
              resturant,
              for_date: date ? new Date() : getLunchDate(),
            })
            .join('menu_item', 'lunch.id', 'menu_item.lunch_id')
            .select('title', 'body', 'preformatted')
            .orderBy('title'),
        };
      } catch (error) {
        return { dishes: [] };
      }
    }
  );
};

export default plugin;
