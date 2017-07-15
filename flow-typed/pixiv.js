declare var colon: {
  ui: {
    Tag: {
      split(tags: string): string[],
      find(tag: string, tags: string[]): number,
    }
  },
  debounce<T>(func: T, wait: number): T
}

declare var pixiv: {
  context: {
    token: string,
  },
  user: {
    id: string,
    loggedIn: boolean,
  },
}
