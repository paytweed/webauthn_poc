/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly PORT: string
    readonly NGROK_TOKEN: string
    readonly NGROK_DOMAIN: string
  }

interface ImportMeta {
  readonly env: ImportMetaEnv
}
