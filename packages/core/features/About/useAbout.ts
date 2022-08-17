import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { atomWithToggle } from '../../shared/atomWithToggle'

export const aboutAtom = atomWithToggle(false)

export function useAbout() {
  return useAtom(aboutAtom)
}

export function useToggleAbout() {
  return useUpdateAtom(aboutAtom)
}
