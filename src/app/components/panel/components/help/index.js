'use strict';

/* global GM_info */

require('./index.less');

var keys = require('keys');

module.exports = {
  className: 'pv-help',
  template: require('./template.html'),
  data: { map: {} },
  created: function created() {
    this.name = GM_info.script.name;
    this.version = GM_info.script.version;
  },
  attached: function attached() {
    this.map = keys.getMap();
  }
};
