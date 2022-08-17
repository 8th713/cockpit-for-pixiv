import { atom, useAtom } from 'jotai'

export type IndexAndElement = [number, Element]

const listAtom = atom(new Map<Element, number>())

export function useNodeList() {
  return useAtom(listAtom)[0]
}

export function useRegistryNode(index: number) {
  const [list] = useAtom(listAtom)

  return (element: Element) => {
    list.set(element, index)
    return () => {
      list.delete(element)
    }
  }
}
