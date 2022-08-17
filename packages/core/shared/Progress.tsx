import { keyframes, styled } from '../stitches.config'

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressContainer> {}

export function Progress({ ...props }: ProgressProps) {
  return (
    <ProgressContainer role="progressbar" {...props}>
      <ProgressSvg viewBox="0 0 50 50">
        <ProgressCircle fill="none" cx={25} cy={25} r={20} strokeWidth={3.6} />
      </ProgressSvg>
    </ProgressContainer>
  )
}

const rotateAnimetion = keyframes({
  to: {
    transform: 'rotate(360deg)',
  },
}).toString()

const circleAnimetion = keyframes({
  from: {
    strokeDasharray: '1,200' as any,
    strokeDashoffset: 0,
  },
  '50%': {
    strokeDasharray: '100,200' as any,
    strokeDashoffset: '-15',
  },
  to: {
    strokeDasharray: '100,200' as any,
    strokeDashoffset: '-120',
  },
}).toString()

const ProgressContainer = styled('div', {
  boxSizing: 'border-box',
  overflow: 'hidden',
  minWidth: 0,
  flexShrink: 0,
  size: 'var(--size)',
  margin: 'auto',
  variants: {
    primary: {
      true: { color: '$primary' },
    },
    size: {
      sm: { size: 18 },
      md: { size: 24 },
      lg: { size: 256 },
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

const ProgressSvg = styled('svg', {
  animationName: rotateAnimetion,
  animationDuration: '1.4s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
})

const ProgressCircle = styled('circle', {
  strokeDasharray: '80,200' as any,
  strokeDashoffset: 0,
  stroke: 'currentColor',
  strokeLinecap: 'round',
  animationName: circleAnimetion,
  animationDuration: '1.4s',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
})
