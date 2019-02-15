import React from 'react'

type Props = {
  children?: React.ReactNode
}

export function createProvider<S>(hook: () => S, displayName?: string) {
  const Context = React.createContext<S>(null as any)

  function Provider(props: Props) {
    const value = hook()

    return <Context.Provider value={value}>{props.children}</Context.Provider>
  }
  Provider.use = function use() {
    return React.useContext(Context)
  }

  if (displayName) {
    Provider.displayName = displayName
  }

  return Provider
}
