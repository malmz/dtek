import 'dotenv/config';
import { FastifyPluginAsync } from 'fastify';
import AutoLoad from 'fastify-autoload';
import lunch from './lunch/index.js';

const server: FastifyPluginAsync = async (app, opts) => {
  app.register(AutoLoad, {
    dir: new URL('plugins', import.meta.url).pathname,
    options: { ...opts },
    forceESM: true,
  });

  app.register(lunch);

  app.register(AutoLoad, {
    dir: new URL('routes', import.meta.url).pathname,
    options: { ...opts },
  });
};

export default server;
