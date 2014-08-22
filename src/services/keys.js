'use strict';

var utils = require('utils');

var map = {
  'A': 65,
  'B': 66,
  'C': 67,
  'D': 68,
  'E': 69,
  'F': 70,
  'G': 71,
  'H': 72,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'M': 77,
  'N': 78,
  'O': 79,
  'P': 80,
  'Q': 81,
  'R': 82,
  'S': 83,
  'T': 84,
  'U': 85,
  'V': 86,
  'W': 87,
  'X': 88,
  'Y': 89,
  'Z': 90,
  'Enter': 13,
  'SHIFT': 16,
  'CTRL':  17,
  'ALT':   18,
  'Space': 32,
  '/':    191
};

map = utils.map(map, function(code, name) {
  return new Key(name, code);
});


/**
 * @param {String} name The key name.
 * @param {Number} code The key code.
 */
function Key(name, code) {
  this.name = name;
  this.code = code;
  map[name] = exports[name] = this;
}

/**
 * @param {Number} code The keyCode.
 * @returns {Key|null} The Key instance with matched to received code.
 */
Key.fromCode = function fromCode(code) {
  var name;

  for (name in map) {
    if (map[name].code === code) {
      return map[name];
    }
  }
  return null;
};

exports.Key = Key;

/**
 * @param {Key}         primary   The primary key.
 * @param {Array.<Key>} modifiers The modifier keys.
 */
function Cmb(primary, modifiers) {
  this.primary = primary;

  if (arguments.length === 2) {
    this.ctrl  = utils.contains(modifiers, exports.CTRL);
    this.alt   = utils.contains(modifiers, exports.ALT);
    this.shift = utils.contains(modifiers, exports.SHIFT);
  } else {
    this.ctrl  = false;
    this.alt   = false;
    this.shift = false;
  }
}

Cmb.prototype.equal = function equal(cmb) {
  return this.toString() === cmb.toString();
};

Cmb.prototype.toString = function() {
  return JSON.stringify(this);
};

Cmb.prototype.toText = function() {
  var name = this.primary.name,
      shift = this.shift;

  if (name === '/' && shift) {
    name = '?';
    shift = false;
  }

  return {
    key: name,
    modifiers: {
      Shift: shift,
      Ctrl:  this.ctrl,
      Alt:   this.alt
    }
  };
};

/**
 * @param {Array.<Key>} arr
 * @returns {Cmb} The new Cmb of the created from arguments.
 */
Cmb.fromKeys = function fromKeys(arr) {
  var primary = arr[0],
      modifiers = arr.slice(1);

  if (!Array.isArray(modifiers)) {
    modifiers = [modifiers];
  }

  return new Cmb(primary, modifiers);
};

/**
 * @param {KeyboardEvent} evt
 * @returns {Cmb} The new Cmb.
 */
Cmb.fromEvent = function fromEvent(evt) {
  var primary = Key.fromCode(evt.keyCode), modifiers = [];

  if (!primary) { return null; }
  if (evt.ctrlKey)  { modifiers.push(exports.CTRL);  }
  if (evt.altKey)   { modifiers.push(exports.ALT);   }
  if (evt.shiftKey) { modifiers.push(exports.SHIFT); }

  return modifiers.length ? new Cmb(primary, modifiers) : new Cmb(primary);
};

exports.Cmb = Cmb;

var keyMap = exports.keyMap = {
  up: [],
  down: []
};

/**
 * @example
 * var keys = require('keys');
 *
 * keys.add({
 *   name: 'next',
 *   handler: function(evt) {console.log(evt);},
 *   cmbs: [keys.Enter, keys.J]
 * });
 *
 * keys.add({
 *   name: 'prev',
 *   handler: function(evt) {console.log(evt);},
 *   cmbs: [
 *     [keys.Enter, keys.CTRL, keys.SHIFT],
 *     [keys.K,     keys.CTRL]
 *   ]
 * });
 */
exports.add = function add(entry) {
  entry.cmbs = entry.cmbs.map(function(keys) {
    if (Array.isArray(keys)) {
      return Cmb.fromKeys(keys);
    }
    return Cmb.fromKeys([keys]);
  });

  entry.handler = utils.throttle(entry.handler, entry.throttle || 33);

  if (entry.keyup) {
    keyMap.up.push(entry);
  } else {
    keyMap.down.push(entry);
  }
  return this;
};

exports.getMap = function getMap() {
  var all = keyMap.down.concat(keyMap.up);

  all = all.map(function(entry) {
    return {
      name: entry.name,
      keyup: entry.keyup,
      keys: entry.cmbs.map(function(cmb) {
        return cmb.toText();
      })
    };
  });

  return all;
};

var ignored = ['INPUT', 'TEXTAREA', 'SELECT'];

function handler(evt) {
  if (exports.disabled || utils.contains(ignored, evt.target.nodeName)) { return; }

  var cmb = Cmb.fromEvent(evt);

  if (!cmb) { return; }

  var map = evt.type === 'keyup' ? keyMap.up : keyMap.down,
      entry = find(map, cmb);

  if (entry) {
    evt.stopPropagation();
    evt.preventDefault();
    entry.handler.call(this, evt);
  }
}

function find(map, cmb) {
  var i = 0, l = map.length, opts,
      k, n;

  for (; i < l; i++) {
    opts = map[i];

    for (k = 0, n = opts.cmbs.length; k < n; k++) {
      if (cmb.equal(opts.cmbs[k])) {
        return opts;
      }
    }
  }
  return null;
}

exports.init = function init(enabled) {
  document.addEventListener('keydown', handler);
  document.addEventListener('keyup', handler);
  this.disabled = !enabled;
};
