import React, { useMemo } from 'react'
import styled from 'styled-components'
import { keyMap } from '../../constants'
import { Text } from '../shared/Text'
import { color } from '../theme'
import { Section } from './Section'

const items = Object.values(keyMap)

export function ShortcutsList() {
  const children = useMemo(
    () =>
      items.map(item => (
        <KeyItem key={item.keyName}>
          <Kbd>{item.keyName}</Kbd>
          <Text as="span" v="b2" c="textSecondary">
            {item.children}
          </Text>
        </KeyItem>
      )),
    items
  )

  return (
    <Section label="Keyboard Shortcut">
      <List>{children}</List>
    </Section>
  )
}

const List = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`
const KeyItem = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 36px 1fr;
  gap: 24px;
`
const Kbd = styled.kbd`
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid ${color.divider};
  border-radius: 2px;
  color: ${color.surfaceText};
  text-align: center;
  font-family: 'Source Code Pro', 'Consolas', monospace;
  font-size: 0.875em;
  font-weight: 500;
  letter-spacing: 0.08929em;
  text-decoration: none;
  text-transform: uppercase;
`
