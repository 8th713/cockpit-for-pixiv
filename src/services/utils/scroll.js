'use strict';

var raf = window.requestAnimationFrame,
    caf = window.cancelAnimationFrame,
    performance = window.performance;

module.exports = Scroll;

function Scroll(opts) {
  var key;

  for (key in Scroll.defaults) {
    this[key] = Scroll.defaults[key];
  }

  opts = opts || {};
  for (key in opts) {
    this[key] = opts[key];
  }
}

Scroll.prototype.to = function to(end, done) {
  caf(this.afId);

  var that = this;
  var el = this.el,
      easing = Scroll.ease[this.easing],
      duration = this.duration,
      begin = performance.now(),
      start = el.scrollTop,
      distance = end - start;

  that.afId = raf(loop);

  done = (typeof done === 'function') ? done : function() {};

  function loop(now) {
    var elapsed = now - begin;

    el.scrollTop = easing(elapsed, start, distance, duration);
    if (duration < elapsed || el.scrollTop === end) {
      el.scrollTop = end;
      caf(that.afId);
      done();
      return;
    }
    that.afId = raf(loop);
  }
};

Scroll.prototype.by = function by(distance, done) {
  this.to(this.el.scrollTop + distance, done);
};

Scroll.defaults = {
  el: document.documentElement,
  duration: 300,
  easing: 'easeOutQuint'
};

Scroll.ease = {
  linear: function linear(t, b, c, d) {
    return c * t / d + b;
  },
  easeOutQuint: function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  }
};
