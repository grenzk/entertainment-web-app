/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDIA_API_ENDPOINT: string
  readonly VITE_BOOKMARKS_API_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
