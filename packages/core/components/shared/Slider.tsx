import React, {
  useLayoutEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'
import { opacity, color } from '../theme'

type Props = React.ComponentPropsWithoutRef<'input'> & {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => unknown
  children?: never
}

type PosProps = {
  position: number
}

export const Slider = React.forwardRef<HTMLInputElement, Props>(function Slider(
  props,
  ref
) {
  const input = useRef<HTMLInputElement>(null)
  const [pos, setPos] = useState(0)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPos(getPos(event.target))
    if (props.onChange) {
      props.onChange(event, event.target.valueAsNumber)
    }
  }

  useLayoutEffect(() => {
    if (input.current) {
      setPos(getPos(input.current))
    }
  }, [])
  useImperativeHandle(ref, () => input.current!, [input])

  return (
    <Box>
      <Input ref={input} {...props} type="range" onChange={handleChange} />
      <Track position={pos}>
        <Thumb position={pos} />
      </Track>
    </Box>
  )
})

function getPos(ref: HTMLInputElement) {
  const value = ref.valueAsNumber
  const max = Number(ref.max) || 100
  const min = Number(ref.min) || 0
  const clamped = clamp(value, min, max)

  return (clamped - min) / (max - min)
}
function clamp(value: number, lower: number, upper: number) {
  return Math.max(Math.min(value, upper), lower)
}

const Box = styled.div`
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 100%;
  height: 48px;
  padding: 23px 0;
  background-color: ${color.surface};
`
const Input = styled.input`
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  border: 0;
  padding: 0;
  opacity: 0;
  &:disabled {
    pointer-events: none;
  }
`

const Track = styled.div`
  pointer-events: none;
  user-select: none;
  position: relative;
  height: 2px;
  margin: 0 6px;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${color.primary};
    opacity: 0.24;
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${color.primary};
    transform-origin: top left;
    transform: scaleX(${({ position }: PosProps) => position});
  }

  input:disabled ~ & {
    &::before {
      opacity: ${opacity.disabled};
      background-color: ${color.surfaceText};
    }
    &::after {
      opacity: ${opacity.disabled};
      background-color: ${color.surfaceText};
    }
  }
`
const Thumb = styled.div`
  pointer-events: none;
  user-select: none;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: ${({ position }: PosProps) => position * 100}%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: transparent;
  transform: translate(-50%, -50%);
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${color.primary};
    transform: scale(0.75);
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${color.primary};
    opacity: 0.08;
    transform-origin: center;
    transform: scale(0);
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  input:focus ~ div > & {
    &::after {
      transform: scale(2.25);
    }
  }
  input:active ~ div & {
    ::after {
      transform: scale(3);
    }
  }
  input:disabled ~ div > & {
    background-color: ${color.surface};
    &::before {
      background-color: ${color.surfaceText};
      opacity: ${opacity.disabled};
      transform: scale(0.5);
    }
  }
`
