"use strict";

define(["./Check", "./defaultValue", "./defined", "./defineProperties"], function (a, s, p, t) {
  "use strict";

  function e(t) {
    a.typeOf.object("options", t), a.defined("options.comparator", t.comparator), this._comparator = t.comparator, this._array = [], this._length = 0, this._maximumLength = void 0;
  }

  function f(t, e, r) {
    var n = t[e];
    t[e] = t[r], t[r] = n;
  }

  return t(e.prototype, {
    length: {
      get: function get() {
        return this._length;
      }
    },
    internalArray: {
      get: function get() {
        return this._array;
      }
    },
    maximumLength: {
      get: function get() {
        return this._maximumLength;
      },
      set: function set(t) {
        this._maximumLength = t, this._length > t && 0 < t && (this._length = t, this._array.length = t);
      }
    },
    comparator: {
      get: function get() {
        return this._comparator;
      }
    }
  }), e.prototype.reserve = function (t) {
    t = s(t, this._length), this._array.length = t;
  }, e.prototype.heapify = function (t) {
    t = s(t, 0);

    for (var e = this._length, r = this._comparator, n = this._array, i = -1, h = !0; h;) {
      var o = 2 * (t + 1),
          a = o - 1,
          i = a < e && r(n[a], n[t]) < 0 ? a : t;
      o < e && r(n[o], n[i]) < 0 && (i = o), i !== t ? (f(n, i, t), t = i) : h = !1;
    }
  }, e.prototype.resort = function () {
    for (var t = this._length, e = Math.ceil(t / 2); 0 <= e; --e) {
      this.heapify(e);
    }
  }, e.prototype.insert = function (t) {
    a.defined("element", t);
    var e,
        r = this._array,
        n = this._comparator,
        i = this._maximumLength,
        h = this._length++;

    for (h < r.length ? r[h] = t : r.push(t); 0 !== h;) {
      var o = Math.floor((h - 1) / 2);
      if (!(n(r[h], r[o]) < 0)) break;
      f(r, h, o), h = o;
    }

    return p(i) && this._length > i && (e = r[i], this._length = i), e;
  }, e.prototype.pop = function (t) {
    if (t = s(t, 0), 0 !== this._length) {
      a.typeOf.number.lessThan("index", t, this._length);
      var e = this._array,
          r = e[t];
      return f(e, t, --this._length), this.heapify(t), r;
    }
  }, e;
});