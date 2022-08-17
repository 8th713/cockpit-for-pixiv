import { useEffect } from 'react'
import type { KeyDefinition } from '../keyboardMap'

export type KeyboardEventHandler = (event: KeyboardEvent) => void

export interface HotkeyProps extends KeyDefinition {
  onKeydown: KeyboardEventHandler
  disabled?: boolean
}

const IGNORED = 'input, textarea, select'
const map = new Map<string, KeyboardEventHandler>()

function parseKeyboardEvent(event: KeyboardEvent) {
  let key = ''

  if (event.ctrlKey) key += 'Control+'
  if (event.altKey) key += 'Alt+'
  if (event.metaKey) key += 'Meta+'
  key += event.key
  return key
}

function handleKeyDown(event: KeyboardEvent) {
  const node = event.target as Element

  if (event.repeat) return
  if (node.matches(IGNORED)) return

  const pressedKey = parseKeyboardEvent(event)
  const entries = [...map.entries()]

  for (const [assignment, listener] of entries) {
    if (pressedKey === assignment) {
      listener(event)
    }
  }
}

function attach(assignment: string, listener: KeyboardEventHandler) {
  if (map.size === 0) {
    window.addEventListener('keydown', handleKeyDown, true)
  }
  map.set(assignment, listener)

  return () => {
    map.delete(assignment)
    if (map.size === 0) {
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }
}

export function Hotkey({ onKeydown, disabled, assignment }: HotkeyProps) {
  useEffect(() => {
    if (disabled) return
    return attach(assignment, onKeydown)
  })
  return null
}
