import React from 'react'
import { Box, Button } from '../shared'
import { useSort } from './SortHost'
import { getButtonStyle } from './utils'

export function SortButtons() {
  const { column, direction, sortByName, sortByTotal } = useSort()
  const nameBtnStyle = getButtonStyle(column === 'name', direction)
  const totalBtnStyle = getButtonStyle(column === 'total', direction)

  return (
    <Box>
      <Button
        variant="outlined"
        colors={nameBtnStyle.color}
        type="button"
        onClick={sortByName}
      >
        名前順{nameBtnStyle.arrow}
      </Button>
      <Button
        variant="outlined"
        colors={totalBtnStyle.color}
        type="button"
        onClick={sortByTotal}
      >
        件数順{totalBtnStyle.arrow}
      </Button>
    </Box>
  )
}
