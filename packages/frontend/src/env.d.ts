/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTH_URL: string;
  // more env variables...
}

// eslint-disable-next-line no-shadow
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
