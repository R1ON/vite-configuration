/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly APP_TEST_VAR: string;
  readonly APP_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
