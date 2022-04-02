import fp from 'fastify-plugin';
import sensible from 'fastify-sensible';

export default fp(async (app, opts) => {
  app.register(sensible, {
    errorHandler: false,
  });
});
