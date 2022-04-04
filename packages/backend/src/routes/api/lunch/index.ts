import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import SQL from 'sql-template-strings';
import { getLunchDate } from '../../../date.js';

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
        const data = await app.db.lunch.getByResturantAndDay({
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

  app.get('/test', async () => {
    const dishes = [
      {
        resturant: 'hello',
        for_date: new Date(),
        lang: 'Swedish',
        preformatted: false,
        title: 'Hai',
        body: 'test',
      },
      {
        resturant: 'hello2',
        for_date: new Date(),
        lang: 'Swedish',
        preformatted: false,
        title: 'Hai',
        body: 'test',
      },
    ];

    const statement = SQL`INSERT INTO dtek_lunch (resturant, for_date, lang, preformatted, title, body) VALUES`;
    for (const dish of dishes.slice(0, -1)) {
      statement.append(
        SQL` (${dish.resturant}, ${dish.for_date}, ${dish.lang}, ${
          dish.preformatted ?? false
        }, ${dish.title}, ${dish.body}),`
      );
    }
    const dish = dishes[dishes.length - 1];
    statement.append(
      SQL` (${dish.resturant}, ${dish.for_date}, ${dish.lang}, ${
        dish.preformatted ?? false
      }, ${dish.title}, ${dish.body})`
    );
    app.log.debug(statement.text);
    app.pg.query(statement);

    return {};
  });
};

export default plugin;
