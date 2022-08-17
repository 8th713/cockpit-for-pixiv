import { atom, WritableAtom } from 'jotai'

export function atomWithToggle(initialValue?: boolean) {
  const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    const update = nextValue ?? !get(anAtom)

    set(anAtom, update)
  })

  return anAtom as WritableAtom<boolean, boolean | undefined>
}
