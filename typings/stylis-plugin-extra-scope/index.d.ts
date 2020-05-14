declare module 'stylis-plugin-extra-scope' {
  interface ScopePlugin {
    (scope: string): () => void
  }
  const scopePlugin: ScopePlugin
  export default scopePlugin
}
