import cors from 'fastify-cors';
import fp from 'fastify-plugin';

export default fp(async (app, opts) => {
  app.register(cors, {
    origin: true,
  });
});
