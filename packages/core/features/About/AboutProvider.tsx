import React, { useContext, useMemo, useState } from 'react'
import { Hotkey } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'

type Props = { children?: React.ReactNode }
type Value = readonly [boolean, SetState]
type SetState = React.Dispatch<React.SetStateAction<boolean>>

const AboutValue = React.createContext<Value | null>(null)
const AboutUpdate = React.createContext<SetState | null>(null)
AboutValue.displayName = 'AboutValue'
AboutUpdate.displayName = 'AboutUpdate'

export const useAbout = () => {
  const value = useContext(AboutValue)
  if (value === null) throw new Error('Missing AboutProvider')
  return value
}
export const useUpdateAbout = () => {
  const value = useContext(AboutUpdate)
  if (value === null) throw new Error('Missing AboutProvider')
  return value
}
export const AboutProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false)
  const value = useMemo(() => [open, setOpen] as const, [open])
  const toggle = () => setOpen(v => !v)

  return (
    <AboutUpdate.Provider value={setOpen}>
      <AboutValue.Provider value={value}>
        {children}
        <Hotkey {...KEY_ASSIGNMENT.help} action={toggle} />
      </AboutValue.Provider>
    </AboutUpdate.Provider>
  )
}
