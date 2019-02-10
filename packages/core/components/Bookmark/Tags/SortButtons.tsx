import React, { useContext } from 'react'
import styled from 'styled-components'
import { Column } from '../../../constants'
import { UserTagsProvider, UserTagsContextValue } from '../../../contexts'
import { Button } from '../../shared/Button'

export function SortButtons() {
  const context = useContext(UserTagsProvider.Context)
  const columnBtnStyle = btnStyle(context, Column.NAME)
  const totalBtnStyle = btnStyle(context, Column.TOTAL)

  return (
    <ButtonArea>
      <Button
        c={columnBtnStyle.color}
        type="button"
        onClick={context.sortByName}
      >
        名前順{columnBtnStyle.arrow}
      </Button>
      <Button
        c={totalBtnStyle.color}
        type="button"
        onClick={context.sortByTotal}
      >
        件数順{totalBtnStyle.arrow}
      </Button>
    </ButtonArea>
  )
}
const ButtonArea = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  align-items: center;
`

function btnStyle(condition: UserTagsContextValue, type: Column) {
  const color: 'default' | 'primary' =
    condition.column === type ? 'default' : 'primary'
  const arrow = condition.column === type ? condition.direction : ''
  return { color, arrow }
}
