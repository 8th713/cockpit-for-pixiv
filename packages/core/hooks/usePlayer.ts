import { useRef, useState, RefObject, useLayoutEffect } from 'react'
import { Frame } from '../interfaces'

export function usePlayer(ref: RefObject<HTMLCanvasElement>, frames: Frame[]) {
  const timerRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  function draw(image: HTMLImageElement) {
    if (!image || !ref.current) return

    const canvas = ref.current

    if (canvas.width !== image.width) {
      canvas.width = image.width
    }
    if (canvas.height !== image.height) {
      canvas.height = image.height
    }

    const ctx = canvas.getContext('2d')!

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0)
  }
  function next() {
    const lastFrame = frames.length - 1

    if (index === lastFrame) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }
  function toggle() {
    if (paused) {
      setPaused(false)
      next()
    } else {
      window.clearTimeout(timerRef.current)
      setPaused(true)
    }
  }
  function rewind() {
    window.clearTimeout(timerRef.current)
    setPaused(true)
    setIndex(0)
  }

  useLayoutEffect(() => {
    const { delay, image } = frames[index]

    draw(image)

    if (!paused) {
      timerRef.current = window.setTimeout(next, delay)
    }
    return () => {
      window.clearTimeout(timerRef.current)
    }
  }, [index])

  return { index, paused, toggle, rewind }
}
