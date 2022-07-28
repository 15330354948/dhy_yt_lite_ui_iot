"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Rectangle", "./QuadtreeTileLoadState", "./TileSelectionResult"], function (a, t, o, d, e, i) {
  "use strict";

  function l(t) {
    if (!a(t)) throw new o("options is required.");
    if (!a(t.x)) throw new o("options.x is required.");
    if (!a(t.y)) throw new o("options.y is required.");
    if (t.x < 0 || t.y < 0) throw new o("options.x and options.y must be greater than or equal to zero.");
    if (!a(t.level)) throw new o("options.level is required and must be greater than or equal to zero.");
    if (!a(t.tilingScheme)) throw new o("options.tilingScheme is required.");
    this._tilingScheme = t.tilingScheme, this._x = t.x, this._y = t.y, this._level = t.level, this._parent = t.parent, this._rectangle = this._tilingScheme.tileXYToRectangle(this._x, this._y, this._level), this._southwestChild = void 0, this._southeastChild = void 0, this._northwestChild = void 0, this._northeastChild = void 0, this.replacementPrevious = void 0, this.replacementNext = void 0, this._distance = 0, this._loadPriority = 0, this._customData = [], this._frameUpdated = void 0, this._lastSelectionResult = i.NONE, this._lastSelectionResultFrame = void 0, this._loadedCallbacks = {}, this.state = e.START, this.renderable = !1, this.upsampledFromParent = !1, this.data = void 0;
  }

  function h(t) {
    a(t) && t.freeResources();
  }

  return l.createLevelZeroTiles = function (t) {
    if (!a(t)) throw new o("tilingScheme is required.");

    for (var e = t.getNumberOfXTilesAtLevel(0), i = t.getNumberOfYTilesAtLevel(0), h = new Array(e * i), s = 0, r = 0; r < i; ++r) {
      for (var n = 0; n < e; ++n) {
        h[s++] = new l({
          tilingScheme: t,
          x: n,
          y: r,
          level: 0
        });
      }
    }

    return h;
  }, l.prototype._updateCustomData = function (t, e, i) {
    var h,
        s,
        r = this.customData;

    if (a(e) && a(i)) {
      for (r = r.filter(function (t) {
        return -1 === i.indexOf(t);
      }), this._customData = r, s = this._rectangle, l = 0; l < e.length; ++l) {
        h = e[l], d.contains(s, h.positionCartographic) && r.push(h);
      }

      this._frameUpdated = t;
    } else {
      var n = this._parent;

      if (a(n) && this._frameUpdated !== n._frameUpdated) {
        r.length = 0, s = this._rectangle;

        for (var o = n.customData, l = 0; l < o.length; ++l) {
          h = o[l], d.contains(s, h.positionCartographic) && r.push(h);
        }

        this._frameUpdated = n._frameUpdated;
      }
    }
  }, t(l.prototype, {
    tilingScheme: {
      get: function get() {
        return this._tilingScheme;
      }
    },
    x: {
      get: function get() {
        return this._x;
      }
    },
    y: {
      get: function get() {
        return this._y;
      }
    },
    level: {
      get: function get() {
        return this._level;
      }
    },
    parent: {
      get: function get() {
        return this._parent;
      }
    },
    rectangle: {
      get: function get() {
        return this._rectangle;
      }
    },
    children: {
      get: function get() {
        return [this.northwestChild, this.northeastChild, this.southwestChild, this.southeastChild];
      }
    },
    southwestChild: {
      get: function get() {
        return a(this._southwestChild) || (this._southwestChild = new l({
          tilingScheme: this.tilingScheme,
          x: 2 * this.x,
          y: 2 * this.y + 1,
          level: this.level + 1,
          parent: this
        })), this._southwestChild;
      }
    },
    southeastChild: {
      get: function get() {
        return a(this._southeastChild) || (this._southeastChild = new l({
          tilingScheme: this.tilingScheme,
          x: 2 * this.x + 1,
          y: 2 * this.y + 1,
          level: this.level + 1,
          parent: this
        })), this._southeastChild;
      }
    },
    northwestChild: {
      get: function get() {
        return a(this._northwestChild) || (this._northwestChild = new l({
          tilingScheme: this.tilingScheme,
          x: 2 * this.x,
          y: 2 * this.y,
          level: this.level + 1,
          parent: this
        })), this._northwestChild;
      }
    },
    northeastChild: {
      get: function get() {
        return a(this._northeastChild) || (this._northeastChild = new l({
          tilingScheme: this.tilingScheme,
          x: 2 * this.x + 1,
          y: 2 * this.y,
          level: this.level + 1,
          parent: this
        })), this._northeastChild;
      }
    },
    customData: {
      get: function get() {
        return this._customData;
      }
    },
    needsLoading: {
      get: function get() {
        return this.state < e.DONE;
      }
    },
    eligibleForUnloading: {
      get: function get() {
        var t = !0;
        return a(this.data) && (t = this.data.eligibleForUnloading, a(t) || (t = !0)), t;
      }
    }
  }), l.prototype.findLevelZeroTile = function (t, e, i) {
    var h = this.tilingScheme.getNumberOfXTilesAtLevel(0);
    if (e < 0 ? e += h : h <= e && (e -= h), !(i < 0 || i >= this.tilingScheme.getNumberOfYTilesAtLevel(0))) return t.filter(function (t) {
      return t.x === e && t.y === i;
    })[0];
  }, l.prototype.findTileToWest = function (t) {
    var e = this.parent;
    if (void 0 === e) return this.findLevelZeroTile(t, this.x - 1, this.y);
    if (e.southeastChild === this) return e.southwestChild;
    if (e.northeastChild === this) return e.northwestChild;
    var i = e.findTileToWest(t);
    return void 0 !== i ? e.southwestChild === this ? i.southeastChild : i.northeastChild : void 0;
  }, l.prototype.findTileToEast = function (t) {
    var e = this.parent;
    if (void 0 === e) return this.findLevelZeroTile(t, this.x + 1, this.y);
    if (e.southwestChild === this) return e.southeastChild;
    if (e.northwestChild === this) return e.northeastChild;
    var i = e.findTileToEast(t);
    return void 0 !== i ? e.southeastChild === this ? i.southwestChild : i.northwestChild : void 0;
  }, l.prototype.findTileToSouth = function (t) {
    var e = this.parent;
    if (void 0 === e) return this.findLevelZeroTile(t, this.x, this.y + 1);
    if (e.northwestChild === this) return e.southwestChild;
    if (e.northeastChild === this) return e.southeastChild;
    var i = e.findTileToSouth(t);
    return void 0 !== i ? e.southwestChild === this ? i.northwestChild : i.northeastChild : void 0;
  }, l.prototype.findTileToNorth = function (t) {
    var e = this.parent;
    if (void 0 === e) return this.findLevelZeroTile(t, this.x, this.y - 1);
    if (e.southwestChild === this) return e.northwestChild;
    if (e.southeastChild === this) return e.northeastChild;
    var i = e.findTileToNorth(t);
    return void 0 !== i ? e.northwestChild === this ? i.southwestChild : i.southeastChild : void 0;
  }, l.prototype.freeResources = function () {
    this.state = e.START, this.renderable = !1, this.upsampledFromParent = !1, a(this.data) && a(this.data.freeResources) && this.data.freeResources(), h(this._southwestChild), this._southwestChild = void 0, h(this._southeastChild), this._southeastChild = void 0, h(this._northwestChild), this._northwestChild = void 0, h(this._northeastChild), this._northeastChild = void 0;
  }, l;
});