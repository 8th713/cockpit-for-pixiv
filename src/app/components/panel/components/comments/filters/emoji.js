'use strict';

module.exports = function emoji(value) {
  return window.pixiv.emoji.replace(value);
};
