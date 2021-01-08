import { useLayoutEffect, useMemo, useRef, useState } from 'react'

type State = {
  index: number
  paused: boolean
}

const draw = (canvas: HTMLCanvasElement, image: HTMLImageElement) => {
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

const timeout = (handler: () => void, timeout: number) => {
  const timer = setTimeout(handler, timeout)
  return () => clearTimeout(timer)
}

const initialState: State = {
  index: 0,
  paused: false,
}

export const usePlayer = (frames: Pixiv.FrameAndImage[]) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [state, setState] = useState(initialState)
  const actions = useMemo(
    () => ({
      next: () =>
        setState((state) => ({
          ...state,
          index: state.index + 1,
        })),
      goToTop: () =>
        setState((state) => ({
          ...state,
          index: 0,
        })),
      toggle: () =>
        setState((state) => ({
          ...state,
          paused: !state.paused,
        })),
      rewind: () =>
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
        actions.goToTop()
      } else {
        actions.next()
      }
    }, delay)
  }, [frames, index, paused, actions])

  return useMemo(() => ({ canvasRef, state, actions }), [state, actions])
}
