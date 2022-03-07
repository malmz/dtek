# Dtek.se

This is a experimental rewrite of [dtek.se](https://dtek.se). The motivativation for this rewrite is to make it more maintainable, add more features and more usable on mobile.

The site is build with [solidjs](https://solidjs.com) and [tailwindcss](https://tailwindcss.com). The backend is available at [dtek-backend](https://github.com/Malmz/dtek-backend).

## Usage

### Installation
```bash
$ pnpm install # or npm install or yarn install
```

### Running

```bash
$ pnpm run dev # to run on in devmode
```

This will start the app in development mode on port 3000.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

Make sure to run the backend server as well.

```bash
$ pnpm run host # to expose to the network
```
This will start the app in development mode on port 3000.
You can now access the app from another device on the network.

### Building

```bash
$ pnpm run build # to build the app for production
```

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


