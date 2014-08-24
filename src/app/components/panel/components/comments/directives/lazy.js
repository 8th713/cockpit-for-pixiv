'use strict';

var utils = require('utils'),
    throttle = utils.throttle,
    ensureAttached = utils.ensureAttached;

function isInView(el) {
  var rect = el.getBoundingClientRect();
  return el === document.elementFromPoint(rect.left, rect.top);
}

function draw(el) {
  el.src = el.dataset.src;
  el.classList.remove('ui-scroll-view');
}

module.exports = {
  load: function() {
    var l = this.items.length;

    this.items = this.items.filter(function(el) {
      return isInView(el) ? draw(el) : true;
    });

    if (l > this.items.length) {
      this.vm.$set(this.expression, this.el.firstElementChild.innerHTML);
    }
  },
  update: function(value) {
    if (value) {
      ensureAttached(this.vm, function() {
        this.items = [].slice.call(this.el.querySelectorAll('.ui-scroll-view'));
        this.load();
      }, this);
    }
  },
  bind: function() {
    this.items = [];
    this.handler = throttle(this.load, 33, this);
    this.el.addEventListener('scroll', this.handler);
    this.el.addEventListener('resize', this.handler);
  },
  unbind: function() {
    this.items = [];
    this.el.removeEventListener('scroll', this.handler);
    this.el.removeEventListener('resize', this.handler);
  }
};
