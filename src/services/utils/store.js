'use strict';

module.exports = {
  get: function get(key, defaults) {
    var src = localStorage.getItem(key),
        data;

    if (src) {
      try {
        data = JSON.parse(src);
        if (data.version !== defaults.version) {
          data = exports.map(defaults, function(value, key) {
            return (key in data) ? data[key] : value;
          });
        }
        data.version = defaults.version;
        return data;
      } catch(err) {
        data = defaults;
      }
      return data;
    }
    return defaults;
  },
  set: function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
