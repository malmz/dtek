import 'dotenv/config';
import { FastifyPluginAsync } from 'fastify';
import AutoLoad from 'fastify-autoload';
import fastifyPostgres from 'fastify-postgres';
import db from './db/index.js';
import lunch from './lunch/index.js';

const server: FastifyPluginAsync = async (app, opts) => {
  app.register(AutoLoad, {
    dir: new URL('plugins', import.meta.url).pathname,
    options: { ...opts },
  });

  app.register(fastifyPostgres, {
    connectionString: process.env.DATABASE_URL,
  });
  app.register(db);
  app.register(lunch);

  app.register(AutoLoad, {
    dir: new URL('routes', import.meta.url).pathname,
    options: { ...opts },
  });
};

export default server;
