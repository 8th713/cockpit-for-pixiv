'use strict';

var utils = require('utils'),
    http = require('http'),
    UgokuIllustPlayer = window.pixiv.UgokuIllustPlayer;

require('./index.less');

module.exports = {
  className: 'pv-ugoku',
  template: require('./template.html'),
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
      var filename = this.filename;

      getBlobUrl(this.src).then(function(url) {
        utils.download(url, filename);
        window.URL.revokeObjectURL(url);
      });
    });

    this.$on('img:scroll', function(value) {
      scroll.by(value);
    });
  },
  ready: function ready() {
    var illust = this.pix.illust,
        ugokuIllustData = illust.ugokuIllustData,
        el = this.$el.querySelector('._ugoku-illust-player-container'),
        opts = {
          autoStart: true,
          maxWidth: 1920,
          maxHeight: 1080,
          fullscreenData: illust.ugokuIllustFullscreenData,
        };

    ugokuIllustData.size = UgokuIllustPlayer.size(illust.size);
    ugokuIllustData.originalSize = illust.size;

    this.$player = new UgokuIllustPlayer(el, ugokuIllustData, opts);
    this.paused = false;
    this.canFullscreen = ugokuIllustData.size[0] !== illust.size[0];
  },
  beforeDestroy: function beforeDestroy() {
    this.$player.dispose();
    delete this.$player;
  },
  computed: {
    src: function src() {
      return this.pix.illust.ugokuIllustFullscreenData.src;
    },
    filename: function filename() {
      var pix = this.pix;

      return utils.format('%s - %s%s', pix.author.name, pix.desc.title, '.zip');
    }
  },
  methods: {
    toggle: function toggle() {
      this.$player.toggle();
      this.paused = this.$player.paused;
    },
    stop: function stop() {
      this.$player.stop();
      this.paused = this.$player.paused;
    },
    fullscreen: function fullscreen() {
      this.$player.fullscreen();
    },
    cancel: function cancel(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }
};

function getBlobUrl(path) {
  return http.get(path, 'blob').then(function(blob) {
    return window.URL.createObjectURL(blob);
  });
}
