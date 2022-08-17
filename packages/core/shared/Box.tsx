import { styled } from '../stitches.config'

export const Box = styled('div', {
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  variants: {
    flex: {
      true: {
        display: 'flex',
      },
    },
    textStyle: {
      h1: { textStyle: '$h1' },
      h2: { textStyle: '$h2' },
      h3: { textStyle: '$h3' },
      body: { textStyle: '$body' },
      caption: { textStyle: '$caption' },
      button: { textStyle: '$button' },
    },
    nowrap: {
      true: {
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
})

export const Title = styled('h1', Box, {
  defaultVariants: {
    textStyle: 'h1',
    nowrap: true,
  },
})

export const Subtitle = styled('h2', Box, {
  defaultVariants: {
    textStyle: 'h2',
    nowrap: true,
  },
})
