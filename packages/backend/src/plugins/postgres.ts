import postgres from 'fastify-postgres';
import fp from 'fastify-plugin';

export default fp(async (app) => {
  app.register(postgres, {
    connectionString: process.env.DATABASE_URL,
  });
});
