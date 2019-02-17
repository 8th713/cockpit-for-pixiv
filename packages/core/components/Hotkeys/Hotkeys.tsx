import { useEffect } from 'react'

type Definition = {
  key: string
  shiftKey: boolean
  ctrlKey: boolean
}

type Props = {
  keyName: string
  disabled?: boolean
  onKeyDown: (event: KeyboardEvent) => unknown
}

export function Hotkeys(props: Props) {
  useEffect(() => {
    const definition = parseKeyName(props.keyName)

    function handleKeyDown(event: KeyboardEvent) {
      if (props.disabled) return
      if (testKey(event, definition)) {
        props.onKeyDown(event)
      }
    }
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  })
  return null
}

function parseKeyName(keyName: string) {
  const res: Definition = {
    key: '',
    shiftKey: false,
    ctrlKey: false
  }

  if (keyName.includes('⇧')) {
    res.shiftKey = true
    keyName = keyName.slice(1)
  }
  if (keyName.length > 1 && keyName.includes('^')) {
    res.ctrlKey = true
    keyName = keyName.slice(1)
  }
  if (keyName === '?') {
    res.shiftKey = true
  }
  res.key = keyName.toLowerCase()
  return res
}

const IGNORED = 'input, textarea, select'

function testKey(event: KeyboardEvent, definition: Definition) {
  return (
    event.repeat === false &&
    event.key.toLowerCase() === definition.key &&
    event.shiftKey === definition.shiftKey &&
    event.ctrlKey === definition.ctrlKey &&
    (event.target as Element).matches(IGNORED) === false
  )
}
