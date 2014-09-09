'use strict';

module.exports = Cache;

function Cache(limit) {
  this.limit = limit || 10;
  this.size = 0;
  this.data = {};
  this.hash = {};
}

var CacheProto = Cache.prototype;

CacheProto.put = function put(key, value) {
  var entry = this.hash[key] || {key: key};

  this.hash[key] = entry;
  this._refresh(entry);
  if (!(key in this.data)){ this.size++; }
  this.data[key] = value;

  while (this.size > this.limit) {
    this._remove(this.staleEnd.key);
  }

  return value;
};

CacheProto.get = function get(key) {
  var entry = this.hash[key];

  if (!entry) { return; }

  this._refresh(entry);
  return this.data[key];
};

CacheProto._remove = function remove(key) {
  var entry = this.hash[key];

  if (!entry) { return; }
  if (entry == this.freshEnd) { this.freshEnd = entry.older; }
  if (entry == this.staleEnd) { this.staleEnd = entry.newer; }
  this._link(entry.newer, entry.older);

  delete this.hash[key];
  delete this.data[key];
  this.size--;
};

CacheProto._refresh = function refresh(entry) {
  if (entry !== this.freshEnd) {
    if (!this.staleEnd) {
      this.staleEnd = entry;
    } else if (this.staleEnd === entry) {
      this.staleEnd = entry.newer;
    }

    this._link(entry.newer, entry.older);
    this._link(entry, this.freshEnd);
    this.freshEnd = entry;
    this.freshEnd.newer = null;
  }
};

CacheProto._link = function link(newer, older) {
  if (newer !== older) {
    if (newer) { newer.older = older; }
    if (older) { older.newer = newer; }
  }
};
