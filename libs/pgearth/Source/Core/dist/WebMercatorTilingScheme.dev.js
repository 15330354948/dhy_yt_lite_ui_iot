"use strict";

define(["./Cartesian2", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./Rectangle", "./WebMercatorProjection"], function (c, s, g, e, i, p, o) {
  "use strict";

  function t(e) {
    var t;
    e = s(e, {}), this._ellipsoid = s(e.ellipsoid, i.WGS84), this._numberOfLevelZeroTilesX = s(e.numberOfLevelZeroTilesX, 1), this._numberOfLevelZeroTilesY = s(e.numberOfLevelZeroTilesY, 1), this._projection = new o(this._ellipsoid), g(e.rectangleSouthwestInMeters) && g(e.rectangleNortheastInMeters) ? (this._rectangleSouthwestInMeters = e.rectangleSouthwestInMeters, this._rectangleNortheastInMeters = e.rectangleNortheastInMeters) : (t = this._ellipsoid.maximumRadius * Math.PI, this._rectangleSouthwestInMeters = new c(-t, -t), this._rectangleNortheastInMeters = new c(t, t));

    var r = this._projection.unproject(this._rectangleSouthwestInMeters),
        n = this._projection.unproject(this._rectangleNortheastInMeters);

    this._rectangle = new p(r.longitude, r.latitude, n.longitude, n.latitude);
  }

  return e(t.prototype, {
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
  }), t.prototype.getNumberOfXTilesAtLevel = function (e) {
    return this._numberOfLevelZeroTilesX << e;
  }, t.prototype.getNumberOfYTilesAtLevel = function (e) {
    return this._numberOfLevelZeroTilesY << e;
  }, t.prototype.rectangleToNativeRectangle = function (e, t) {
    var r = this._projection,
        n = r.project(p.southwest(e)),
        s = r.project(p.northeast(e));
    return g(t) ? (t.west = n.x, t.south = n.y, t.east = s.x, t.north = s.y, t) : new p(n.x, n.y, s.x, s.y);
  }, t.prototype.tileXYToNativeRectangle = function (e, t, r, n) {
    var s = this.getNumberOfXTilesAtLevel(r),
        i = this.getNumberOfYTilesAtLevel(r),
        o = (this._rectangleNortheastInMeters.x - this._rectangleSouthwestInMeters.x) / s,
        l = this._rectangleSouthwestInMeters.x + e * o,
        h = this._rectangleSouthwestInMeters.x + (e + 1) * o,
        a = (this._rectangleNortheastInMeters.y - this._rectangleSouthwestInMeters.y) / i,
        u = this._rectangleNortheastInMeters.y - t * a,
        c = this._rectangleNortheastInMeters.y - (t + 1) * a;
    return g(n) ? (n.west = l, n.south = c, n.east = h, n.north = u, n) : new p(l, c, h, u);
  }, t.prototype.tileXYToRectangle = function (e, t, r, n) {
    var s = this.tileXYToNativeRectangle(e, t, r, n),
        i = this._projection,
        o = i.unproject(new c(s.west, s.south)),
        l = i.unproject(new c(s.east, s.north));
    return s.west = o.longitude, s.south = o.latitude, s.east = l.longitude, s.north = l.latitude, s;
  }, t.prototype.positionToTileXY = function (e, t, r) {
    var n = this._rectangle;

    if (p.contains(n, e)) {
      var s = this.getNumberOfXTilesAtLevel(t),
          i = this.getNumberOfYTilesAtLevel(t),
          o = (this._rectangleNortheastInMeters.x - this._rectangleSouthwestInMeters.x) / s,
          l = (this._rectangleNortheastInMeters.y - this._rectangleSouthwestInMeters.y) / i,
          h = this._projection.project(e),
          a = (h.x - this._rectangleSouthwestInMeters.x) / o | 0;

      s <= a && (a = s - 1);
      var u = (this._rectangleNortheastInMeters.y - h.y) / l | 0;
      return (i <= u && (u = i - 1), g(r)) ? (r.x = a, r.y = u, r) : new c(a, u);
    }
  }, t;
});