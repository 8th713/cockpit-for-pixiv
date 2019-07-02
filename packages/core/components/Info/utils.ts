import { KeyDefinition } from '../../interfaces'

export function getTitle(props: KeyDefinition) {
  return `${props.children}(${props.keyName.toUpperCase()})`
}
