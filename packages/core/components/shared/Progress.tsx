import React from 'react'
import styled, { keyframes } from 'styled-components'

type Props = React.ComponentPropsWithoutRef<'div'> & {
  size?: number
  children?: never
}

export function Progress({ size = 256, ...props }: Props) {
  const style: React.CSSProperties = {
    '--size': `${size}px`,
    ...props.style
  } as any
  return (
    <Root {...props} role="progressbar" style={style}>
      <svg viewBox="0 0 50 50">
        <circle fill="none" cx={25} cy={25} r={20} strokeWidth={3.6} />
      </svg>
    </Root>
  )
}

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

const Root = styled.div`
  display: block;
  justify-self: center;
  align-self: center;
  width: var(--size);
  height: var(--size);
  margin: auto;
  color: var(--primary);

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
