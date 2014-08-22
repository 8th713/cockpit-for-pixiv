'use strict';

var utils = require('utils'),
    forEach = utils.forEach,
    jsonParse = utils.jsonParse,
    Vue = require('vue'),
    set = Vue.require('utils').set;

module.exports = Dq;

function extractData(arr) {
  var lines = [];

  forEach(arr, function extractPix(el) {
    var text = el.textContent.replace(/\s+/g, '');

    if (text.indexOf('pixiv.development') === 0) {
      lines.push(text);
    }
    if (text.indexOf('pixiv.user') === 0) {
      lines.push(text);
    }
    if (text.indexOf('pixiv.context') === 0) {
      lines.push(text);
    }
  });

  return lines.join('');
}

function Dq(doc) {
  this.$  = doc.querySelector.bind(doc);
  this.$$ = doc.querySelectorAll.bind(doc);
  this.parse();
}

var docProto = Dq.prototype;

docProto.parse = function parse() {
  var source = extractData(this.$$('script:not([type]):not([src])'));

  var lines = source.split(';');

  lines.forEach(function(str) {
    var splited = str.split('=');

    if (splited[0]) {
      set(this, splited[0], jsonParse(splited[1]));
    }
  }, this);
};

docProto.has = function has(selector) {
  return !!this.$(selector);
};

docProto.get = function get(selector, property) {
  var node = this.$(selector);

  return node ? node[property] : '';
};

docProto.text = function text(selector) {
  return this.get(selector, 'textContent');
};

docProto.html = function innerHTML(selector) {
  return this.get(selector, 'innerHTML');
};

docProto.outerHTML = function outerHTML(selector) {
  return this.get(selector, 'outerHTML');
};
