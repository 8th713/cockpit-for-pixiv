'use strict';

require('./index.less');

module.exports = {
  className: 'pv-configuration',
  template: require('./template.html'),
  directives: {
    validate: require('./directives/validate')
  },
  methods: {
    removeConfig: function removeConfig() {
      var STORAGE_KEY = this.$get('STORAGE_KEY');

      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  }
};
