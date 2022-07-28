"use strict";

define(["./BoundingSphere", "./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Rectangle"], function (a, d, p, m, S, e, r) {
  "use strict";

  function i(e, i) {
    p.typeOf.object("ellipsoid", e), this._ellipsoid = e, this._cameraPosition = new d(), this._cameraPositionInScaledSpace = new d(), this._distanceToLimbInScaledSpaceSquared = 0, S(i) && (this.cameraPosition = i);
  }

  e(i.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    },
    cameraPosition: {
      get: function get() {
        return this._cameraPosition;
      },
      set: function set(e) {
        var i = this._ellipsoid.transformPositionToScaledSpace(e, this._cameraPositionInScaledSpace),
            t = d.magnitudeSquared(i) - 1;

        d.clone(e, this._cameraPosition), this._cameraPositionInScaledSpace = i, this._distanceToLimbInScaledSpaceSquared = t;
      }
    }
  });
  var c = new d();
  i.prototype.isPointVisible = function (e) {
    var i = this._ellipsoid.transformPositionToScaledSpace(e, c);

    return this.isScaledSpacePointVisible(i);
  }, i.prototype.isScaledSpacePointVisible = function (e) {
    var i = this._cameraPositionInScaledSpace,
        t = this._distanceToLimbInScaledSpaceSquared,
        n = d.subtract(e, i, c),
        o = -d.dot(n, i);
    return !(t < 0 ? 0 < o : t < o && o * o / d.magnitudeSquared(n) > t);
  }, i.prototype.computeHorizonCullingPoint = function (e, i, t) {
    p.typeOf.object("directionToPoint", e), p.defined("positions", i), S(t) || (t = new d());

    for (var n = this._ellipsoid, o = g(n, e), a = 0, r = 0, c = i.length; r < c; ++r) {
      var s = h(n, i[r], o),
          a = Math.max(a, s);
    }

    return P(o, a, t);
  };
  var f = new d();

  i.prototype.computeHorizonCullingPointFromVertices = function (e, i, t, n, o) {
    p.typeOf.object("directionToPoint", e), p.defined("vertices", i), p.typeOf.number("stride", t), S(o) || (o = new d()), n = m(n, d.ZERO);

    for (var a = this._ellipsoid, r = g(a, e), c = 0, s = 0, l = i.length; s < l; s += t) {
      f.x = i[s] + n.x, f.y = i[s + 1] + n.y, f.z = i[s + 2] + n.z;
      var u = h(a, f, r),
          c = Math.max(c, u);
    }

    return P(r, c, o);
  };

  var s = [];

  i.prototype.computeHorizonCullingPointFromRectangle = function (e, i, t) {
    p.typeOf.object("rectangle", e);
    var n = r.subsample(e, i, 0, s),
        o = a.fromPoints(n);
    if (!(d.magnitude(o.center) < .1 * i.minimumRadius)) return this.computeHorizonCullingPoint(o.center, n, t);
  };

  var l = new d(),
      u = new d();

  function h(e, i, t) {
    var n = e.transformPositionToScaledSpace(i, l),
        o = d.magnitudeSquared(n),
        a = Math.sqrt(o),
        r = d.divideByScalar(n, a, u),
        o = Math.max(1, o),
        c = 1 / (a = Math.max(1, a));
    return 1 / (d.dot(r, t) * c - d.magnitude(d.cross(r, t, r)) * (Math.sqrt(o - 1) * c));
  }

  function P(e, i, t) {
    if (!(i <= 0 || i === 1 / 0 || i != i)) return d.multiplyByScalar(e, i, t);
  }

  var t = new d();

  function g(e, i) {
    return d.equals(i, d.ZERO) ? i : (e.transformPositionToScaledSpace(i, t), d.normalize(t, t));
  }

  return i;
});