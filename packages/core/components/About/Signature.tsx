import React from 'react'
import styled from 'styled-components'
import { Bug, Help } from '../shared/Icon'
import { color, ripple } from '../theme'
import { Section } from './Section'

export function Signature() {
  return (
    <Section label="About">
      <List>
        <LinkItem href={GM_info.script.homepage}>
          <Help />
          View the Github Project
        </LinkItem>
        <LinkItem href={GM_info.script.supportURL}>
          <Bug />
          Report Issues
        </LinkItem>
      </List>
    </Section>
  )
}

const List = styled.div`
  margin: 0 -24px;
`
const LinkItem = styled.a`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 32px;
  width: 100%;
  height: 56px;
  align-items: center;
  padding: 0 24px;
  color: ${color.surfaceText};
  ${ripple};
`
