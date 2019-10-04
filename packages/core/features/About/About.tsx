import React, { useContext, useState } from 'react'
import { Hotkey, Modal } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { AboutDialog } from './AboutDialog'

type Props = { children?: React.ReactNode }

type SetState = React.Dispatch<React.SetStateAction<boolean>>

const AboutUpdate = React.createContext<SetState | null>(null)

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
      <Modal open={open} onClose={close} onBackdropClick={close}>
        <AboutDialog />
      </Modal>
    </AboutUpdate.Provider>
  )
}

if (__DEV__) {
  AboutUpdate.displayName = 'AboutUpdate'
}
