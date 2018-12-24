import React from 'react'
import { useUser } from '../hooks'

type User = ReturnType<typeof useUser>

const Value = React.createContext<User['result']>(null as any)
const Action = React.createContext<User['actions']>(null as any)

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  userId: string
  children?: React.ReactNode
}

const UserProvider = React.memo(function UserProvider(props: Props) {
  const { result, actions } = useUser(props.userId)

  return (
    <Action.Provider value={actions}>
      <Value.Provider value={result}>{props.children}</Value.Provider>
    </Action.Provider>
  )
})

const Context = Object.assign(UserProvider, { useValue, useAction })

export { Context as UserProvider }
