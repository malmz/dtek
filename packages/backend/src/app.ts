import 'dotenv/config';
import { FastifyPluginAsync } from 'fastify';
import AutoLoad from 'fastify-autoload';

const server: FastifyPluginAsync = async (app, opts) => {
  app.register(AutoLoad, {
    dir: new URL('plugins', import.meta.url).pathname,
    options: { ...opts },
  });

  app.register(AutoLoad, {
    dir: new URL('routes', import.meta.url).pathname,
    options: { ...opts },
  });
};

export default server;
