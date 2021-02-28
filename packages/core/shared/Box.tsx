import { keyframes, styled } from '../stitches.config'
import { typography } from './typography'

export type BoxProps = React.ComponentProps<typeof Box>
export type FlexProps = React.ComponentProps<typeof Flex>
export type GridProps = React.ComponentProps<typeof Grid>
export type SkeletonProps = React.ComponentProps<typeof Skeleton>

export const Box = styled('div', {
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  variants: {
    typo: typography,
  },
})

export const Flex = styled(Box, {
  display: 'flex',
})

export const Grid = styled(Box, {
  display: 'grid',
})

export const Skeleton = styled(Box, {
  display: 'block',
  backgroundColor: 'rgba(255,255,255,0.12)',
  height: '1.2em',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    cover: 0,
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)`,
    transform: 'translateX(-100%)',
    animationName: keyframes({
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
  variants: {
    variant: {
      text: {
        marginTop: 0,
        marginBottom: 0,
        height: 'auto',
        transformOrigin: '0 55%',
        transform: 'scale(1, 0.60)',
        '&:empty:before': {
          content: '"\\00a0"',
        },
      },
      circular: {
        borderRadius: '50%',
      },
      rectangular: {},
    },
  },
})

if (__DEV__) {
  Box.displayName = 'Box'
  Flex.displayName = 'Flex'
  Grid.displayName = 'Grid'
  Skeleton.displayName = 'Skeleton'
}
