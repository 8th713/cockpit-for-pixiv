import { keyframes, styled } from '../stitches.config'

export type ProgressProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>
  size?: number
}

export function Progress({ size, ...props }: ProgressProps) {
  return (
    <Root {...props} css={{ size }} role="progressbar">
      <Svg viewBox="0 0 50 50">
        <Circle fill="none" cx={25} cy={25} r={20} strokeWidth={3.6} />
      </Svg>
    </Root>
  )
}

const Root = styled('div', {
  boxSizing: 'border-box',
  overflow: 'hidden',
  minWidth: 0,
  flexShrink: 0,
  size: 256,
  margin: 'auto',
  color: '$primary',
})

const Svg = styled('svg', {
  animationName: keyframes({ to: { transform: 'rotate(360deg)' } }).toString(),
  animationDuration: '1.4s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
})

const Circle = styled('circle', {
  strokeDasharray: '80,200',
  strokeDashoffset: 0,
  stroke: 'currentColor',
  strokeLinecap: 'round',
  animationName: keyframes({
    from: { strokeDasharray: '1,200', strokeDashoffset: 0 },
    '50%': { strokeDasharray: '100,200', strokeDashoffset: '-15' },
    to: { strokeDasharray: '100,200', strokeDashoffset: '-120' },
  }).toString(),
  animationDuration: '1.4s',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
})
