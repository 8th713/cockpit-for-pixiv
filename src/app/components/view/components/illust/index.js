'use strict';

var utils = require('utils');

module.exports = {
  className: 'pv-illust',
  template: require('./template.html'),
  data: {
    done: false,
    fail: false
  },
  computed: {
    src: function src() {
      return this.pix.illust.path;
    },
    filename: function filename() {
      var pix = this.pix;

      return utils.format(
        '%s - %s%s',
        pix.author.name,
        pix.desc.title,
        pix.illust.path.slice(pix.illust.path.lastIndexOf('.'))
      );
    }
  },
  methods: {
    load: function load() {
      this.done = true;
      this.fail = false;
    },
    error: function error() {
      var illust = this.pix.illust;

      if (/_p0\.jpg/.test(illust.path)) {
        illust.path = illust.path.replace(/jpg$/, 'png');
        return;
      } else if (/_p0\.png/.test(illust.path)) {
        illust.path = illust.path.replace(/png$/, 'gif');
        return;
      }

      this.done = false;
      this.fail = true;
    }
  },
  created: function created() {
    var scroll = new utils.Scroll({
      el: this.$el,
      easing: 'linear',
      duration: 200
    });

    this.$on('app:move', function(step) {
      this.$root.$emit('app:skip', step);
    });

    this.$on('img:download', function() {
      utils.download(this.src, this.filename);
    });

    this.$on('img:scroll', function(value) {
      scroll.by(value);
    });
  }
};
