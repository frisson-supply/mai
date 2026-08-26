/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly SANITY_API_READ_TOKEN: string;
  readonly SITE_GATE_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
