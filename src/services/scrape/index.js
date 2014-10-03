'use strict';

var utils = require('utils'),
    map = utils.map,
    Dq = require('./dq');

module.exports = scrape;

var SCORE  = /^あなたの評価 (\d+)点.*$/,
    ANSWER = /^.+「(.+)」.+$/,
    PAGE   = /複数枚投稿 (\d+)P/,
    NEW_URL_PATTERN = /\/c\/600x600\/img-master/;

var parser = {
  illust: function illust(src, id) {
    if (NEW_URL_PATTERN.test(src)) {
      // new
      // in:   http://{server}.pixiv.net/c/600x600/img-master/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p0_master1200.jpg
      // path: http://{server}.pixiv.net/img-original/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p0.jpg
      return {
        path: src
          .replace('/c/600x600/img-master', '/img-original')
          .replace('_master1200.jpg', '.jpg')
      };
    } else {
      // old
      // in:   http://{server}.pixiv.net/{unique}/img/{name}/{id}_m.jpg
      // path: http://{server}.pixiv.net/{unique}/img/{name}/{id}.jpg
      return {
        path: src.replace(id + '_m', id)
      };
    }
  },
  comic: function comic(src, id) {
    var label;

    if (NEW_URL_PATTERN.test(src)) {
      // new
      // in:     http://{server}.pixiv.net/c/600x600/img-master/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p0_master1200.jpg
      // path:   http://{server}.pixiv.net/c/1200x1200/img-master/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p{n}_master1200.jpg
      // thumbs: http://{server}.pixiv.net/c/128x128/img-master/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p{n}_square1200.jpg
      return {
        path: src
          .replace('600x600', '1200x1200')
          .replace(/_p\d+_/, '_p{n}_'),
        thumbs: src
          .replace('600x600', '128x128')
          .replace(/_p\d+_/, '_p{n}_')
          .replace('master1200', 'square1200')
      };
    } else {
      // old
      // in:     http://{server}.pixiv.net/{unique}/img/{name}/{id}_m.jpg
      // path:   http://{server}.pixiv.net/{unique}/img/{name}/{id}_p{n}.jpg
      // path:   http://{server}.pixiv.net/{unique}/img/{name}/{id}_big_p{n}.jpg
      // thumbs: http://{server}.pixiv.net/{unique}/img/{name}/mobile/{id}_128x128_p{n}.jpg
      label = (id < 11319936) ? '_p{n}' : '_big_p{n}';

      return {
        path: src
          .replace(id + '_m', id + label),
        thumbs: src
          .replace(id, 'mobile/' + id)
          .replace(id + '_m', id + '_128x128_p{n}')
          .replace(/\.(?:png|gif)/, '.jpg')
      };
    }
  }
};

function createIllust(doc, ctx) {
  var obj = {},
      page = PAGE.exec(doc.text('.meta')),
      url;

  obj.bookmark = doc.has('.bookmark-container>.button-on');
  obj.id = ctx.illustId;
  obj.size = ctx.illustSize;
  obj.length = page ? +page[1] : 0;
  obj.type = ctx.ugokuIllustFullscreenData ? 'ugoku' :
             !!page ? 'comic' : 'illust';

  if (obj.type === 'ugoku') {
    obj.ugokuIllustData = ctx.ugokuIllustData;
    obj.ugokuIllustFullscreenData = ctx.ugokuIllustFullscreenData;
  }
  if (obj.type === 'comic') {
    url = parser.comic(doc.get('.works_display img', 'src'), obj.id);
    obj.path   = url.path;
    obj.thumbs = url.thumbs;
  }
  if (obj.type === 'illust') {
    url = parser.illust(doc.get('.works_display img', 'src'), obj.id);
    obj.path = url.path;
  }

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
