type Task<T> = () => Promise<T>

type Delayed<T> = {
  resolve: (value: Promise<T>) => void
  task: Task<T>
}

export const createPool = (size: number) => {
  const queue: Delayed<any>[] = []
  const release = () => {
    size++

    if (queue.length) {
      const next = queue.shift()

      if (next) next.resolve(execute(next.task))
    }
  }
  const execute = <T>(task: Task<T>) => {
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
