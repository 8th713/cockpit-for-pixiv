import { useEffect } from 'react'

/** HotKey 定義 */
export interface KeyDefinition {
  keyName: string
  children: string
  title?: string
}

type Props = {
  action: (event: KeyboardEvent) => unknown
} & KeyDefinition

const IGNORED = 'input, textarea, select'
const map = new Map<string, Props['action']>()

const parseKeyboardEvent = (event: KeyboardEvent) => {
  let key = ''
  if (event.ctrlKey) key += 'Control+'
  if (event.altKey) key += 'Alt+'
  if (event.metaKey) key += 'Meta+'
  key += event.key
  return key
}

const handleKeyDown = (event: KeyboardEvent) => {
  const node = event.target as Element
  if (event.repeat) return
  if (node.matches(IGNORED)) return
  const pressedKey = parseKeyboardEvent(event)
  const values = [...map.entries()]
  for (const [keyName, action] of values) {
    if (pressedKey === keyName) {
      action(event)
    }
  }
}

const attach = (props: Props) => {
  if (map.size === 0) {
    window.addEventListener('keydown', handleKeyDown, true)
  }
  const { keyName, action } = props
  map.set(keyName, action)
  return () => {
    map.delete(keyName)
    if (map.size === 0) {
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }
}

export const Hotkey = (props: Props) => {
  useEffect(() => attach(props))
  return null
}

export const getHotkeyHint = (props: KeyDefinition) => {
  const key = props.title || props.keyName.toUpperCase()
  return `${props.children}(${key})`
}
