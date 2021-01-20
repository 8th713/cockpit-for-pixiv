import { css, StitchesProps, styled } from '../stitches.config'

export type BoxProps = StitchesProps<typeof Box>
export type FlexProps = StitchesProps<typeof Flex>
export type GridProps = StitchesProps<typeof Grid>

export const Box = styled('div', {
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
})

export const Flex = styled(Box, {
  display: 'flex',
})

export const Grid = styled(Box, {
  display: 'grid',
})

export const Skeleton = styled(Box, {
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'rgba(255,255,255,0.12)',
  '&::after': {
    content: '""',
    cover: 0,
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)`,
    transform: 'translateX(-100%)',
    animationName: css.keyframes({
      '0%': {
        transform: 'translateX(-100%)',
      },
      '60%': {
        transform: 'translateX(100%)',
      },
      '100%': {
        transform: 'translateX(100%)',
      },
    }),
    animationDuration: '1.6s',
    animationTimingFunction: 'linear',
    animationDelay: '0.5s',
    animationIterationCount: 'infinite',
  },
})

if (__DEV__) {
  Box.displayName = 'Box'
  Flex.displayName = 'Flex'
  Grid.displayName = 'Grid'
  Skeleton.displayName = 'Skeleton'
}
