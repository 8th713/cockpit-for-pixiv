'use strict';

require('./index.less');

var api = require('api');

module.exports = {
  className: 'pv-follow',
  template: require('./template.html'),
  data: {
    restrict: '0',
    loading: false
  },
  methods: {
    add: function add() {
      var vm = this;

      this.loading = true;
      api.invoke('follow', this.pix, this.restrict).then(function() {
        vm.loading = false;
      });
    },
    put: function put() {
      var vm = this;

      this.loading = true;
      api.invoke('refollow', this.pix, this.restrict).then(function() {
        vm.loading = false;
      });
    },
    del: function del() {
      var vm = this;

      this.loading = true;
      api.invoke('unfollow', this.pix).then(function() {
        vm.loading = false;
      });
    }
  }
};
