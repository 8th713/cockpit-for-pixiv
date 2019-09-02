import { createGlobalStyle } from 'styled-components'
import { NO_SCROLLBAR } from '../constants'

export const GlobalStyle = createGlobalStyle({
  [`html.${NO_SCROLLBAR}`]: {
    overflow: 'hidden',
    '& iframe, & embed': {
      visibility: 'hidden'
    }
  }
})
