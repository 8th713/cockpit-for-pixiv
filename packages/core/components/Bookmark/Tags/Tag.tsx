import React from 'react'
import styled from 'styled-components'
import { color, ripple } from '../../theme'

interface Props {
  name: string
  lev: number
  selected?: boolean
  onClick: (tag: string) => void
  children?: never
}

export function Tag(props: Props) {
  function handleClick() {
    props.onClick(props.name)
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      data-level={props.lev}
      aria-selected={props.selected}
    >
      {props.name}
    </Button>
  )
}

export const TagList = styled.div`
  padding: 16px 8px 8px 16px;
  border-radius: 4px;
  line-height: 32px;
  background-color: ${color.divider};
`

const Button = styled.button`
  cursor: pointer;
  user-select: none;
  outline: none;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 0;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 2px 8px;
  border: 0;
  border-radius: 2px;
  background-color: transparent;
  color: ${color.primary};
  font: inherit;
  line-height: 1;
  ${ripple};

  &[aria-selected='true'] {
    background-color: ${color.primary};
    color: ${color.primaryText};
  }
  &[data-level='1'] {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }
  &[data-level='2'] {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.02em;
  }
  &[data-level='3'] {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  &[data-level='4'] {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.04em;
  }
  &[data-level='5'] {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  &[data-level='6'] {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0em;
  }
`
