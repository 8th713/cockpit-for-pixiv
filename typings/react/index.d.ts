import {} from 'react'
declare module 'react' {
  /**
   * `useImperativeHandle` customizes the instance value that is exposed to parent components when using
   * `ref`. As always, imperative code using refs should be avoided in most cases.
   *
   * `useImperativeHandle` should be used with `React.forwardRef`.
   *
   * @version experimental
   * @see https://reactjs.org/docs/hooks-reference.html#useimperativehandle
   */
  export const useImperativeHandle: typeof useImperativeMethods

  export function useDebugValue<T>(
    value: T,
    formatter?: (value: T) => any
  ): void
}
