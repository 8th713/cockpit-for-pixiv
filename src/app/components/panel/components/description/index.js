'use strict';

require('./index.less');

var api = require('api');

module.exports = {
  className: 'pv-description',
  template: require('./template.html'),
  data: {
    loading: false
  },
  created: function created() {
    this.$on('pix:rate:change', function(value) {
      this.loading = value;
    });
  },
  methods: {
    rate: function rate(score) {
      this.$dispatch('pix:rate', score);
    },
    answer: function answer(stat) {
      var vm = this;

      this.loading = true;
      api.invoke('answer', this.pix, stat).then(function() {
        vm.loading = false;
      });
    }
  }
};
