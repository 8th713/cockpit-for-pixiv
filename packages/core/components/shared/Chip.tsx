import React from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  children?: React.ReactNode
}

export function Chip({ className, children }: Props) {
  return (
    <Root className={className}>
      <Text>{children}</Text>
    </Root>
  )
}

const Root = styled.div`
  cursor: default;
  box-sizing: border-box;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 16px;
  background-color: #616161;
  color: #fff;
  font-size: 12px;
  vertical-align: middle;
  text-decoration: none;
  white-space: nowrap;
`
const Text = styled.span`
  cursor: inherit;
  user-select: none;
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap;
`
