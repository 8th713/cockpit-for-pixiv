import cubicBezier from 'bezier-easing'
import engine from './engine'

export const easings = {
  linear: cubicBezier(0, 0, 1, 1),
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  easeOutQuart: cubicBezier(0.165, 0.84, 0.44, 1)
}

function createAnimation(param = {}) {
  const source = param.from || {}
  const target = param.to || {}
  const easing = param.easing || easings.easeOutQuart
  const durationInMs = param.duration || 300
  const durationInFrames = Math.max(1, durationInMs * 0.06)
  const keys = Object.keys(target)
  const start = {}
  const diff = {}
  for (const key of keys) {
    start[key] = source[key]
    diff[key] = target[key] - source[key]
  }

  return (frame) => {
    const t = easing(frame / durationInFrames)
    if (frame <= durationInFrames) {
      for (const key of keys) {
        // eslint-disable-next-line no-param-reassign
        param.from[key] = diff[key] * t + start[key]
      }
      return true
    }
    for (const key of keys) {
      // eslint-disable-next-line no-param-reassign
      param.from[key] = target[key]
    }
    return false
  }
}

const id = (T) => T
export default function animate(param = {}) {
  const tick = createAnimation(param)
  const { begin = id, update = id, complete = id } = param
  let frame = 0

  const step = (now) => {
    frame += 1
    if (tick(frame)) {
      update(now)
    } else {
      complete(now)
      pause() // eslint-disable-line no-use-before-define
    }
  }

  const play = () => {
    if (frame === 0) { begin() }
    engine.pause()
    engine.add(step)
    engine.play()
  }
  const pause = () => {
    engine.pause()
    engine.remove(step)
    engine.play()
  }
  const restart = () => {
    frame = 0
    play()
  }
  const seek = (time) => {
    frame = time * 0.06
    step()
  }

  return { play, pause, restart, seek }
}

animate.easings = easings
