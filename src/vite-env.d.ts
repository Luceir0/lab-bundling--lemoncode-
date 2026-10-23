/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_SHOP_NAME: string;
  readonly VITE_API_BASE: string;
  readonly VITE_SHOW_OFFERS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
