// @flow
/*global $ */
export class ScrollBar {
  TOKEN = 'no-scrollbar';
  $scrollBar: JQuery;
  $body: JQuery;

  constructor() {
    this.$scrollBar = $('html')
    this.$body = $('body')
  }

  show() {
    this.$scrollBar.removeClass(this.TOKEN)
  }

  hide(element: HTMLImageElement) {
    const scrollTop = ~~(element.y - (window.innerHeight / 3))

    this.$body.animate({scrollTop}, 225)
    this.$scrollBar.addClass(this.TOKEN)
  }
}

export default new ScrollBar()
