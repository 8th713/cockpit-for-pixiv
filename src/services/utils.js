'use strict';

var slice = [].slice,
    arrryEach = [].forEach;

exports.log = console.log.bind(console);

function forEach(obj, iterator, ctx) {
  if (!obj) { return; }

  if ('length' in obj) {
    arrryEach.call(obj, iterator, ctx);
    return;
  }

  Object.keys(obj).forEach(function(key) {
    iterator.call(ctx, obj[key], key, obj);
  });
}

exports.forEach = forEach;

exports.map = function map(obj, iterator, ctx) {
  if ('length' in obj) {
    return [].map.call(obj, iterator, ctx);
  }

  var newObj = {};
  forEach(obj, function(value, key, org) {
    newObj[key] = iterator.call(ctx, value, key, org);
  });

  return newObj;
};

exports.find = function find(obj, iterator, ctx) {
  var index = -1;

  if ('length' in obj) {
    index = -1;
    while (++index < obj.length) {
      if (iterator.call(ctx, obj[index], index, obj)) {
        return obj[index];
      }
    }
  } else {
    for (index in obj) {
      if (iterator.call(ctx, obj[index], index, obj)) {
        return obj[index];
      }
    }
  }
  return undefined;
};

exports.contains = function contains(obj, value) {
  if ('length' in obj) {
    return [].indexOf.call(obj, value) > -1;
  }

  var key;
  for (key in obj) {
    if (obj[key] === value) {
      return true;
    }
  }
  return false;
};

function extend(dst) {
  var args = slice.call(arguments, 1);

  forEach(args, function(src) {
    forEach(src, function(value, key) {
      dst[key] = value;
    });
  });
  return dst;
}

exports.extend  = extend;

exports.jsonParse = function jsonParse(src) {
  var data;

  src = src.replace(/'/g, '"');
  try {
    data = JSON.parse(src);
  } catch(err) {
    data = err;
  }

  return data;
};

exports.throttle = function throttle(func, wait, ctx) {
  var isThrottled = false,
      duration = wait || 24;

  function reset() { isThrottled = false; }

  return function() {
    if (isThrottled) { return; }
    isThrottled = true;
    setTimeout(reset, duration);
    func.apply(ctx || this, arguments);
  };
};

exports.debounce = function debounce(func, wait, ctx) {
  var timeout;

  return function() {
    var args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      func.apply(ctx, args);
    }, wait || 200);
  };
};

function format(str) {
  var args = slice.call(arguments, 1);

  return str.replace(/%s/g, function () {
    return args.shift();
  });
}

exports.format = format;

exports.download = function download(url, name) {
  var dummy;

  dummy = document.createElement('a');
  dummy.download = name;
  dummy.href = url;
  dummy.dispatchEvent(new Event('click'));
};

exports.ensureReady = function ensureReady(vm, cb, ctx) {
  if (!vm.$compiler.init) { return cb.call(ctx); }

  vm.$once('hook:ready', function() {
    cb.call(ctx);
  });
};

exports.ensureAttached = function ensureAttached(vm, cb, ctx) {
  if (!vm.$compiler.init) { return cb.call(ctx); }

  vm.$once('hook:attached', function() {
    cb.call(ctx);
  });
};

exports.popup = function popup(url, width, height) {
  width = width || 550;
  height = height || 450;

  var tmpl = 'left=%s,top=%s,width=%s,height=%s,personalbar=0,toolbar=0,scrollbars=0,resizable=1',
      center = {x: screen.width / 2, y: screen.height / 2},
      left = Math.round(center.x - width / 2),
      top  = Math.round(center.y - height / 2) - 40;

  top = top < 0 ? 0 : top;

  return window.open(url, '', format(tmpl, left, top, width, height));
};

exports.store  = require('./utils/store');
exports.store.set = exports.debounce(exports.store.set);
exports.Scroll = require('./utils/scroll');
exports.Cache  = require('./utils/cache');
