import runner, { RunnerOption } from 'node-pg-migrate';
import { RunMigration } from 'node-pg-migrate/dist/migration';
import { logger } from './logger.js';

const migrate: (options: RunnerOption) => Promise<RunMigration[]> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (runner as any).default;

await migrate({
  databaseUrl: process.env.DATABASE_URL ?? '',
  migrationsTable: 'dtek_migrations',
  dir: new URL('../../migrations', import.meta.url).pathname,
  direction: 'up',
  logger,
});
