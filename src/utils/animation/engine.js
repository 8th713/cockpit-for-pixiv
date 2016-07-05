const animations = new Set()
let raf = 0

const step = (time) => {
  for (const fn of animations) { fn(time) }
  play() // eslint-disable-line no-use-before-define
}

const add = (fn) => animations.add(fn)
const remove = (fn) => animations.delete(fn)
const pause = () => {
  cancelAnimationFrame(raf)
  raf = 0
}
const play = () => {
  if (animations.size) {
    raf = requestAnimationFrame(step)
  }
}

export default { add, remove, play, pause }
