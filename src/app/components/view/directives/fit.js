'use strict';

var utils = require('utils'),
    debounce = utils.debounce;

function resize(el, value) {
  var parent = document.querySelector('.pv-view'),
      style = el.style,
      margin, vw, vh, ow, oh, bw, bh, by;

  margin = +el.dataset.padding;
  vw = parent.offsetWidth  - margin * 2;
  vh = parent.offsetHeight - margin * 2;
  ow = el.naturalWidth;
  oh = el.naturalHeight;
  by = 1;

  if (value) {
    bw = (vw < ow) ? vw / ow : 1;
    bh = (vh < oh) ? vh / oh : 1;
    by = (bw < bh) ? bw : bh;
    by = parseInt(by * 1000, 10) / 1000;
  }

  style.width  = ow * by + 'px';
  style.height = oh * by + 'px';
  el.parentNode.style.padding = margin + 'px';
}

module.exports = {
  bind: function() {
    var dir = this;

    function handler() {
      resize(dir.el, dir.value);
    }

    this.handler1 = handler;
    this.handler2 = debounce(handler, 200);

    this.el.addEventListener('load', this.handler1);
    window.addEventListener('resize', this.handler2);
    this.vm.$root.$watch('config.padding', this.handler2);
  },
  unbind: function() {
    this.el.removeEventListener('load', this.handler1);
    window.removeEventListener('resize', this.handler2);
    this.vm.$root.$unwatch('config.padding', this.handler2);
  },
  update: function(value) {
    resize(this.el, value);
  }
};
