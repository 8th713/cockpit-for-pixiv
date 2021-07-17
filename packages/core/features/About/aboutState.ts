import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useMemo } from 'react'

export const aboutAtom = atom(false)

export function useAbout() {
  return useAtom(aboutAtom)[0]
}

export function useSetAbout() {
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
