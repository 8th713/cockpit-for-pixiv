import React from 'react'
import { useFit } from '../hooks'
import { FitStatus } from '../interfaces'

type Fit = ReturnType<typeof useFit>

const Value = React.createContext<Fit['status']>(FitStatus.COVER)
const Action = React.createContext<Fit['cycle']>(() => {})

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  children?: React.ReactNode
}

const FitProvider = React.memo(function FitProvider(props: Props) {
  const { status, cycle } = useFit()

  return (
    <Action.Provider value={cycle}>
      <Value.Provider value={status}>{props.children}</Value.Provider>
    </Action.Provider>
  )
})

const Context = Object.assign(FitProvider, { useValue, useAction })

export { Context as FitProvider }
