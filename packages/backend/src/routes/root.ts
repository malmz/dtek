import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return 'This is the api server! :)\nIf you are seeing this, something is wrong.';
  });
};

export default root;
