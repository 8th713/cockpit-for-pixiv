import React from 'react'
import styled from 'styled-components'
import { Box, Bug, Help } from '../shared'
import { Section } from './Section'

export function Signature() {
  return (
    <Section label="About">
      <Box mx={-24}>
        <LinkItem href={GM_info.script.homepage}>
          <Help mr={3} />
          View the Github Project
        </LinkItem>
        <LinkItem href={GM_info.script.supportURL}>
          <Bug mr={3} />
          Report Issues
        </LinkItem>
      </Box>
    </Section>
  )
}

const LinkItem = styled.a`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: 100%;
  height: 56px;
  overflow: hidden;
  margin: 0;
  padding: 0 24px;
  border: 0;
  background-color: transparent;
  color: var(--primary);
  align-items: center;
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
    opacity: 0;
    transition: opacity 15ms linear;
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
