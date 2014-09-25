'use strict';

var utils = require('utils'),
    map = utils.map,
    Dq = require('./dq');

module.exports = scrape;

var SCORE  = /^あなたの評価 (\d+)点.*$/,
    ANSWER = /^.+「(.+)」.+$/,
    PAGE   = /漫画 (\d+)P/,
    NEW_URL_PATTERN = /^\/c\/600x600\/img-master/;

var a = document.createElement('a');

function parseUrl(src) {
  a.href = src;

  var path = a.pathname;
  var prefix = a.origin;
  var suffix = path.slice(path.lastIndexOf('.'));

  if (NEW_URL_PATTERN.test(path)) {
    prefix += path.replace(NEW_URL_PATTERN, '/img-original');
    prefix = prefix.slice(0, prefix.lastIndexOf('/') + 1);
    suffix = '_p0' + suffix;
  } else {
    prefix += path.slice(0, path.lastIndexOf('/') + 1);
  }

  return {
    prefix: prefix,
    suffix: suffix,
    cache: a.search
  };
}

function createIllust(doc, ctx) {
  var obj = {},
      page = PAGE.exec(doc.text('.meta')),
      url;

  if (ctx.ugokuIllustData) {
    obj.ugokuIllustData = ctx.ugokuIllustData;
    obj.ugokuIllustFullscreenData = ctx.ugokuIllustFullscreenData;
  } else {
    url = doc.get('.works_display img', 'src');
    url = parseUrl(url);
    obj.prefix = url.prefix + ctx.illustId;
    obj.suffix = url.suffix;
    obj.cache  = url.cache;
  }

  obj.bookmark = doc.has('.bookmark-container>.button-on');
  obj.id = ctx.illustId;
  obj.size = ctx.illustSize;
  obj.length = page ? +page[1] : 0;
  obj.type = ctx.ugokuIllustFullscreenData ? 'ugoku' :
             !!page ? 'comic' : 'illust';

  return obj;
}

function getStats(answer, doc) {
  var ths = doc.$$('.questionnaire>.stats>table>tbody>tr>th');

  return map(ths, function el2stat(th, index) {
    var span = th.nextSibling.firstChild;
    var name = th.textContent;

    return {
      id: index + 1,
      name: name,
      count: +span.textContent,
      active: answer === name
    };
  });
}

function createRate(doc, ctx) {
  var rate = {};

  rate.rtv = +doc.text('.view-count');  // 閲覧数
  rate.rtc = +doc.text('.rated-count'); // 評価回数
  rate.rtt = +doc.text('.score-count'); // 総合点

  rate.rated = ctx.rated;
  rate.score = rate.rated ? +doc.text('.result').replace(SCORE, '$1') : 0;
  rate.hasQuestionnaire = ctx.hasQuestionnaire;

  if (rate.hasQuestionnaire) {
    var answer = doc.text('.questionnaire>.toggle-stats').replace(ANSWER, '$1');

    rate.hasQuestionnaire = true;
    rate.question = doc.text('.questionnaire>.stats>h1'); // 質問
    rate.answered = !!answer;                             // 回答済みかどうか
    rate.stats    = getStats(answer, doc);                // 統計値
  } else {
    rate.hasQuestionnaire = false;
    rate.question = '';    // 質問
    rate.answered = false; // 回答済みかどうか
    rate.stats    = [];    // 統計値
  }

  return rate;
}

function scrape(resp) {
  var doc = new Dq(resp),
      context = doc.pixiv.context;

  return {
    self: context.self,
    token: context.token,
    illust: createIllust(doc, context),
    rate: createRate(doc, context),
    author: {
      id: context.userId,
      name: context.userName,
      favorite: context.favorite
    },
    desc: {
      title: context.illustTitle,
      meta: doc.outerHTML('.meta'),             // 投稿日|サイズ|ツール
      caption: doc.html('.work-info .caption'), // 概要
      tags: doc.html('.tags-container')         // タグリスト
    },
    comments: {
      body: doc.$('._comment-items').innerHTML,
      more: doc.has('.more-comment'),
      p: 1
    },
    user: doc.pixiv.user
  };
}
