"use strict";

define(["./Cartesian2", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./GeographicProjection", "./Math", "./Rectangle"], function (g, s, t, f, e, r, i, c, p) {
  "use strict";

  function o(e) {
    e = t(e, {}), this._ellipsoid = t(e.ellipsoid, r.WGS84), this._rectangle = t(e.rectangle, p.MAX_VALUE), this._projection = new i(this._ellipsoid), this._numberOfLevelZeroTilesX = t(e.numberOfLevelZeroTilesX, 2), this._numberOfLevelZeroTilesY = t(e.numberOfLevelZeroTilesY, 1);
  }

  return e(o.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    },
    rectangle: {
      get: function get() {
        return this._rectangle;
      }
    },
    projection: {
      get: function get() {
        return this._projection;
      }
    }
  }), o.prototype.getNumberOfXTilesAtLevel = function (e) {
    return this._numberOfLevelZeroTilesX << e;
  }, o.prototype.getNumberOfYTilesAtLevel = function (e) {
    return this._numberOfLevelZeroTilesY << e;
  }, o.prototype.rectangleToNativeRectangle = function (e, t) {
    s.defined("rectangle", e);
    var r = c.toDegrees(e.west),
        i = c.toDegrees(e.south),
        o = c.toDegrees(e.east),
        n = c.toDegrees(e.north);
    return f(t) ? (t.west = r, t.south = i, t.east = o, t.north = n, t) : new p(r, i, o, n);
  }, o.prototype.tileXYToNativeRectangle = function (e, t, r, i) {
    var o = this.tileXYToRectangle(e, t, r, i);
    return o.west = c.toDegrees(o.west), o.south = c.toDegrees(o.south), o.east = c.toDegrees(o.east), o.north = c.toDegrees(o.north), o;
  }, o.prototype.tileXYToRectangle = function (e, t, r, i) {
    var o = this._rectangle,
        n = this.getNumberOfXTilesAtLevel(r),
        s = this.getNumberOfYTilesAtLevel(r),
        l = o.width / n,
        u = e * l + o.west,
        h = (e + 1) * l + o.west,
        a = o.height / s,
        g = o.north - t * a,
        c = o.north - (t + 1) * a;
    return f(i) || (i = new p(u, c, h, g)), i.west = u, i.south = c, i.east = h, i.north = g, i;
  }, o.prototype.positionToTileXY = function (e, t, r) {
    var i = this._rectangle;

    if (p.contains(i, e)) {
      var o = this.getNumberOfXTilesAtLevel(t),
          n = this.getNumberOfYTilesAtLevel(t),
          s = i.width / o,
          l = i.height / n,
          u = e.longitude;
      i.east < i.west && (u += c.TWO_PI);
      var h = (u - i.west) / s | 0;
      o <= h && (h = o - 1);
      var a = (i.north - e.latitude) / l | 0;
      return (n <= a && (a = n - 1), f(r)) ? (r.x = h, r.y = a, r) : new g(h, a);
    }
  }, o;
});