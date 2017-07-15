// @flow
type Callback = () => void;

export class LazyLoader {
  static options = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '10px',
  };

  map: WeakMap<Element, Callback>;
  io: IntersectionObserver;

  constructor() {
    this.map = new WeakMap()
    this.io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const {isIntersecting, target} = entry
        const callback = this.map.get(target)

        if (callback && isIntersecting) {
          this.unobserve(target)
          callback()
        }
      }
    }, LazyLoader.options)
  }

  observe(target: Element, callback: Callback) {
    this.map.set(target, callback)
    this.io.observe(target)
  }

  unobserve(target: Element) {
    this.map.delete(target)
    this.io.unobserve(target)
  }
}

export default new LazyLoader()
