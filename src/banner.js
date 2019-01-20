/*
// ==UserScript==
// @name         cockpit for pixiv
// @description  Provide comfortable pixiv browsing.
// @version      <%= version %>
// @author       <%= author %>
// @homepage     <%= homepage %>
// @supportURL   <%= bugs.url %>
// @license      <%= license %>
// @namespace    http://github.com/8th713
// @match        https://www.pixiv.net/*
// @exclude      https://www.pixiv.net/novel/*
// @grant        none
// ==/UserScript==
*/

// prettier-ignore
const supportedSelectors = [
/**!
 * /member.php
 * /member_illust.php
 * /bookmark.php?id=xxx
 * /member_illust.php?mode=medium
 */
'a.sc-kkGfuU',

/**!
 * /search.php
 * /bookmark_new_illust.php
 * /discovery
 * /idea  (今日のお題新着)
 */
'a.PKslhVT',

/**!
 * /discovery/users
 */
'a._3dXyksb',

/**!
 * /howto
 */
'a.o8jYSOX',

/**!
 * /contest
 */
'a._work-modal-target:not(.title)',

/**!
 * /history.php
 */
'a._history-item.show-detail',
'a._history-related-item',

/**!
 * /  (フォロー新着作品,おすすめ作品)
 * /ranking.php
 * /bookmark.php
 * /new_illust.php
 * /tags.php  (全期間の人気イラスト,新着イラスト)
 * /stacc
 * /idea  (ユーザー企画,新着の企画目録)
 */
'a._work',

/**!
 * /tags.php  (週間の人気イラスト)
 */
'a.work'

/**!
 * Do not remove the semicolon!!
 */
];
