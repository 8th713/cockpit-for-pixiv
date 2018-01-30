import { ShareService } from '../types'

export class TwitterService implements ShareService {
  private readonly WIDTH = 700
  private readonly HEIGHT = 472

  private createUrl(text: string, link: string) {
    const url = new URL('https://twitter.com/intent/tweet')

    url.searchParams.set('text', text)
    url.searchParams.set('url', link)
    return url.toString()
  }

  private calcRect() {
    const center = {
      x: window.screen.width / 2,
      y: window.screen.height / 2
    }

    const left = Math.round(center.x - this.WIDTH / 2)
    let top = Math.round(center.y - this.HEIGHT / 2) - 40

    top = top < 0 ? 0 : top

    return {
      top,
      left,
      width: this.WIDTH,
      height: this.HEIGHT
    }
  }

  private normalizeOption(options: object) {
    return Object.keys(options)
      .map(key => {
        const value = options[key]

        return `${key}=${value}`
      })
      .join()
  }

  open(text: string, link: string) {
    const url = this.createUrl(text, link)
    const options = this.normalizeOption(this.calcRect())

    window.open(url, '', options)
  }
}
