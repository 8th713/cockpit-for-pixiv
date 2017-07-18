// @flow
export class PopUp {
  open(url: string, width: number = 700, height: number = 472) {
    const center = {
      x: window.screen.width / 2,
      y: window.screen.height / 2
    }
    const left = Math.round(center.x - width / 2)
    let top = Math.round(center.y - height / 2) - 40
    top = top < 0 ? 0 : top
    const opts = `left=${left},top=${top},width=${width},height=${height}`
    return window.open(url, '', opts)
  }
}

export default new PopUp()
