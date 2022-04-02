import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (app, opts) => {
  app.get('/', async (req, rep) => {
    return 'This is the api server! :)\nIf you are seeing this, something is wrong.';
  });
};

export default root;
