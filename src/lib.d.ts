declare module '*.svg' {
  const content: any;
  export default content;
}

declare global {
  interface ProcessEnv {
    REACT_APP_API: string;
  }
}

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
