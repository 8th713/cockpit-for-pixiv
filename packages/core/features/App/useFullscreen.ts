import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { atomWithToggle } from '../../shared/atomWithToggle'

const fullSizeAtom = atomWithToggle(false)

export function useFullscreen() {
  return useAtom(fullSizeAtom)
}

export function useUpdateFullscreen() {
  return useUpdateAtom(fullSizeAtom)
}
