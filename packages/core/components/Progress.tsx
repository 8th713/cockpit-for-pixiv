import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { extend, sx, SxProps } from './utils'

export interface ProgressProps extends SxProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>
  size?: number
}

export const Progress = ({ size, sx, ...props }: ProgressProps) => (
  <Root
    {...props}
    sx={{
      ...sx,
      width: size,
      height: size
    }}
    role="progressbar"
  >
    <Svg viewBox="0 0 50 50">
      <Circle fill="none" cx={25} cy={25} r={20} strokeWidth={3.6} />
    </Svg>
  </Root>
)

const rotate = keyframes({
  to: { transform: 'rotate(360deg)' }
})
const dash = keyframes({
  from: { strokeDasharray: '1,200', strokeDashoffset: 0 },
  '50%': { strokeDasharray: '100,200', strokeDashoffset: -15 },
  to: { strokeDasharray: '100,200', strokeDashoffset: -120 }
})

const Root = styled.div<SxProps>(
  extend({
    overflow: 'hidden',
    flexShrink: 0,
    size: 256,
    m: 'auto',
    color: 'primary'
  }),
  sx
)

const Svg = styled.svg`
  animation: ${rotate} 1.4s linear infinite;
`

const Circle = styled.circle(
  {
    strokeDasharray: '80,200',
    strokeDashoffset: 0,
    stroke: 'currentColor',
    strokeLinecap: 'round'
  },
  css`
    animation: ${dash} 1.4s ease-in-out infinite;
  `
)

if (__DEV__) {
  Root.displayName = 'Progress.Root'
  Svg.displayName = 'Progress.Svg'
  Circle.displayName = 'Progress.Circle'
}
