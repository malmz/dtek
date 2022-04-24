import { FastifyPluginAsync } from 'fastify';

const plugin: FastifyPluginAsync = async (app) => {
  app.get('/', async (req) => {
    return 'user';
  });
};

export default plugin;
