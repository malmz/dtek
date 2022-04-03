// Read the .env file.
import 'dotenv/config';

// Require the framework
import fastify from 'fastify';
import { logger } from './logger.js';

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace';

// Instantiate Fastify with some config
const app = fastify({
  logger,
});

// Register your application as a normal plugin.
app.register(import('./app.js'));

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: 500 },
  async ({ err }: { err?: Error }) => {
    if (err) {
      logger.error(err);
    }
    await app.close();
  }
);

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

const host = process.env.HOST ?? '127.0.0.1';
const port = process.env.PORT ?? 3001;

// Start listening.
app.listen(port, host, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});
