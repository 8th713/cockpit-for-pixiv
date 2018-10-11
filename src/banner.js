// ==UserScript==
// @name         cockpit for pixiv
// @version      <%= version %>
// @description  <%= description %>
// @author       <%= author %>
// @homepage     <%= homepage %>
// @supportURL   <%= bugs.url %>
// @license      <%= license %>
// @namespace    http://github.com/8th713
// @match        https://www.pixiv.net/*
// @exclude      https://www.pixiv.net/novel/*
// @exclude      https://www.pixiv.net/member_illust.php?mode*
// @grant        none
// ==/UserScript==

// prettier-ignore
const supportedSelectors = [
  // old style
  '._work',
  // new style
  '.bBzsEVG',
  // /bookmark_new_illust.php
  // /discovery
  '.gtm-thumbnail-link',
  // /discovery/users
  '.JY31BOE',
  // /showcase
  '._3zE7tZ-',
  // /howto
  '._3sroO25',
  // /contest
  '._work-modal-target:not(.title)',
  // /history.php
  '._history-item.show-detail',
  // /bookmark_new_illust.php
  // /search.php
  '._1wlaFo6',
  // /member.php
  '.kbZjQ32'
]; // Do not remove the semicolon!!
