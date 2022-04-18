import { config } from 'dotenv';
import fastify from 'fastify';
import closeWithGrace from 'close-with-grace';

config({
  path: new URL('../.env', import.meta.url).pathname,
});
const development = process.env.NODE_ENV === 'development';

// Instantiate Fastify with some config
const app = fastify({
  logger: {
    level: 'debug',
    prettyPrint: development
      ? {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        }
      : false,
  },
});

app.log.warn('Starting server');

// Register your application as a normal plugin.
await app.register(import('./app.js'));

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: 500 },
  async ({ err }: { err?: Error }) => {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  }
);

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen(process.env.PORT ?? 3001, process.env.HOST ?? '127.0.0.1', (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
