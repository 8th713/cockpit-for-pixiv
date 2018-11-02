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
// @grant        none
// ==/UserScript==

// prettier-ignore
const supportedSelectors = [
  // /member.php
  // /member_illust.php
  // /bookmark.php?id=xxx
  // /member_illust.php?mode=medium //
  'a.css-rrjzxd',

  // /search.php
  // /bookmark_new_illust.php
  // /discovery
  // /idea // 今日のお題新着
  'a._1wlaFo6',

  // /discovery/users
  'a.JY31BOE',

  // /howto
  'a._3sroO25',

  // /contest
  'a._work-modal-target:not(.title)',

  // /showcase
  'a._3zE7tZ-',

  // /history.php
  'a._history-item.show-detail',

  // / // フォロー新着作品,おすすめ作品
  // /ranking.php
  // /bookmark.php
  // /new_illust.php
  // /tags.php // 全期間の人気イラスト,新着イラスト
  // /stacc
  // /idea // ユーザー企画,新着の企画目録
  'a._work',

  // /tags.php // 週間の人気イラスト
  'a.work',
]; // Do not remove the semicolon!!
