// @flow
/*global $ */
export class ScrollBar {
  TOKEN = 'no-scrollbar';
  $scrollBar: JQuery;

  constructor() {
    this.$scrollBar = $('html')
  }

  show() {
    this.$scrollBar.removeClass(this.TOKEN)
  }

  hide(element: HTMLAnchorElement) {
    const top = $(element).offset().top
    const scrollTop = ~~(top - (window.innerHeight / 3))

    this.$scrollBar.addClass(this.TOKEN).animate({scrollTop}, 225)
  }
}

export default new ScrollBar()
