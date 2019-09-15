import React, { useContext, useState } from 'react'
import { Hotkey } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { AboutDialog } from './AboutDialog'

type Props = { children?: React.ReactNode }
type SetState = React.Dispatch<React.SetStateAction<boolean>>

const AboutUpdate = React.createContext<SetState | null>(null)
AboutUpdate.displayName = 'AboutUpdate'

export const useUpdateAbout = () => {
  const value = useContext(AboutUpdate)
  if (value === null) throw new Error('Missing AboutProvider')
  return value
}
export const About = ({ children }: Props) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(v => !v)
  const close = () => setOpen(false)

  return (
    <AboutUpdate.Provider value={setOpen}>
      {children}
      <Hotkey {...KEY_ASSIGNMENT.help} action={toggle} />
      <AboutDialog open={open} onClose={close} />
    </AboutUpdate.Provider>
  )
}
