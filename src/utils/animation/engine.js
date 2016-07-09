const isFn = (fn) => typeof fn === 'function'

export default class Engine {
  constructor() {
    this.set = new Set()
  }

  tick(time) {
    const diff = time - this.lastTime
    if (isNaN(diff) || diff > 33) {
      this.lastTime = time
      return this.play()
    }
    for (const step of this.set) {
      step(diff)
    }
    this.lastTime = time
    return this.play()
  }

  play() {
    if (this.set.size) {
      requestAnimationFrame((n) => this.tick(n))
    }
  }

  pause() {
    cancelAnimationFrame(this.frame)
  }

  subscribe(fn) {
    if (isFn(fn)) {
      this.set.add(fn)
    }
    return () => this.set.delete(fn)
  }

  delete(fn) {
    this.set.delete(fn)
    if (this.size === 0) {
      this.pause()
    }
    return this
  }
}
