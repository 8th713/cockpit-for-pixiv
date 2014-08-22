'use strict';

require('./index.less');

var api = require('api');

module.exports = {
  className: 'pv-comments',
  template: require('./template.html'),
  directives: {
    lazy: require('./directives/lazy')
  },
  filters: {
    emoji: require('./filters/emoji')
  },
  data: {
    loading: false
  },
  methods: {
    getComments: function getComments() {
      var vm = this;

      this.loading = true;
      api.invoke('getComments', this.pix).then(function() {
        vm.loading = false;
      });
    }
  }
};
