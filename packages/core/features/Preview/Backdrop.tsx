import { styled } from '../../stitches.config'

export const Backdrop = styled('div', {
  pointerEvents: 'none',
  cover: 0,
  padding: '$2',
  variants: {
    fit: {
      true: {
        padding: 0,
      },
    },
    between: {
      true: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
    right: {
      true: {
        textAlign: 'right',
      },
    },
  },
})
