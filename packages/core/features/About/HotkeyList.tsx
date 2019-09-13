import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Box, KeyDefinition, Text } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { Section } from './Section'

const items: KeyDefinition[] = Object.values(KEY_ASSIGNMENT)

export const HotkeyList = () => {
  const children = useMemo(
    () =>
      items.map(item => {
        const combokey = item.title || item.keyName.toUpperCase()
        return (
          <Box key={combokey} display="flex" alignItems="center">
            <Text textStyle="b2" em="high" mr={3} flexGrow={1}>
              {item.children}
            </Text>
            {combokey
              .split('+')
              .flatMap((key, i) => [
                <Text key={i} mx={1} em="medium" textStyle="b2">
                  +
                </Text>,
                <Kbd key={key}>{key}</Kbd>
              ])
              .slice(1)}
          </Box>
        )
      }),
    []
  )

  return (
    <Section label="Shortcuts">
      <Box display="grid" gridRowGap={2} alignItems="center">
        {children}
      </Box>
    </Section>
  )
}

const Kbd = styled.kbd`
  box-sizing: border-box;
  display: inline-block;
  min-width: 32px;
  padding: 0 8px;
  border: 1px solid rgba(255, 255, 255, var(--divider));
  border-radius: 4px;
  color: var(--on-surface);
  text-align: center;
  ${({ theme }) => theme.textStyles.h3};
  font-family: 'Source Code Pro', SFMono-Regular, Consolas, 'Liberation Mono',
    Menlo, Courier, monospace;
  text-decoration: none;
`
