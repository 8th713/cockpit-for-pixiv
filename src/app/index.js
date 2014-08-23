'use strict';

/* global GM_info */

var api = require('api'),
    keys = require('keys'),
    utils = require('utils'),
    Cache = utils.Cache,
    Vue = require('vue');

var page = {
  SELECTORS: [
    'a[href*="ranking.php"] img[src*="/img/"]',
    'a[href*="member_illust.php"] img[src*="/img/"]',
    'a[href*="member_event.php"] img[src*="/img/"]'
  ].join(),
  matches: (function() {
    var p = window.Element.prototype;
    return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector);
  })(),
  init: function init() {
    document.body.addEventListener('click', function handler(evt) {
      if (evt.button) { return; }

      var target = evt.target;

      if (page.matches.call(target, '.pv-bookmark img')) { return; }
      if (!page.matches.call(target, page.SELECTORS)) { return; }

      app.fetch(target);
      evt.stopPropagation();
      evt.preventDefault();
    });
  },
  getNext: function getNext(target, step) {
    var list = document.querySelectorAll(this.SELECTORS),
        last = list.length - 1,
        index　= [].indexOf.call(list, target) + step,
        result;

    if (index > last) {
      result = list[0];
    } else if (index < 0) {
      result = list[last];
    } else {
      result = list[index];
    }
    return result;
  },
  addScrollbar: function addScrollbar() {
    document.documentElement.classList.remove('no-scrollbar');
  },
  removeScrollbar: function addScrollbar() {
    document.documentElement.classList.add('no-scrollbar');
  },
  scroll: new utils.Scroll()
};

var STORAGE_KEY = 'ppv-config';

require('./index.less');

var app = module.exports = new Vue({
  template: require('./template.html'),
  replace: true,
  components: {
    toolbar: require('./components/toolbar'),
    panel: require('./components/panel'),
    view: require('./components/view')
  },
  data: {
    config: utils.store.get(STORAGE_KEY, {
      panel: null,
      fit: true,
      padding: 20,
      cacheSize: 10,
      version: GM_info.script.version
    }),
    state: 0,
    pix: null,
    STANDBY: 0,
    LOADING: 1,
    COMPLETE: 2,
    ERROR: 3,
    STORAGE_KEY: STORAGE_KEY
  },
  computed: {
    canShowPanel: function canShowPanel() {
      var panel = this.config.panel;
      return this.state === this.COMPLETE ||
             /^(help|configuration)$/.test(panel);
    }
  },
  methods: {
    fetch: function fetch(target) {
      this.$img = target;
      this.pix = {};
      this.state = this.LOADING;
      keys.disabled = false;

      var vm = this;
      page.scroll.to(target.y - window.innerHeight / 3, function() {
        api.get(target.src, vm.$cache).then(function(data) {
          vm.pix = data;
          vm.state = vm.COMPLETE;
          // console.log(vm);
        }).catch(function(err) {
          vm.pix = {};
          vm.state = vm.ERROR;
          console.error(err.message);
        });
      });
    },
    close: function close() {
      keys.disabled = true;
      this.state = this.STANDBY;
      this.pix = {};
      this.$img = null;
    }
  },
  created: function created() {
    page.init();
    this.$cache = new Cache(this.config.cacheSize);

    this.$on('app:move', function(step) {
      if (this.state === this.COMPLETE) {
        this.$broadcast('app:move', step);
      }
      if (this.state === this.ERROR) {
        this.$emit('app:skip', step);
      }
    });

    this.$on('app:skip', function(step) {
      if (this.state > this.LOADING) {
        this.fetch(page.getNext(this.$img, step));
      }
    });

    var loading;
    this.$on('pix:rate', function(score) {
      var vm = this;

      if (!loading) {
        loading = true;
        this.$broadcast('pix:rate:change', loading);
        api.invoke('rate', this.pix, score).then(function() {
          loading = false;
          vm.$broadcast('pix:rate:change', loading);
        });
      }
    });

    this.$on('pix:tweet', function() {
      if (this.state !== this.COMPLETE) { return; }

      var twitter = 'https://twitter.com/intent/tweet?text=%s&url=%s',
          url = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=',
          pix = this.pix,
          page = encodeURIComponent(url + pix.illust.id),
          text = encodeURIComponent(utils.format(
            '%s | %s #pixiv',
            pix.desc.title,
            pix.author.name)
          );

      utils.popup(utils.format(twitter, text, page), 550, 460);
    });
  },
  ready: function ready() {
    this.$watch('state', function(state) {
      if (state !== this.STANDBY) {
        page.removeScrollbar();
        return;
      }
      page.addScrollbar();
    });

    this.$watch('config', function(value) {
      utils.store.set(STORAGE_KEY, value);
    });

    this.$watch('config.cacheSize', function(value) {
      this.$cache.limit = value;
    });
  }
});

keys
.add({
  name: 'Next',
  handler: function() { app.$emit('app:move', 1); },
  cmbs: [
    keys.J,
    keys.Enter
  ]
})
.add({
  name: 'Prev',
  handler: function() { app.$emit('app:move', -1); },
  cmbs: [
    keys.K,
    [keys.Enter, keys.SHIFT]
  ]
})
.add({
  name: 'Skip next',
  handler: function() { app.$emit('app:skip', 1); },
  cmbs: [
    [keys.J,     keys.CTRL],
    [keys.Enter, keys.CTRL]
  ]
})
.add({
  name: 'Skip prev',
  handler: function() { app.$emit('app:skip', -1); },
  cmbs: [
    [keys.K,     keys.CTRL],
    [keys.Enter, keys.CTRL, keys.SHIFT]
  ]
})
.add({
  name: 'Scroll down',
  handler: function() { app.$broadcast('img:scroll', 200); },
  throttle: 190,
  cmbs: [keys.Space]
})
.add({
  name: 'Scroll up',
  handler: function() { app.$broadcast('img:scroll', -200); },
  throttle: 190,
  cmbs: [
    [keys.Space, keys.SHIFT]
  ]
})
.add({
  name: 'Resize',
  handler: function() { app.$broadcast('img:resize'); },
  cmbs: [keys.F]
})
.add({
  name: 'Rate',
  handler: function() { app.$emit('pix:rate', 10); },
  cmbs: [keys.S]
})
.add({
  name: 'Download',
  handler: function() { app.$broadcast('img:download'); },
  cmbs: [keys.D]
})
.add({
  name: 'Tweet',
  handler: function() { app.$emit('pix:tweet'); },
  cmbs: [keys.T]
})
.add({
  name: 'Toggle description',
  handler: function() { app.$broadcast('panel:change', 'description'); },
  cmbs: [keys.H]
})
.add({
  name: 'Toggle bookmark',
  handler: function() { app.$broadcast('panel:change', 'bookmark'); },
  cmbs: [keys.B]
})
.add({
  name: 'Toggle comments',
  handler: function() { app.$broadcast('panel:change', 'comments'); },
  cmbs: [keys.C]
})
.add({
  name: 'Toggle help',
  handler: function() { app.$broadcast('panel:change', 'help'); },
  cmbs: [
    [keys['/'], keys.SHIFT]
  ]
})
.init();
