# Dtek website

This is a experimental rewrite of [dtek.se](https://dtek.se). The motivativation for this rewrite is to make it more maintainable, add more features and make it more accessible, especially on on mobile.

This is a monorepo for the Dtek website. The frontend is located under `packages/frontend` and the backend is located under `packages/backend`.
It uses `ory kratos` for authentication and user management.

## Frontend

The frontend is build with [solidjs](https://solidjs.com) and [tailwindcss](https://tailwindcss.com). Translations are handles with [@solid-primitives/i18n](https://github.com/solidjs-community/solid-primitives/tree/main/packages/i18n#readme) and are avaliable in `packages/frontend/locales`. To write translations i recommend the [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) extension.

## Backend

The backend is writen in [node.js](https://nodejs.org) and uses [fastify](https://www.fastify.io) as the http server.

## Usage

First we setup the workspace

```bash
# Clone the repository
$ git clone git@github.com:Malmz/dtek.git

# Install dependencies
$ pnpm install
```

Then we start docker dependencies (these are required even for development)

```bash
# Start the authenticaton server and database
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Then we start our code

```bash
# Start the backend server
$ pnpm run backend

# Start the frontend server
$ pnpm run frontend
```

Now we can open a browser and go to `http://localhost:3000`

## Development

I highly recommend using [vscode](https://code.visualstudio.com/) to develop the website as the workspace is setup up to use a lot of feautures and extensions.

To start development first we setup the workspace

```bash
# Clone the repository
$ git clone git@github.com:Malmz/dtek.git

# Install dependencies
$ pnpm install
```

Open the workspace in vscode and install the recommended extentions when prompted. Open the command pallet with `Shift + Crtl + P`. Run a task with `Tasks: Run Task` and run the task `compose up dev`. This will start the authentication server and a database.

To start debugging, go to the debugging menu on the left sidebar and select `debug all`. This will start debugging the backend, start the frontend dev server and start a chrome debugging instance.

Now we can set breakpoints in both the backend and the frontend. The frontend will reload automatically on save.
