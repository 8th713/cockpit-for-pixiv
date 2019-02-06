import React from 'react'
import { useAbout } from '../hooks'

type About = ReturnType<typeof useAbout>

const Value = React.createContext<About['opened']>(false)
const Action = React.createContext<About['toggle']>(() => {})

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  children?: React.ReactNode
}

function AboutProvider(props: Props) {
  const { opened, toggle } = useAbout()

  return (
    <Action.Provider value={toggle}>
      <Value.Provider value={opened}>{props.children}</Value.Provider>
    </Action.Provider>
  )
}

const Context = Object.assign(AboutProvider, { useValue, useAction })

export { Context as AboutProvider }
