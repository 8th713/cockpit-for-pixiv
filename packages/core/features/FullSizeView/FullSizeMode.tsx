import React, { useContext, useMemo, useState } from 'react'
import { Hotkey } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'

type Props = { children?: React.ReactNode }
type Value = readonly [boolean, SetState]
type SetState = React.Dispatch<React.SetStateAction<boolean>>

const FullSizeValue = React.createContext<Value | null>(null)
const FullSizeUpdate = React.createContext<SetState | null>(null)
FullSizeValue.displayName = 'FullSizeValue'
FullSizeUpdate.displayName = 'FullSizeUpdate'

export const useFullSizeMode = () => {
  const value = useContext(FullSizeValue)
  if (value === null) throw new Error('Missing FullSizeMode')
  return value
}
export const useUpdateFullSizeMode = () => {
  const value = useContext(FullSizeUpdate)
  if (value === null) throw new Error('Missing FullSizeMode')
  return value
}
export const FullSizeMode = ({ children }: Props) => {
  const [isFullSize, setFullSize] = useState(false)
  const value = useMemo(() => [isFullSize, setFullSize] as const, [isFullSize])
  const toggle = () => setFullSize(v => !v)

  return (
    <FullSizeUpdate.Provider value={setFullSize}>
      <FullSizeValue.Provider value={value}>
        {children}
        <Hotkey {...KEY_ASSIGNMENT.fullSizeMode} action={toggle} />
      </FullSizeValue.Provider>
    </FullSizeUpdate.Provider>
  )
}
const FullSizeOn = ({ children }: Props) => (
  <>{useFullSizeMode()[0] ? children : null}</>
)
const FullSizeOff = ({ children }: Props) => (
  <>{useFullSizeMode()[0] ? null : children}</>
)
FullSizeMode.On = FullSizeOn
FullSizeMode.Off = FullSizeOff
