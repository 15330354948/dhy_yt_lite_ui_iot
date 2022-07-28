"use strict";

define(["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (d, c, s, a, h, e, n, r, p, i) {
  "use strict";

  function t(e, r, i, t) {
    r = a(r, 0), i = a(i, 0), t = a(t, 0), s.typeOf.number.greaterThanOrEquals("x", r, 0), s.typeOf.number.greaterThanOrEquals("y", i, 0), s.typeOf.number.greaterThanOrEquals("z", t, 0), e._radii = new d(r, i, t), e._radiiSquared = new d(r * r, i * i, t * t), e._radiiToTheFourth = new d(r * r * r * r, i * i * i * i, t * t * t * t), e._oneOverRadii = new d(0 === r ? 0 : 1 / r, 0 === i ? 0 : 1 / i, 0 === t ? 0 : 1 / t), e._oneOverRadiiSquared = new d(0 === r ? 0 : 1 / (r * r), 0 === i ? 0 : 1 / (i * i), 0 === t ? 0 : 1 / (t * t)), e._minimumRadius = Math.min(r, i, t), e._maximumRadius = Math.max(r, i, t), e._centerToleranceSquared = p.EPSILON1, 0 !== e._radiiSquared.z && (e._squaredXOverSquaredZ = e._radiiSquared.x / e._radiiSquared.z);
  }

  function o(e, r, i) {
    this._radii = void 0, this._radiiSquared = void 0, this._radiiToTheFourth = void 0, this._oneOverRadii = void 0, this._oneOverRadiiSquared = void 0, this._minimumRadius = void 0, this._maximumRadius = void 0, this._centerToleranceSquared = void 0, this._squaredXOverSquaredZ = void 0, t(this, e, r, i);
  }

  e(o.prototype, {
    radii: {
      get: function get() {
        return this._radii;
      }
    },
    radiiSquared: {
      get: function get() {
        return this._radiiSquared;
      }
    },
    radiiToTheFourth: {
      get: function get() {
        return this._radiiToTheFourth;
      }
    },
    oneOverRadii: {
      get: function get() {
        return this._oneOverRadii;
      }
    },
    oneOverRadiiSquared: {
      get: function get() {
        return this._oneOverRadiiSquared;
      }
    },
    minimumRadius: {
      get: function get() {
        return this._minimumRadius;
      }
    },
    maximumRadius: {
      get: function get() {
        return this._maximumRadius;
      }
    }
  }), o.clone = function (e, r) {
    if (h(e)) {
      var i = e._radii;
      return h(r) ? (d.clone(i, r._radii), d.clone(e._radiiSquared, r._radiiSquared), d.clone(e._radiiToTheFourth, r._radiiToTheFourth), d.clone(e._oneOverRadii, r._oneOverRadii), d.clone(e._oneOverRadiiSquared, r._oneOverRadiiSquared), r._minimumRadius = e._minimumRadius, r._maximumRadius = e._maximumRadius, r._centerToleranceSquared = e._centerToleranceSquared, r) : new o(i.x, i.y, i.z);
    }
  }, o.fromCartesian3 = function (e, r) {
    return h(r) || (r = new o()), h(e) && t(r, e.x, e.y, e.z), r;
  }, o.WGS84 = r(new o(6378137, 6378137, 6356752.314245179)), o.UNIT_SPHERE = r(new o(1, 1, 1)), o.MOON = r(new o(p.LUNAR_RADIUS, p.LUNAR_RADIUS, p.LUNAR_RADIUS)), o.prototype.clone = function (e) {
    return o.clone(this, e);
  }, o.packedLength = d.packedLength, o.pack = function (e, r, i) {
    return s.typeOf.object("value", e), s.defined("array", r), i = a(i, 0), d.pack(e._radii, r, i), r;
  }, o.unpack = function (e, r, i) {
    s.defined("array", e), r = a(r, 0);
    var t = d.unpack(e, r);
    return o.fromCartesian3(t, i);
  }, o.prototype.geocentricSurfaceNormal = d.normalize, o.prototype.geodeticSurfaceNormalCartographic = function (e, r) {
    s.typeOf.object("cartographic", e);
    var i = e.longitude,
        t = e.latitude,
        a = Math.cos(t),
        n = a * Math.cos(i),
        o = a * Math.sin(i),
        u = Math.sin(t);
    return h(r) || (r = new d()), r.x = n, r.y = o, r.z = u, d.normalize(r, r);
  }, o.prototype.geodeticSurfaceNormal = function (e, r) {
    return h(r) || (r = new d()), r = d.multiplyComponents(e, this._oneOverRadiiSquared, r), d.normalize(r, r);
  };
  var u = new d(),
      l = new d();
  o.prototype.cartographicToCartesian = function (e, r) {
    var i = u,
        t = l;
    this.geodeticSurfaceNormalCartographic(e, i), d.multiplyComponents(this._radiiSquared, i, t);
    var a = Math.sqrt(d.dot(i, t));
    return d.divideByScalar(t, a, t), d.multiplyByScalar(i, e.height, i), h(r) || (r = new d()), d.add(t, i, r);
  }, o.prototype.cartographicArrayToCartesianArray = function (e, r) {
    s.defined("cartographics", e);
    var i = e.length;
    h(r) ? r.length = i : r = new Array(i);

    for (var t = 0; t < i; t++) {
      r[t] = this.cartographicToCartesian(e[t], r[t]);
    }

    return r;
  };

  var m = new d(),
      f = new d(),
      _ = new d();

  return o.prototype.cartesianToCartographic = function (e, r) {
    var i = this.scaleToGeodeticSurface(e, f);

    if (h(i)) {
      var t = this.geodeticSurfaceNormal(i, m),
          a = d.subtract(e, i, _),
          n = Math.atan2(t.y, t.x),
          o = Math.asin(t.z),
          u = p.sign(d.dot(a, e)) * d.magnitude(a);
      return h(r) ? (r.longitude = n, r.latitude = o, r.height = u, r) : new c(n, o, u);
    }
  }, o.prototype.cartesianArrayToCartographicArray = function (e, r) {
    s.defined("cartesians", e);
    var i = e.length;
    h(r) ? r.length = i : r = new Array(i);

    for (var t = 0; t < i; ++t) {
      r[t] = this.cartesianToCartographic(e[t], r[t]);
    }

    return r;
  }, o.prototype.scaleToGeodeticSurface = function (e, r) {
    return i(e, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, r);
  }, o.prototype.scaleToGeocentricSurface = function (e, r) {
    s.typeOf.object("cartesian", e), h(r) || (r = new d());
    var i = e.x,
        t = e.y,
        a = e.z,
        n = this._oneOverRadiiSquared,
        o = 1 / Math.sqrt(i * i * n.x + t * t * n.y + a * a * n.z);
    return d.multiplyByScalar(e, o, r);
  }, o.prototype.transformPositionToScaledSpace = function (e, r) {
    return h(r) || (r = new d()), d.multiplyComponents(e, this._oneOverRadii, r);
  }, o.prototype.transformPositionFromScaledSpace = function (e, r) {
    return h(r) || (r = new d()), d.multiplyComponents(e, this._radii, r);
  }, o.prototype.equals = function (e) {
    return this === e || h(e) && d.equals(this._radii, e._radii);
  }, o.prototype.toString = function () {
    return this._radii.toString();
  }, o.prototype.getSurfaceNormalIntersectionWithZAxis = function (e, r, i) {
    if (s.typeOf.object("position", e), !p.equalsEpsilon(this._radii.x, this._radii.y, p.EPSILON15)) throw new n("Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)");
    s.typeOf.number.greaterThan("Ellipsoid.radii.z", this._radii.z, 0), r = a(r, 0);
    var t = this._squaredXOverSquaredZ;
    if (h(i) || (i = new d()), i.x = 0, i.y = 0, i.z = e.z * (1 - t), !(Math.abs(i.z) >= this._radii.z - r)) return i;
  }, o;
});