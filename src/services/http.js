'use strict';

var utils = require('utils'),
    forEach = utils.forEach;

module.exports = http;

function http(opts) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();

    req.open(opts.method, opts.url, true);

    if (opts.responseType) {
      req.responseType = opts.responseType;
    }

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(new Error(req.statusText));
    };

    // setTimeout(function() {
    //   req.send(opts.data);
    // }, 500);

    req.send(opts.data);
  });
}

http.get = function get(url, type) {
  return http({
    method: 'GET',
    url: url,
    responseType: type
  });
};

function data2form(obj) {
  if (obj instanceof HTMLFormElement) {
    return new FormData(obj);
  }

  var result = new FormData();

  forEach(obj, function(value, key) {
    result.append(key, value);
  });
  return result;
}

http.post = function post(url, data, type) {
  return http({
    method: 'POST',
    url: url,
    data: data2form(data),
    responseType: type
  });
};
