/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly SANITY_API_WRITE_TOKEN?: string;
  readonly ULULE_PROJECT_ID?: string;
  readonly ULULE_SECONDARY_HREF?: string;
  readonly ULULE_SECONDARY_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
