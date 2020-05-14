import { useLayoutEffect, useMemo, useReducer, useRef } from 'react'

type State = {
  index: number
  paused: boolean
}

type Action =
  | { type: 'increment' }
  | { type: 'goToTop' }
  | { type: 'toggle' }
  | { type: 'rewind' }
  | { type: 'play' }

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
  paused: false
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment': {
      return { ...state, index: state.index + 1 }
    }
    case 'goToTop': {
      return { ...state, index: 0 }
    }
    case 'toggle': {
      return { ...state, paused: !state.paused }
    }
    case 'rewind': {
      return { index: 0, paused: true }
    }
    case 'play': {
      return { ...state, paused: false }
    }
  }
}

export const usePlayer = (frames: Pixiv.FrameAndImage[]) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { index, paused } = state

  useLayoutEffect(() => {
    const { delay, image } = frames[index]

    if (!canvas.current) return

    draw(canvas.current, image)

    if (paused) return

    return timeout(() => {
      if (index === frames.length - 1) {
        dispatch({ type: 'goToTop' })
      } else {
        dispatch({ type: 'increment' })
      }
    }, delay)
  }, [frames, index, paused])

  return useMemo(() => [canvas, state, dispatch] as const, [state])
}
