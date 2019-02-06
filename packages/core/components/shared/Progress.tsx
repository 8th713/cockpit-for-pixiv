import React from 'react'
import styled, { keyframes } from 'styled-components'
import { color } from '../theme'

type Props = React.ComponentPropsWithoutRef<'div'> & {
  size?: number
  children?: never
}

type RootProps = {
  size: number
  children?: React.ReactNode
}

export function Progress({ size = 256, ...props }: Props) {
  return (
    <Root {...props} role="progressbar" size={size}>
      <Svg viewBox="0 0 50 50">
        <Circle fill="none" cx={25} cy={25} r={20} strokeWidth={3.6} />
      </Svg>
    </Root>
  )
}

const Root = styled.div`
  display: block;
  justify-self: center;
  align-self: center;
  ${({ size }: RootProps) => ({ width: size, height: size })};
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
