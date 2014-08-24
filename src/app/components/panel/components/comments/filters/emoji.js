'use strict';

var patterns = {
  normal:        101,
  surprise:      102,
  serious:       103,
  heaven:        104,
  happy:         105,
  excited:       106,
  sing:          107,
  cry:           108,
  normal2:       201,
  shame2:        202,
  love2:         203,
  interesting2:  204,
  blush2:        205,
  fire2:         206,
  angry2:        207,
  shine2:        208,
  panic2:        209,
  normal3:       301,
  satisfaction3: 302,
  surprise3:     303,
  smile3:        304,
  shock3:        305,
  gaze3:         306,
  wink3:         307,
  happy3:        308,
  excited3:      309,
  love3:         310,
  normal4:       401,
  surprise4:     402,
  serious4:      403,
  love4:         404,
  shine4:        405,
  sweat4:        406,
  shame4:        407,
  sleep4:        408,
  heart:         501,
  teardrop:      502,
  star:          503
};

module.exports = function emoji(text) {
  return text.trim().replace(/\s*?(\([^()]+\))/g, replaceCb).replace(/\s*?(:[^:]+:)/g, replaceCb);
};

function replaceCb(_, m) {
  var n, pattern;

  pattern = m.replace(/[():]/g, '');
  if (n = patterns[pattern]) {
    return '<img src="' + 'http://source.pixiv.net/common/images/emoji/' + n + '.png" width="28" height="28" class="emoji-text">';
  } else {
    return m;
  }
  return m;
}
