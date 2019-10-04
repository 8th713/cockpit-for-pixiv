import { useEffect } from 'react'

export interface KeyDefinition {
  /** Description */
  children?: string
  /** Key assignment */
  keyName: string
  /** HotKey 定義 */
  title?: string
}

export interface KeyAction {
  (event: KeyboardEvent): void
}

export interface HotkeyProps extends KeyDefinition {
  action: KeyAction
  disabled?: boolean
}

const IGNORED = 'input, textarea, select'
const map = new Map<string, KeyAction>()

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
  const entries = [...map.entries()]
  for (const [keyName, action] of entries) {
    if (pressedKey === keyName) {
      action(event)
    }
  }
}

const attach = (keyName: string, action: KeyAction) => {
  if (map.size === 0) {
    window.addEventListener('keydown', handleKeyDown, true)
  }
  map.set(keyName, action)
  return () => {
    map.delete(keyName)
    if (map.size === 0) {
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }
}

export const Hotkey = ({ action, disabled, keyName }: HotkeyProps) => {
  useEffect(() => {
    if (disabled) return
    return attach(keyName, action)
  })
  return null
}

export const getHotkeyHint = ({ children, keyName, title }: KeyDefinition) =>
  `${children}(${title || keyName.toUpperCase()})`
