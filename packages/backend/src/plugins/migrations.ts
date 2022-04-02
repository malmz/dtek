import fp from 'fastify-plugin';
import runner, { RunnerOption } from 'node-pg-migrate';
import { RunMigration } from 'node-pg-migrate/dist/migration';

const migrate: (options: RunnerOption) => Promise<RunMigration[]> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (runner as any).default;

export default fp(async (app, opts) => {
  app.register(async (app, opts) => {
    await migrate({
      databaseUrl: process.env.DATABASE_URL ?? '',
      migrationsTable: 'dtek_migrations',
      dir: new URL('../../migrations', import.meta.url).pathname,
      direction: 'up',
      logger: app.log,
    });
  });
});
