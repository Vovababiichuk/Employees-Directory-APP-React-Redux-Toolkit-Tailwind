// vite-env.d.ts
/// <reference types="vite/client" />

declare module '@/*' {
  const content: Record<string, unknown>;
  export default content;
}
