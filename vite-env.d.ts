/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUOTE_ENDPOINT?: string;
  readonly VITE_GADS_CONVERSION_ID?: string;
  readonly VITE_GADS_CONVERSION_LABEL?: string;
  readonly VITE_GADS_CONVERSION_VALUE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
