'use strict';

var utils = require('utils');

require('./index.less');

module.exports = {
  className: 'pv-comic',
  template: require('./template.html'),
  data: {
    page: 0,
    done: false,
    fail: false,
    thumbsView: false
  },
  computed: {
    src: function src() {
      var illust = this.pix.illust;

      return illust.prefix + '_big_p' + this.page + illust.suffix + illust.cache;
    },
    thumbs: function thumbs() {
      var illust = this.pix.illust, arr = [],
          sub = '_128x128_p',
          prefix = illust.prefix.replace(illust.id, 'mobile/' + illust.id);

      for(var i = 0, l = illust.length; i < l; i++) {
        arr.push(prefix + sub + i + '.jpg' + illust.cache);
      }
      return arr;
    },
    filename: function filename() {
      var pix = this.pix;

      return utils.format(
        '%s - %s [%s-%s]%s',
        pix.author.name,
        pix.desc.title,
        this.page + 1,
        pix.illust.length,
        pix.illust.suffix
      );
    }
  },
  methods: {
    load: function load() {
      this.done = true;
      this.fail = false;
      this.thumbsView = false;
    },
    error: function error() {
      this.done = false;
      this.fail = true;
      this.thumbsView = false;
    },
    move: function move(evt) {
      var step = evt.shiftKey ? -1 : 1;

      evt.preventDefault();
      evt.stopPropagation();
      if (evt.ctrlKey) {
        this.$root.$emit('app:skip', step);
        return;
      }

      this.$emit('app:move', step);
    },
    select: function select(evt, page) {
      evt.preventDefault();
      evt.stopPropagation();

      if (this.page !== page) {
        this.page = page;
        return;
      }
      if (this.$done) {
        this.load();
      } else {
        this.error();
      }
    },
    showThumbs: function showThumbs(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$done = this.done;
      this.done = false;
      this.fail = false;
      this.thumbsView = true;
    }
  },
  created: function created() {
    var scroll = new utils.Scroll({
      el: this.$el,
      easing: 'linear',
      duration: 200
    });

    this.$on('app:move', function(step) {
      var next = this.page + step,
          length = this.pix.illust.length;

      if (0 <= next && next < length) {
        this.done = false;
        this.page = next;
        return;
      }

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
