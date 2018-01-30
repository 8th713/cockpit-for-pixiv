import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from './variables'

interface ProgressProps {
  size?: number
  className?: string
}

export const Progress: React.SFC<ProgressProps> = ({ size, className }) => (
  <Root className={className} size={size} role="progressbar">
    <Svg>
      <Circle />
    </Svg>
  </Root>
)

const getSize = ({ size = 40 }: ProgressProps) => size

const Root = styled.div`
  display: block;
  justify-self: center;
  align-self: center;
  width: ${getSize}px;
  height: ${getSize}px;
  margin: auto;
  color: ${colors.primary};
`

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const Svg = styled.svg.attrs({
  viewBox: '0 0 50 50'
})`
  animation: ${rotate} 1.4s linear infinite;
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

const Circle = styled.circle.attrs({
  fill: 'none',
  cx: 25,
  cy: 25,
  r: 20,
  strokeWidth: 3.6
})`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke-dasharray: 80, 200;
  stroke-dashoffset: 0;
  stroke: currentColor;
  stroke-linecap: round;
`
