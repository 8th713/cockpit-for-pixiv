import React from 'react'
import styled, { keyframes } from 'styled-components'
import * as sys from '../system'

interface BoxProps
  extends sys.PositionProps,
    sys.SizeProps,
    sys.MarginProps,
    sys.FlexItemProps,
    sys.GridItemProps,
    sys.ColorProps {}
type DivProps = React.ComponentPropsWithoutRef<'div'>
export type ProgressProps = BoxProps &
  DivProps & {
    as?: never
  }

const Impl = React.forwardRef<HTMLDivElement, ProgressProps>((props, ref) => (
  <div {...props} role="progressbar">
    <svg viewBox="0 0 50 50">
      <circle fill="none" cx={25} cy={25} r={20} strokeWidth={3.6} />
    </svg>
  </div>
))
Impl.displayName = 'Progress'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100,200;
    stroke-dashoffset: -15;
  }
  100% {
    stroke-dasharray: 100,200;
    stroke-dashoffset: -120;
  }
`

export const Progress = styled(Impl)`
  box-sizing: border-box;
  flex-shrink: 0;
  ${sys.compose(
    sys.position,
    sys.size,
    sys.margin,
    sys.flexbox,
    sys.grid,
    sys.color
  )}
  & > svg {
    animation: ${rotate} 1.4s linear infinite;
    & > circle {
      animation: ${dash} 1.4s ease-in-out infinite;
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;
      stroke: currentColor;
      stroke-linecap: round;
    }
  }
`
Progress.defaultProps = {
  size: 256,
  m: 'auto',
  color: 'primary'
}
