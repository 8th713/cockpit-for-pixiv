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
const CP_SELECTORS = {
  /**! ビューで開く対象となる要素のセレクタ */
  INCLUDES: [
    'a[href*="member_illust.php"][href*="mode=medium"][href*="illust_id="]'
  ],
  /**! 誤動作する要素のセレクタ */
  EXCLUDES: [
    '._one-click-bookmark',
    '.thumbnail-menu',
    '.thumbnail-menu *'
  ]
  /**! セミコロンを削除しないでください！！ */
};
/**!
 * =============================
 * ここから下は編集禁止
 * =============================
 */
