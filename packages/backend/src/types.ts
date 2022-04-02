import { Static, Type } from '@sinclair/typebox';

export const newsSchema = Type.Object({
  title: Type.String(),
  body: Type.String(),
  published: Type.String(),
  place: Type.Optional(Type.String()),
  startDate: Type.Optional(Type.String()),
  endDate: Type.Optional(Type.String()),
});

export type News = Static<typeof newsSchema>;

export const lunchSchema = Type.Partial(
  Type.Object({
    dishes: Type.Array(
      Type.Object({
        title: Type.Optional(Type.String()),
        body: Type.String(),
        allergens: Type.Optional(Type.Array(Type.String())),
        emmissions: Type.Optional(Type.Number()),
      })
    ),
    preformatted: Type.String(),
  })
);

export type Lunch = Static<typeof lunchSchema>;
