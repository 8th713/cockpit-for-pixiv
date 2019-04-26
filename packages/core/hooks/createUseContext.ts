import React from 'react'

type Props = {
  children?: React.ReactNode
}

export function createUseContext<P, V>(useValue: (props: P) => V) {
  const Context = React.createContext<V>(null as any)

  function Provider(props: P & Props) {
    const value = useValue(props)

    return React.createElement(Context.Provider, { value }, props.children)
  }
  Provider.displayName = `${useValue.name}Provider`

  function useContext() {
    const value = React.useContext(Context)

    if (value === null) {
      throw new Error(
        `${useValue.name} must be used within a ${Provider.displayName}`
      )
    }

    return value
  }

  useContext.Context = Context
  useContext.Provider = Provider
  return useContext
}
