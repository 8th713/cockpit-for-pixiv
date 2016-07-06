import cubicBezier from 'bezier-easing'
import Engine from './engine'

export const easings = {
  linear: cubicBezier(0, 0, 1, 1),
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  easeOutQuart: cubicBezier(0.165, 0.84, 0.44, 1)
}

const engine = new Engine()
export default function animate(param = {}) {
  const duration = param.duration || 375
  const source = param.from || {}
  const target = param.to || {}
  const easing = param.easing || easings.easeOutQuart
  const keys = Object.keys(target)
  const start = {}
  const diff = {}
  for (const key of keys) {
    start[key] = source[key]
    diff[key] = target[key] - source[key]
  }

  function update(t) {
    for (const key of keys) {
      // eslint-disable-next-line no-param-reassign
      param.from[key] = diff[key] * t + start[key]
    }
  }

  let unsubscribe
  let elapsed = 0
  function step(diffTime) {
    elapsed += diffTime
    if (elapsed < duration) {
      update(easing(elapsed / duration))
    } else {
      update(1)
      unsubscribe()
    }
  }

  return {
    play() {
      engine.pause()
      unsubscribe = engine.subscribe(step)
      engine.play()
    },
    pause() {
      if (unsubscribe) {
        engine.pause()
        unsubscribe()
        engine.play()
      }
    },
    restart() {
      elapsed = 0
      this.play()
    },
    seek(ms) {
      step(ms)
    }
  }
}

animate.easings = easings
