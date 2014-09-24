'use strict';

require('./index.less');

var api = require('api');

module.exports = {
  className: 'pv-bookmark',
  template: require('./template.html'),
  directives: {
    include: require('./directives/include')
  },
  data: {
    loading: false
  },
  methods: {
    update: function update(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var vm = this;

      this.loading = true;
      api.invoke('bookmark', this.pix, evt.target).then(function() {
        vm.loading = false;
        vm.$root.$broadcast('panel:change', 'bookmark');
      });
    }
  }
};
