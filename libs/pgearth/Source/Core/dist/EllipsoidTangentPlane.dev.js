"use strict";

define(["./AxisAlignedBoundingBox", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./IntersectionTests", "./Matrix4", "./Plane", "./Ray", "./Transforms"], function (n, s, l, t, c, r, d, e, o, a, p, u, f, i, h) {
  "use strict";

  var g = new t();

  function x(t, e) {
    if (c.defined("origin", t), t = (e = r(e, a.WGS84)).scaleToGeodeticSurface(t), !d(t)) throw new o("origin must not be at the center of the ellipsoid.");
    var n = h.eastNorthUpToFixedFrame(t, e);
    this._ellipsoid = e, this._origin = t, this._xAxis = l.fromCartesian4(u.getColumn(n, 0, g)), this._yAxis = l.fromCartesian4(u.getColumn(n, 1, g));
    var i = l.fromCartesian4(u.getColumn(n, 2, g));
    this._plane = f.fromPointNormal(t, i);
  }

  e(x.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    },
    origin: {
      get: function get() {
        return this._origin;
      }
    },
    plane: {
      get: function get() {
        return this._plane;
      }
    },
    xAxis: {
      get: function get() {
        return this._xAxis;
      }
    },
    yAxis: {
      get: function get() {
        return this._yAxis;
      }
    },
    zAxis: {
      get: function get() {
        return this._plane.normal;
      }
    }
  });
  var y = new n();

  x.fromPoints = function (t, e) {
    return c.defined("cartesians", t), new x(n.fromPoints(t, y).center, e);
  };

  var _ = new i(),
      P = new l();

  x.prototype.projectPointOntoPlane = function (t, e) {
    c.defined("cartesian", t);
    var n = _;
    n.origin = t, l.normalize(t, n.direction);
    var i = p.rayPlane(n, this._plane, P);

    if (d(i) || (l.negate(n.direction, n.direction), i = p.rayPlane(n, this._plane, P)), d(i)) {
      var r = l.subtract(i, this._origin, i),
          o = l.dot(this._xAxis, r),
          a = l.dot(this._yAxis, r);
      return d(e) ? (e.x = o, e.y = a, e) : new s(o, a);
    }
  }, x.prototype.projectPointsOntoPlane = function (t, e) {
    c.defined("cartesians", t), d(e) || (e = []);

    for (var n = 0, i = t.length, r = 0; r < i; r++) {
      var o = this.projectPointOntoPlane(t[r], e[n]);
      d(o) && (e[n] = o, n++);
    }

    return e.length = n, e;
  }, x.prototype.projectPointToNearestOnPlane = function (t, e) {
    c.defined("cartesian", t), d(e) || (e = new s());
    var n = _;
    n.origin = t, l.clone(this._plane.normal, n.direction);
    var i = p.rayPlane(n, this._plane, P);
    d(i) || (l.negate(n.direction, n.direction), i = p.rayPlane(n, this._plane, P));
    var r = l.subtract(i, this._origin, i),
        o = l.dot(this._xAxis, r),
        a = l.dot(this._yAxis, r);
    return e.x = o, e.y = a, e;
  }, x.prototype.projectPointsToNearestOnPlane = function (t, e) {
    c.defined("cartesians", t), d(e) || (e = []);
    var n = t.length;
    e.length = n;

    for (var i = 0; i < n; i++) {
      e[i] = this.projectPointToNearestOnPlane(t[i], e[i]);
    }

    return e;
  };
  var v = new l();
  return x.prototype.projectPointOntoEllipsoid = function (t, e) {
    c.defined("cartesian", t), d(e) || (e = new l());
    var n = this._ellipsoid,
        i = this._origin,
        r = this._xAxis,
        o = this._yAxis,
        a = v;
    return l.multiplyByScalar(r, t.x, a), e = l.add(i, a, e), l.multiplyByScalar(o, t.y, a), l.add(e, a, e), n.scaleToGeocentricSurface(e, e), e;
  }, x.prototype.projectPointsOntoEllipsoid = function (t, e) {
    c.defined("cartesians", t);
    var n = t.length;
    d(e) ? e.length = n : e = new Array(n);

    for (var i = 0; i < n; ++i) {
      e[i] = this.projectPointOntoEllipsoid(t[i], e[i]);
    }

    return e;
  }, x;
});