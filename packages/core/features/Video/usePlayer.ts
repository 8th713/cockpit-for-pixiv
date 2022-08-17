import { useLayoutEffect, useMemo, useRef, useState } from 'react'

type PlayerState = {
  index: number
  paused: boolean
}

const initialState: PlayerState = {
  index: 0,
  paused: false,
}

export function usePlayer(frames: Pixiv.FrameAndImage[]) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [state, setState] = useState(initialState)
  const actions = useMemo(
    () => ({
      pause: () =>
        setState((state) => ({
          ...state,
          paused: !state.paused,
        })),
      stop: () =>
        setState({
          index: 0,
          paused: true,
        }),
      play: () =>
        setState((state) => ({
          ...state,
          paused: false,
        })),
    }),
    []
  )

  const { index, paused } = state

  useLayoutEffect(() => {
    if (!frames[index]) return
    if (!canvasRef.current) return

    const { delay, image } = frames[index]

    draw(canvasRef.current, image)

    if (paused) return

    return timeout(() => {
      if (index === frames.length - 1) {
        setState((state) => ({
          ...state,
          index: 0,
        }))
      } else {
        setState((state) => ({
          ...state,
          index: state.index + 1,
        }))
      }
    }, delay)
  }, [frames, index, paused, actions])

  return useMemo(() => ({ canvasRef, state, actions }), [state, actions])
}

function draw(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const { width, height } = image

  if (canvas.width !== width) {
    canvas.width = width
  }
  if (canvas.height !== height) {
    canvas.height = height
  }

  const ctx = canvas.getContext('2d')!

  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(image, 0, 0)
}

function timeout(handler: () => void, timeout: number) {
  const timer = setTimeout(handler, timeout)
  return () => clearTimeout(timer)
}
