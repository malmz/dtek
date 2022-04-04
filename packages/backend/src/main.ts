import 'dotenv/config';
import fastify from 'fastify';
import closeWithGrace from 'close-with-grace';
import SQL from 'sql-template-strings';
const development = process.env.NODE_ENV === 'development';

const dishes = [
  {
    resturant: 'hello',
    for_date: new Date(),
    lang: 'Swedish',
    preformatted: false,
    title: 'Hai',
    body: 'test',
  },
];

const statement = SQL`INSERT INTO dtek_lunch (resturant, for_date, lang, preformatted, title, body)`;
for (const dish of dishes) {
  statement.append(
    SQL`VALUES (${dish.resturant}, ${dish.for_date}, ${dish.lang}, ${
      dish.preformatted ?? false
    }, ${dish.title}, ${dish.body})`
  );
}
console.log(statement.text);

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

// Register your application as a normal plugin.
app.register(import('./app.js'));

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

const host = process.env.HOST ?? '127.0.0.1';
const port = process.env.PORT ?? 3001;

// Start listening.
app.listen(port, host, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
