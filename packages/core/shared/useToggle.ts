import { useState } from 'react'

export const useToggle = () => {
  const [isOpen, setOpen] = useState(false)
  const open = () => setOpen(true)
  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)

  return { isOpen, open, close, toggle }
}
