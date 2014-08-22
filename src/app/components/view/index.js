'use strict';

require('./index.less');

module.exports = {
  className: 'pv-view',
  template: require('./template.html'),
  replace: true,
  directives: {
    fit: require('./directives/fit')
  },
  components: {
    illust: require('./components/illust'),
    comic: require('./components/comic'),
    ugoku: require('./components/ugoku')
  },
  methods: {
    move: function move(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$root.$emit('app:skip', evt.shiftKey ? -1 : 1);
    },
    grab: function grab(evt) {
      var parent = evt.target.parentNode;

      this.$grabPoint = {
        x: evt.clientX,
        y: evt.clientY,
        left: parent.scrollLeft,
        top: parent.scrollTop
      };
    },
    drag: function drag(evt) {
      if (!evt.clientX && !evt.clientY) {
        return;
      }
      var parent = evt.target.parentNode,
          point = this.$grabPoint;

      parent.scrollLeft = point.left - (evt.clientX - point.x);
      parent.scrollTop  = point.top  - (evt.clientY - point.y);
    }
  }
};
