import { useEffect } from 'react'
import { KeyDefinition } from '../../interfaces'

type Props = {
  action: (event: KeyboardEvent) => unknown
} & KeyDefinition

const IGNORED = 'input, textarea, select'
const map = new Map<string, Props>()

function parseKeyName(keyName: string) {
  const res = {
    key: '',
    shiftKey: false,
    ctrlKey: false
  }

  if (keyName.includes('⇧') || keyName === '?') {
    res.shiftKey = true
    keyName = keyName.replace(/⇧/g, '')
  }
  if (keyName.includes('^')) {
    res.ctrlKey = true
    keyName = keyName.replace(/\^/g, '')
  }
  res.key = keyName.toLowerCase()
  return res
}

function testKey(event: KeyboardEvent, keyName: string) {
  const node = parseKeyName(keyName)
  return (
    event.repeat === false &&
    event.key === node.key &&
    event.shiftKey === node.shiftKey &&
    event.ctrlKey === node.ctrlKey &&
    (event.target as Element).matches(IGNORED) === false
  )
}

function handleKeyDown(event: KeyboardEvent) {
  const values = [...map.values()]
  for (const props of values) {
    if (testKey(event, props.keyName)) {
      props.action(event)
    }
  }
}

function attach() {
  if (map.size === 0) {
    window.addEventListener('keydown', handleKeyDown, true)
  }
}
function detach() {
  if (map.size === 0) {
    window.removeEventListener('keydown', handleKeyDown, true)
  }
}

export function Hotkey(props: Props) {
  useEffect(() => {
    const { keyName } = props

    attach()
    map.set(keyName, props)
    return () => {
      map.delete(keyName)
      detach()
    }
  })

  return null
}
