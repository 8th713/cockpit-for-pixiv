var through = require('through'),
    str2js = require('string-to-js'),
    Minimize = require('minimize'),
    minimize = new Minimize({
      empty: true,        // KEEP empty attributes
      cdata: true,        // KEEP CDATA from scripts
      comments: true,     // KEEP comments
      ssi: true,          // KEEP Server Side Includes (i.e. <!--#include virtual="../quote.txt" -->)
      conditionals: true, // KEEP conditional internet explorer comments
      spare: true,        // KEEP redundant attributes
      quotes: true        // KEEP arbitrary quotes
    });

module.exports = function htmlify(file) {
  if (!/\.html$/.test(file)) { return through(); }

  var buffer = '';

  function write(chunk) {
    buffer += chunk.toString();
  }

  function end() {
    var that = this;

    minimize.parse(buffer, function (err, data) {
      that.queue(str2js(data));
    });
    that.queue(null);
  }

  return through(write, end);
};
