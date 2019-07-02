import React, { useContext, useDebugValue, useMemo, useState } from 'react'
import { KEY_ASSIGNMENT } from '../../constants'
import { Hotkey } from '../shared/Hotkey'

type Props = {
  children?: React.ReactNode
}

type SetState = React.Dispatch<React.SetStateAction<boolean>>

const NO_PROVIDER = 'Missing AboutHost'
const ValueContext = React.createContext<
  readonly [boolean, SetState] | typeof NO_PROVIDER
>(NO_PROVIDER)
const UpdateContext = React.createContext<SetState | typeof NO_PROVIDER>(
  NO_PROVIDER
)

export function useAbout() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  useDebugValue(value[0])
  return value
}

export function useUpdateAbout() {
  const value = useContext(UpdateContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function AboutHost({ children }: Props) {
  const [open, setOpen] = useState(false)
  const value = useMemo(() => [open, setOpen] as const, [open])
  const toggle = () => setOpen(v => !v)

  return (
    <ValueContext.Provider value={value}>
      <UpdateContext.Provider value={setOpen}>
        {children}
        <Hotkey {...KEY_ASSIGNMENT.help} action={toggle} />
      </UpdateContext.Provider>
    </ValueContext.Provider>
  )
}
