type Task<T> = () => Promise<T>

interface Delayed<T> {
  resolve: (value: Promise<T>) => void
  task: Task<T>
}

export function createPool(size: number) {
  const queue: Delayed<any>[] = []

  function release() {
    size++

    if (queue.length) {
      const next = queue.shift()

      if (next) {
        next.resolve(execute(next.task))
      }
    }
  }

  function execute<T>(task: Task<T>) {
    if (size) {
      size--

      const result = task()

      result.then(release, release)
      return result
    } else {
      return new Promise<T>(resolve => {
        queue.push({ resolve, task })
      })
    }
  }

  return { execute }
}
