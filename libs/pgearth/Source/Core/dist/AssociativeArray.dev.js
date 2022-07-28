"use strict";

define(["./defined", "./defineProperties", "./DeveloperError"], function (i, e, o) {
  "use strict";

  function t() {
    this._array = [], this._hash = {};
  }

  return e(t.prototype, {
    length: {
      get: function get() {
        return this._array.length;
      }
    },
    values: {
      get: function get() {
        return this._array;
      }
    }
  }), t.prototype.contains = function (e) {
    if ("string" != typeof e && "number" != typeof e) throw new o("key is required to be a string or number.");
    return i(this._hash[e]);
  }, t.prototype.set = function (e, t) {
    if ("string" != typeof e && "number" != typeof e) throw new o("key is required to be a string or number.");
    t !== this._hash[e] && (this.remove(e), this._hash[e] = t, this._array.push(t));
  }, t.prototype.get = function (e) {
    if ("string" != typeof e && "number" != typeof e) throw new o("key is required to be a string or number.");
    return this._hash[e];
  }, t.prototype.remove = function (e) {
    if (i(e) && "string" != typeof e && "number" != typeof e) throw new o("key is required to be a string or number.");
    var t,
        r = this._hash[e],
        n = i(r);
    return n && ((t = this._array).splice(t.indexOf(r), 1), delete this._hash[e]), n;
  }, t.prototype.removeAll = function () {
    var e = this._array;
    0 < e.length && (this._hash = {}, e.length = 0);
  }, t;
});