import fp from 'fastify-plugin';
import schedule from 'node-schedule';

declare module 'node-schedule' {
  export function gracefulShutdown(): void;
}

declare module 'fastify' {
  export interface FastifyInstance {
    schedule: typeof schedule;
  }
}

export default fp(
  async (app) => {
    app.decorate('schedule', schedule);

    app.addHook('onClose', async (app) => {
      app.schedule.gracefulShutdown();
    });
  },
  {
    name: 'dtek-schedule',
  }
);
