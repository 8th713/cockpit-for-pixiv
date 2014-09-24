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
      this.loading = true;
      api.invoke('follow', this.pix, this.restrict).then(this._always.bind(this));
    },
    put: function put() {
      this.loading = true;
      api.invoke('refollow', this.pix, this.restrict).then(this._always.bind(this));
    },
    del: function del() {
      this.loading = true;
      api.invoke('unfollow', this.pix).then(this._always.bind(this));
    },
    _always: function always() {
      this.loading = false;
      this.$root.$broadcast('panel:change', 'follow');
    }
  }
};
