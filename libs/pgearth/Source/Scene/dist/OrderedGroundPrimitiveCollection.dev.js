"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Check", "../Core/DeveloperError", "./PrimitiveCollection"], function (n, s, t, e, l, o, c) {
  "use strict";

  function r() {
    this._length = 0, this._collections = {}, this._collectionsArray = [], this.show = !0;
  }

  return t(r.prototype, {
    length: {
      get: function get() {
        return this._length;
      }
    }
  }), r.prototype.add = function (t, e) {
    l.defined("primitive", t), s(e) && l.typeOf.number("zIndex", e), e = n(e, 0);
    var o = this._collections[e];

    if (!s(o)) {
      (o = new c({
        destroyPrimitives: !1
      }))._zIndex = e, this._collections[e] = o;

      for (var r = this._collectionsArray, i = 0; i < r.length && r[i]._zIndex < e;) {
        i++;
      }

      r.splice(i, 0, o);
    }

    return o.add(t), this._length++, t._zIndex = e, t;
  }, r.prototype.set = function (t, e) {
    return l.defined("primitive", t), l.typeOf.number("zIndex", e), e === t._zIndex || (this.remove(t, !0), this.add(t, e)), t;
  }, r.prototype.remove = function (t, e) {
    if (this.contains(t)) {
      var o = t._zIndex,
          r = this._collections[o],
          i = e ? r.remove(t) : r.removeAndDestroy(t);
      return i && this._length--, 0 === r.length && (this._collectionsArray.splice(this._collectionsArray.indexOf(r), 1), this._collections[o] = void 0, r.destroy()), i;
    }

    return !1;
  }, r.prototype.removeAll = function () {
    for (var t = this._collectionsArray, e = 0; e < t.length; e++) {
      var o = t[e];
      o.destroyPrimitives = !0, o.destroy();
    }

    this._collections = {}, this._collectionsArray = [], this._length = 0;
  }, r.prototype.contains = function (t) {
    if (!s(t)) return !1;
    var e = this._collections[t._zIndex];
    return s(e) && e.contains(t);
  }, r.prototype.update = function (t) {
    if (this.show) for (var e = this._collectionsArray, o = 0; o < e.length; o++) {
      e[o].update(t);
    }
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    return this.removeAll(), e(this);
  }, r;
});