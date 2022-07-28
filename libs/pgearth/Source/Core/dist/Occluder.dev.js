"use strict";

define(["./BoundingSphere", "./Cartesian3", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./Math", "./Rectangle", "./Visibility"], function (n, v, a, _, i, f, s, u, c, d) {
  "use strict";

  function z(i, t) {
    if (!_(i)) throw new f("occluderBoundingSphere is required.");
    if (!_(t)) throw new f("camera position is required.");
    this._occluderPosition = v.clone(i.center), this._occluderRadius = i.radius, this._horizonDistance = 0, this._horizonPlaneNormal = void 0, this._horizonPlanePosition = void 0, this._cameraPosition = void 0, this.cameraPosition = t;
  }

  var l = new v();
  i(z.prototype, {
    position: {
      get: function get() {
        return this._occluderPosition;
      }
    },
    radius: {
      get: function get() {
        return this._occluderRadius;
      }
    },
    cameraPosition: {
      set: function set(i) {
        if (!_(i)) throw new f("cameraPosition is required.");
        i = v.clone(i, this._cameraPosition);
        var t,
            r,
            e,
            o,
            n = v.subtract(this._occluderPosition, i, l),
            a = v.magnitudeSquared(n),
            s = this._occluderRadius * this._occluderRadius;
        s < a ? (t = Math.sqrt(a - s), a = 1 / Math.sqrt(a), r = v.multiplyByScalar(n, a, l), e = t * t * a, o = v.add(i, v.multiplyByScalar(r, e, l), l)) : t = Number.MAX_VALUE, this._horizonDistance = t, this._horizonPlaneNormal = r, this._horizonPlanePosition = o, this._cameraPosition = i;
      }
    }
  }), z.fromBoundingSphere = function (i, t, r) {
    if (!_(i)) throw new f("occluderBoundingSphere is required.");
    if (!_(t)) throw new f("camera position is required.");
    return _(r) ? (v.clone(i.center, r._occluderPosition), r._occluderRadius = i.radius, r.cameraPosition = t, r) : new z(i, t);
  };
  var h = new v();

  z.prototype.isPointVisible = function (i) {
    if (this._horizonDistance !== Number.MAX_VALUE) {
      var t = v.subtract(i, this._occluderPosition, h),
          r = this._occluderRadius;
      if (0 < (r = v.magnitudeSquared(t) - r * r)) return r = Math.sqrt(r) + this._horizonDistance, t = v.subtract(i, this._cameraPosition, t), r * r > v.magnitudeSquared(t);
    }

    return !1;
  };

  var m = new v();

  z.prototype.isBoundingSphereVisible = function (i) {
    var t = v.clone(i.center, m),
        r = i.radius;
    if (this._horizonDistance === Number.MAX_VALUE) return !1;
    var e = v.subtract(t, this._occluderPosition, h),
        o = this._occluderRadius - r,
        o = v.magnitudeSquared(e) - o * o;
    if (r < this._occluderRadius) return 0 < o && (o = Math.sqrt(o) + this._horizonDistance, e = v.subtract(t, this._cameraPosition, e), o * o + r * r > v.magnitudeSquared(e));

    if (0 < o) {
      e = v.subtract(t, this._cameraPosition, e);
      var n = v.magnitudeSquared(e),
          a = this._occluderRadius * this._occluderRadius,
          s = r * r;
      return (this._horizonDistance * this._horizonDistance + a) * s > n * a ? !0 : n < (o = Math.sqrt(o) + this._horizonDistance) * o + s;
    }

    return !0;
  };

  var P = new v();

  z.prototype.computeVisibility = function (i) {
    if (!_(i)) throw new f("occludeeBS is required.");
    var t = v.clone(i.center),
        r = i.radius;
    if (r > this._occluderRadius) return d.FULL;

    if (this._horizonDistance !== Number.MAX_VALUE) {
      var e = v.subtract(t, this._occluderPosition, P),
          o = this._occluderRadius - r,
          n = v.magnitudeSquared(e);

      if (0 < (o = n - o * o)) {
        o = Math.sqrt(o) + this._horizonDistance, e = v.subtract(t, this._cameraPosition, e);
        var a = v.magnitudeSquared(e);
        return o * o + r * r < a ? d.NONE : 0 < (o = n - (o = this._occluderRadius + r) * o) ? a < (o = Math.sqrt(o) + this._horizonDistance) * o + r * r ? d.FULL : d.PARTIAL : (e = v.subtract(t, this._horizonPlanePosition, e), v.dot(e, this._horizonPlaneNormal) > -r ? d.PARTIAL : d.FULL);
      }
    }

    return d.NONE;
  };

  var y = new v();

  z.computeOccludeePoint = function (i, t, r) {
    if (!_(i)) throw new f("occluderBoundingSphere is required.");
    if (!_(r)) throw new f("positions is required.");
    if (0 === r.length) throw new f("positions must contain at least one element");
    var e = v.clone(t),
        o = v.clone(i.center),
        n = i.radius,
        a = r.length;
    if (v.equals(o, t)) throw new f("occludeePosition must be different than occluderBoundingSphere.center");

    var s = v.normalize(v.subtract(e, o, y), y),
        u = -v.dot(s, o),
        c = z._anyRotationVector(o, s, u),
        d = z._horizonToPlaneNormalDotProduct(i, s, u, c, r[0]);

    if (d) {
      for (var l, h = 1; h < a; ++h) {
        if (!(l = z._horizonToPlaneNormalDotProduct(i, s, u, c, r[h]))) return;
        l < d && (d = l);
      }

      if (!(d < .0017453283658983088)) {
        var m = n / d;
        return v.add(o, v.multiplyByScalar(s, m, y), y);
      }
    }
  };

  var w = [];

  z.computeOccludeePointFromRectangle = function (i, t) {
    if (!_(i)) throw new f("rectangle is required.");
    t = a(t, s.WGS84);
    var r = c.subsample(i, t, 0, w),
        e = n.fromPoints(r),
        o = v.ZERO;
    if (!v.equals(o, e.center)) return z.computeOccludeePoint(new n(o, t.minimumRadius), e.center, r);
  };

  var p = new v();

  z._anyRotationVector = function (i, t, r) {
    var e = v.abs(t, p),
        o = e.x > e.y ? 0 : 1;
    (0 === o && e.z > e.x || 1 === o && e.z > e.y) && (o = 2);
    var n = new v(),
        a = 0 === o ? (e.x = i.x, e.y = i.y + 1, e.z = i.z + 1, v.UNIT_X) : 1 === o ? (e.x = i.x + 1, e.y = i.y, e.z = i.z + 1, v.UNIT_Y) : (e.x = i.x + 1, e.y = i.y + 1, e.z = i.z, v.UNIT_Z),
        s = (v.dot(t, e) + r) / -v.dot(t, a);
    return v.normalize(v.subtract(v.add(e, v.multiplyByScalar(a, s, n), e), i, e), e);
  };

  var q = new v();

  z._rotationVector = function (i, t, r, e, o) {
    var n = v.subtract(e, i, q),
        n = v.normalize(n, n);

    if (v.dot(t, n) < .9999999847691291) {
      var a = v.cross(t, n, n);
      if (v.magnitude(a) > u.EPSILON13) return v.normalize(a, new v());
    }

    return o;
  };

  var b = new v(),
      S = new v(),
      g = new v(),
      R = new v();
  return z._horizonToPlaneNormalDotProduct = function (i, t, r, e, o) {
    var n = v.clone(o, b),
        a = v.clone(i.center, S),
        s = i.radius,
        u = v.subtract(a, n, g),
        c = v.magnitudeSquared(u),
        d = s * s;
    if (c < d) return !1;

    var l = c - d,
        h = Math.sqrt(l),
        m = h * (1 / Math.sqrt(c)) * h,
        u = v.normalize(u, u),
        _ = v.add(n, v.multiplyByScalar(u, m, R), R),
        f = Math.sqrt(l - m * m),
        z = this._rotationVector(a, t, r, n, e),
        P = v.fromElements(z.x * z.x * u.x + (z.x * z.y - z.z) * u.y + (z.x * z.z + z.y) * u.z, (z.x * z.y + z.z) * u.x + z.y * z.y * u.y + (z.y * z.z - z.x) * u.z, (z.x * z.z - z.y) * u.x + (z.y * z.z + z.x) * u.y + z.z * z.z * u.z, b),
        P = v.normalize(P, P),
        y = v.multiplyByScalar(P, f, b),
        z = v.normalize(v.subtract(v.add(_, y, g), a, g), g),
        w = v.dot(t, z);

    z = v.normalize(v.subtract(v.subtract(_, y, z), a, z), z);
    var p = v.dot(t, z);
    return w < p ? w : p;
  }, z;
});