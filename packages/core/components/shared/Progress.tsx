import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { withProp } from 'styled-tools'
import { color } from '../theme'

type Props = React.ComponentPropsWithoutRef<'div'> & {
  size?: number
  children?: never
}

export const Progress: React.FC<Props> = ({ size, ...props }) => (
  <Root {...props} role="progressbar" size={size || 256}>
    <Svg viewBox="0 0 50 50">
      <Circle fill="none" cx={25} cy={25} r={20} strokeWidth={3.6} />
    </Svg>
  </Root>
)

type WithSize = {
  size: number
  children?: React.ReactNode
}
const Root = styled.div<WithSize>`
  display: block;
  justify-self: center;
  align-self: center;
  ${withProp(
    'size',
    size => css`
      width: ${size}px;
      height: ${size}px;
    `
  )}
  margin: auto;
  color: ${color.primary};
`

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const Svg = styled.svg`
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

const Circle = styled.circle`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke-dasharray: 80, 200;
  stroke-dashoffset: 0;
  stroke: currentColor;
  stroke-linecap: round;
`
