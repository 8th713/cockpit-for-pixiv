import { atom, useAtom } from 'jotai'
import { createAddonStore } from '../../externals/addonStore'

const addonAtom = atom(createAddonStore())

export function useAddon() {
  return useAtom(addonAtom)[0]
}
