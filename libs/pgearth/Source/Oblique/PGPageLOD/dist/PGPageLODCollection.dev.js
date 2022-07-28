"use strict";

define(["../../Core/createGuid", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "./PGELoadStatus"], function (t, s, r, e, o, i, n) {
  "use strict";

  function a(e) {
    e = s(e, s.EMPTY_OBJECT), this._pageLODs = [], this._guid = t(), this.show = s(e.show, !0), this.destroyPrimitives = s(e.destroyPrimitives, !0);
  }

  function p(e, t) {
    return e._pageLODs.indexOf(t);
  }

  function h(e, t) {
    return 0 === t._distanceToCamera && 0 === e._distanceToCamera ? 0 : e._distanceToCamera - t._distanceToCamera;
  }

  return e(a.prototype, {
    length: {
      get: function get() {
        return this._pageLODs.length;
      }
    }
  }), a.prototype.add = function (e) {
    var t = e._external = e._external || {};
    return (t._composites = t._composites || {})[this._guid] = {
      collection: this
    }, this._pageLODs.push(e), e;
  }, a.prototype.remove = function (e) {
    if (this.contains(e)) {
      var t = this._pageLODs.indexOf(e);

      if (-1 !== t) return this._pageLODs.splice(t, 1), delete e._external._composites[this._guid], this.destroyPrimitives && e.destroy(), !0;
    }

    return !1;
  }, a.prototype.removeAndDestroy = function (e) {
    var t = this.remove(e);
    return t && !this.destroyPrimitives && e.destroy(), t;
  }, a.prototype.removeAll = function () {
    if (this.destroyPrimitives) for (var e = this._pageLODs, t = e.length, s = 0; s < t; ++s) {
      e[s].destroy();
    }
    this._pageLODs = [];
  }, a.prototype.contains = function (e) {
    return !!(r(e) && e._external && e._external._composites && e._external._composites[this._guid]);
  }, a.prototype.raise = function (e) {
    var t, s, o;
    !r(e) || (t = p(this, e)) !== (s = this._pageLODs).length - 1 && (o = s[t], s[t] = s[t + 1], s[t + 1] = o);
  }, a.prototype.raiseToTop = function (e) {
    var t, s;
    !r(e) || (t = p(this, e)) !== (s = this._pageLODs).length - 1 && (s.splice(t, 1), s.push(e));
  }, a.prototype.lower = function (e) {
    var t, s, o;
    r(e) && (t = p(this, e), s = this._pageLODs, 0 !== t && (o = s[t], s[t] = s[t - 1], s[t - 1] = o));
  }, a.prototype.lowerToBottom = function (e) {
    var t, s;
    r(e) && (t = p(this, e), s = this._pageLODs, 0 !== t && (s.splice(t, 1), s.unshift(e)));
  }, a.prototype.get = function (e) {
    return this._pageLODs[e];
  }, a.prototype.update = function (e) {
    if (this.show) {
      e.totalMemoryUsageInBytes = 0;

      for (var t = [], s = this._pageLODs, o = 0; o < s.length; ++o) {
        t.push(s[o]);
      }

      t.sort(h), e._selectedTiles = [];

      for (var o = 0, r = t.length; o < r; o++) {
        t[o].update(e);
      }

      e._selectedTiles.sort(h);

      for (o = 0, r = e._selectedTiles.length; o < r; o++) {
        e._selectedTiles[o].getLoadStatus() == n.PG_UNLOAD && e._selectedTiles[o].netLoad(e);
      }

      for (o = 0, r = e._selectedTiles.length; o < r; o++) {
        e._selectedTiles[o].update(e);
      }

      for (o = 0, r = t.length; o < r; o++) {
        e.totalMemoryUsageInBytes > e.maximumMemoryUsage && t[r - o - 1].release(e);
      }
    }
  }, a.prototype.isDestroyed = function () {
    return !1;
  }, a.prototype.destroy = function () {
    return this.removeAll(), o(this);
  }, a;
});