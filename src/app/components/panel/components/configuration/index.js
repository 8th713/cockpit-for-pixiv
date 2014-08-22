'use strict';

require('./index.less');

var validateDirective = {
  isEmpty: true,
  sanitize: function sanitize() {
    var validity = this.validity;

    if (validity.rangeOverflow) {
      this.value = this.max;
    } else if (validity.rangeUnderflow) {
      this.value = this.min;
    } else if (validity.valueMissing) {
      this.value = this.min;
    }
  },
  bind: function bind() {
    this.el.addEventListener('input', this.sanitize);
  },
  unbind: function unbind() {
    this.el.removeEventListener('input', this.sanitize);
  }
};

module.exports = {
  className: 'pv-configuration',
  template: require('./template.html'),
  directives: {
    validate: validateDirective
  },
  methods: {
    removeConfig: function removeConfig() {
      var STORAGE_KEY = this.$get('STORAGE_KEY');

      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  }
};
