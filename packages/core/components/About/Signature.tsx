import React from 'react'
import styled from 'styled-components'
import { Bug, Help } from '../shared/Icon'
import { Section } from './Section'

export function Signature() {
  return (
    <Section label="About">
      <List>
        <LinkItem href={GM_info.script.homepage}>
          <Help />
          <Gap />
          View the Github Project
        </LinkItem>
        <LinkItem href={GM_info.script.supportURL}>
          <Bug />
          <Gap />
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
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  margin: 0;
  padding: 0 24px;
  border: 0;
  background-color: transparent;
  color: var(--primary);
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: var(--enabled);
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:hover {
    text-decoration: none;
    &::before {
      opacity: var(--hovered);
    }
  }
  &:focus {
    &::before {
      opacity: var(--focused);
    }
  }
  &:active {
    &::before {
      opacity: var(--pressed);
    }
  }
`
const Gap = styled.span`
  display: inline-block;
  width: 16px;
`
