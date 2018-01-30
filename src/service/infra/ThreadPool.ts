export const sleep = (wait: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, wait)
  })

export type Task<T> = () => Promise<T>

interface Delayed<T> {
  resolve: (value: Promise<T>) => void
  task: Task<T>
}

export class ThreadPool {
  private size: number
  private wait: number | void
  private queue: Delayed<any>[]

  constructor(size: number, wait?: number) {
    this.size = size
    this.wait = wait
    this.queue = []
  }

  private release = () => {
    this.size++

    if (this.queue.length) {
      const next = this.queue.shift()

      if (next) {
        next.resolve(this.submit(next.task))
      }
    }
  }

  submit<T>(task: Task<T>) {
    if (this.size) {
      this.size--

      const result = this.wait ? sleep(this.wait).then(task) : task()

      result.then(this.release, this.release)
      return result
    } else {
      return new Promise<T>(resolve => {
        this.queue.push({ resolve, task })
      })
    }
  }
}
