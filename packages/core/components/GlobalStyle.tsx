import { createGlobalStyle } from 'styled-components'
import { NO_SCROLLBAR, WORK } from '../constants/selectors'

export const GlobalStyle = createGlobalStyle`
  html.${NO_SCROLLBAR} {
    overflow: hidden;
    scroll-behavior: smooth;

    & iframe,
    & embed {
      visibility: hidden;
    }
  }

  ${WORK} {
    &[href*='illust_id'] {
      cursor: zoom-in;
    }
  }
`
