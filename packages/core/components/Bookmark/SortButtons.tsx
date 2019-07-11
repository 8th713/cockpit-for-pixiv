import React from 'react'
import styled from 'styled-components'
import { Button } from '../shared/Button'
import { useSort } from './SortHost'
import { getButtonStyle } from './utils'

export function SortButtons() {
  const { column, direction, sortByName, sortByTotal } = useSort()
  const nameBtnStyle = getButtonStyle(column === 'name', direction)
  const totalBtnStyle = getButtonStyle(column === 'total', direction)

  return (
    <Action>
      <Button colors={nameBtnStyle.color} type="button" onClick={sortByName}>
        名前順{nameBtnStyle.arrow}
      </Button>
      <Button colors={totalBtnStyle.color} type="button" onClick={sortByTotal}>
        件数順{totalBtnStyle.arrow}
      </Button>
    </Action>
  )
}

const Action = styled.div`
  display: flex;
  align-items: center;
  button + button {
    margin-right: 8px;
  }
`
