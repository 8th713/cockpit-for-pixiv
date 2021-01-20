import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useMemo } from 'react'

export const aboutAtom = atom(false)

export const useAbout = () => {
  return useAtom(aboutAtom)[0]
}

export const useSetAbout = () => {
  const setOpen = useUpdateAtom(aboutAtom)
  return useMemo(
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((isOpen) => !isOpen),
    }),
    [setOpen]
  )
}
