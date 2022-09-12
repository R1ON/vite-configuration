/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly APP_TEST_VAR: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}