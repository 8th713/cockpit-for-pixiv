import React from 'react'

type Props = {
  keyName: string
  disabled?: boolean
  onKeyDown: (event: KeyboardEvent) => unknown
}

export const Hotkeys = React.memo(function Hotkeys(props: Props) {
  const definition = parseKeyName(props.keyName)

  React.useEffect(() => {
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
})

type Definition = {
  key: string
  shiftKey: boolean
  ctrlKey: boolean
}

function parseKeyName(keyName: string) {
  const res: Definition = {
    key: '',
    shiftKey: false,
    ctrlKey: false
  }

  if (keyName.includes('⇧')) {
    res.shiftKey = true
    keyName = keyName.replace(/⇧/g, '')
  }
  if (keyName.includes('^')) {
    res.ctrlKey = true
    keyName = keyName.replace(/\^/g, '')
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
