import { useRef } from 'react'
import { keyframes } from '../stitches.config'

export function useRipple<E extends Element>(
  handleClick?: React.MouseEventHandler<E>
) {
  const circleRef = useRef<HTMLSpanElement | null>(null)

  return (e: React.MouseEvent<E>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()

    if (circleRef.current === null) {
      circleRef.current = document.createElement('span')
      circleRef.current.classList.add('ripple')
    } else {
      circleRef.current.remove()
    }

    const circle = circleRef.current
    const diameter = Math.max(rect.width, rect.height)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.clientX - rect.left - radius}px`
    circle.style.top = `${e.clientY - rect.top - radius}px`
    button.appendChild(circle)
    handleClick && handleClick(e)
  }
}

export function useRippleLite<E extends Element>(
  handleClick?: React.MouseEventHandler<E>
) {
  const circleRef = useRef<HTMLSpanElement | null>(null)

  return (e: React.MouseEvent<E>) => {
    const button = e.currentTarget

    if (circleRef.current === null) {
      circleRef.current = document.createElement('span')
      circleRef.current.classList.add('ripple')
    } else {
      circleRef.current.remove()
    }

    button.appendChild(circleRef.current)
    handleClick && handleClick(e)
  }
}

export const ripple = keyframes({
  to: {
    transform: 'scale(4)',
    opacity: 0,
  },
})
