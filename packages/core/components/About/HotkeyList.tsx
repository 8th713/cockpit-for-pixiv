import React, { useMemo } from 'react'
import styled from 'styled-components'
import { KEY_ASSIGNMENT } from '../../constants'
import { KeyDefinition } from '../../interfaces'
import { Box, Text } from '../shared'
import { Section } from './Section'

const items: KeyDefinition[] = Object.values(KEY_ASSIGNMENT)

export function HotkeyList() {
  const children = useMemo(
    () =>
      items.map(item => (
        <Box key={item.keyName} display="flex" alignItems="center">
          <Kbd title={item.title}>{item.keyName}</Kbd>
          <Text textStyle="b2" em="high" ml={3}>
            {item.children}
          </Text>
        </Box>
      )),
    items // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <Section label="Shortcuts">
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gridGap={3}
        alignItems="center"
      >
        {children}
      </Box>
    </Section>
  )
}

const Kbd = styled.kbd`
  box-sizing: border-box;
  display: inline-block;
  min-width: 32px;
  border: 1px solid rgba(255, 255, 255, var(--divider));
  border-radius: 2px;
  color: var(--on-surface);
  text-align: center;
  font-family: Source Code Pro, SFMono-Regular, Consolas, Liberation Mono, Menlo,
    Courier, monospace;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.08929em;
  text-decoration: none;
  text-transform: uppercase;
`
