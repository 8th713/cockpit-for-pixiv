'use strict';

require('./index.less');

// this.panel =  app.config.panel
// this.fit   =  app.config.fit
// this.pix   =  app.pix
module.exports = {
  tagName: 'ul',
  className: 'pv-toolbar',
  template: require('./template.html'),
  created: function created() {
    this.$on('panel:change', function(type) {
      this.change(type);
    });

    this.$on('img:resize', function() {
      this.fit = !this.fit;
    });
  },
  methods: {
    change: function change(type) {
      if (this.panel === type) {
        this.panel = null;
      } else {
        this.panel = type;
      }
    },
    resize: function resize() {
      this.$emit('img:resize');
    },
    download: function download() {
      this.$root.$broadcast('img:download');
    },
    tweet: function tweet() {
      this.$dispatch('pix:tweet');
    }
  }
};
