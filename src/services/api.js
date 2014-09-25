'use strict';

var http = require('./http'),
    scrape = require('./scrape');

var SELF_1 =  '自分の作品です',
    SELF_2 =  '自分です',
    INVALID = '不正なデータです';

function throwError(msg) {
  return Promise.reject(new Error(msg));
}

function srcToId(src) {
  var result = /^.+\/(\d+)(?:.+)?\.(?:jpe?g|png|gif)/.exec(decodeURI(src));

  return result && result[1];
}

exports.get = function get(src, cache) {
  var URL = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=',
      id = srcToId(src), data;

  if (!id) { return throwError('id が取得できません'); }
  if (data = cache.get(id)) { return Promise.resolve(data); }

  return http.get(URL + id, 'document').then(function(resp) {
    var data = scrape(resp);
    cache.put(id, data);

    return data;
  });
};

exports.getBookmark = function getBookmark(id) {
  if (!id) { return throwError(INVALID); }

  var URL = 'http://www.pixiv.net/bookmark_add.php?type=illust&illust_id=';

  return http.get(URL + id, 'document').then(function(resp) {
    var body = resp.querySelector('.layout-body');

    return body || throwError(SELF_1);
  });
};

exports.bookmark = function bookmark(pix, form) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_1); }

  var URL = 'http://www.pixiv.net/bookmark_add.php';

  return http.post(URL, form).then(function(data) {
    if (data) {
      pix.illust.bookmark = true;
      return;
    }
    return throwError('ブックマークできませんでした');
  });
};

exports.getComments = function getComments(pix) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (!pix.comments.more) { return throwError('これ以上のコメントはありません'); }

  var URL = 'http://www.pixiv.net/rpc_comment_history.php', data;

  data = {
    i_id: pix.illust.id,
    u_id: pix.author.id,
    tt:   pix.token,
    p:    pix.comments.p + 1
  };

  return http.post(URL, data, 'json').then(function(resp) {
    if (resp.message === 'ok') {
      pix.comments.body += resp.body.html;
      pix.comments.more = resp.body.more;
      pix.comments.p++;
      return;
    }
    return throwError('コメントを取得できませんでした');
  });
};

exports.rate = function rate(pix, score) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_1); }
  if (pix.rate.rated) { return throwError('評価済みです'); }

  var URL = 'http://www.pixiv.net/rpc_rating.php', data;

  data = {
    mode: 'save',
    i_id: pix.illust.id,
    u_id: pix.user.id,
    qr:   +pix.rate.hasQuestionnaire,
    tt: pix.token,
    score: score
  };

  return http.post(URL, data, 'json').then(function(resp) {
    if (resp.score) {
      pix.rate.rtc += 1;
      pix.rate.rtt += score;
      pix.rate.score = score;
      pix.rate.rated = true;
      return;
    }
    return throwError('評価に失敗しました');
  });
};

exports.answer = function answer(pix, stat) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_1); }
  if (pix.rate.answered) { return throwError('回答済みです'); }

  var URL = 'http://www.pixiv.net/rpc_rating.php', data;

  data = {
    mode: 'save2',
    i_id: pix.illust.id,
    u_id: pix.user.id,
    qr:   +pix.rate.hasQuestionnaire,
    tt: pix.token,
    num:  stat.id
  };

  return http.post(URL, data, 'json').then(function(resp) {
    if ('keyword' in resp) {
      pix.rate.answered = true;
      stat.active = true;
      stat.count += 1;
      return;
    }
    return throwError('アンケートの回答に失敗しました');
  });
};

exports.follow = function follow(pix, restrict) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_2); }
  if (pix.author.favorite) { return throwError('フォロー済みです'); }

  var URL = 'http://www.pixiv.net/bookmark_add.php', data;

  data = {
    mode: 'add',
    type: 'user',
    user_id: pix.author.id,
    tt: pix.token,
    from_sid: '',
    restrict: restrict,
    left_column: 'OK'
  };

  return http.post(URL, data).then(function() {
    pix.author.favorite = true;
  });
};

exports.refollow = function refollow(pix, restrict) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_2); }
  if (!pix.author.favorite) { return throwError('フォローしていません'); }

  var URL = 'http://www.pixiv.net/bookmark_setting.php', data;

  data = {
    type: 'user',
    user_id: pix.author.id,
    tt: pix.token,
    from_sid: '',
    restrict: restrict,
    left_column: 'OK'
  };

  return http.post(URL, data).then(function() {
    pix.author.favorite = true;
  });
};

exports.unfollow = function unfollow(pix) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_2); }
  if (!pix.author.favorite) { return throwError('フォローしていません'); }

  var URL = 'http://www.pixiv.net/rpc_group_setting.php', data;

  data = {
    mode: 'del',
    type: 'bookuser',
    id: pix.author.id
  };

  return http.post(URL, data, 'json').then(function(resp) {
    if (resp.type === 'bookuser') {
      pix.author.favorite = true;
      return;
    }
    return throwError('フォロー解除に失敗しました');
  });
};

// always return a resolved promise.
exports.invoke = function invoke(method) {
  var args = [].slice.call(arguments, 1);

  return exports[method].apply(exports, args).catch(function(err) {
    console.error(err.message);
  });
};
