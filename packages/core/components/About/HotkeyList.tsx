import React, { useMemo } from 'react'
import styled from 'styled-components'
import { KEY_ASSIGNMENT } from '../../constants'
import { KeyDefinition } from '../../interfaces'
import { Text } from '../shared/Text'
import { Section } from './Section'

const items: KeyDefinition[] = Object.values(KEY_ASSIGNMENT)

export function HotkeyList() {
  const children = useMemo(
    () =>
      items.map(item => (
        <KeyItem key={item.keyName}>
          <Kbd title={item.title}>{item.keyName}</Kbd>
          <Text kind="b2">{item.children}</Text>
        </KeyItem>
      )),
    items // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <Section label="Shortcuts">
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
  border: 1px solid rgba(255, 255, 255, var(--divider));
  border-radius: 2px;
  color: var(--on-surface);
  text-align: center;
  font-family: 'Source Code Pro', 'Consolas', monospace;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.08929em;
  text-decoration: none;
  text-transform: uppercase;
`
