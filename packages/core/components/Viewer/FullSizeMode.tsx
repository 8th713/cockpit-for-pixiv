import React, { useContext, useDebugValue, useMemo, useState } from 'react'
import { Hotkey } from '../shared/Hotkey'
import { KEY_ASSIGNMENT } from '../../constants'

type Props = {
  children?: React.ReactNode
}

type Update = React.Dispatch<React.SetStateAction<boolean>>

const NO_PROVIDER = 'Missing FullSizeMode'
const ValueContext = React.createContext<
  readonly [boolean, Update] | typeof NO_PROVIDER
>(NO_PROVIDER)
const UpdateContext = React.createContext<Update | typeof NO_PROVIDER>(
  NO_PROVIDER
)

export function useFullSizeMode() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  useDebugValue(value[0])
  return value
}

export function useUpdateFullSizeMode() {
  const value = useContext(UpdateContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function FullSizeMode({ children }: Props) {
  const [isFullSize, setFullSize] = useState(false)
  const value = useMemo(() => [isFullSize, setFullSize] as const, [isFullSize])
  const toggle = () => setFullSize(v => !v)

  return (
    <ValueContext.Provider value={value}>
      <UpdateContext.Provider value={setFullSize}>
        {children}
        <Hotkey {...KEY_ASSIGNMENT.fullSizeMode} action={toggle} />
      </UpdateContext.Provider>
    </ValueContext.Provider>
  )
}

FullSizeMode.On = function FullSizeOn({ children }: Props) {
  const [on] = useFullSizeMode()
  return <>{on ? children : null}</>
}

FullSizeMode.Off = function FullSizeOff({ children }: Props) {
  const [on] = useFullSizeMode()
  return <>{on ? null : children}</>
}
