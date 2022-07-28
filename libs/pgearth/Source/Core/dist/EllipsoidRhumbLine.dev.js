"use strict";

define(["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./Math"], function (S, q, W, c, g, t, M, _, L) {
  "use strict";

  function V(t, i, e) {
    if (0 === t) return i * e;
    var a = t * t,
        n = a * a,
        s = n * a,
        h = s * a,
        d = h * a,
        r = d * a,
        u = e;
    return i * ((1 - a / 4 - 3 * n / 64 - 5 * s / 256 - 175 * h / 16384 - 441 * d / 65536 - 4851 * r / 1048576) * u - (3 * a / 8 + 3 * n / 32 + 45 * s / 1024 + 105 * h / 4096 + 2205 * d / 131072 + 6237 * r / 524288) * Math.sin(2 * u) + (15 * n / 256 + 45 * s / 1024 + 525 * h / 16384 + 1575 * d / 65536 + 155925 * r / 8388608) * Math.sin(4 * u) - (35 * s / 3072 + 175 * h / 12288 + 3675 * d / 262144 + 13475 * r / 1048576) * Math.sin(6 * u) + (315 * h / 131072 + 2205 * d / 524288 + 43659 * r / 8388608) * Math.sin(8 * u) - (693 * d / 1310720 + 6237 * r / 5242880) * Math.sin(10 * u) + 1001 * r / 8388608 * Math.sin(12 * u));
  }

  function N(t, i) {
    if (0 === t) return Math.log(Math.tan(.5 * (L.PI_OVER_TWO + i)));
    var e = t * Math.sin(i);
    return Math.log(Math.tan(.5 * (L.PI_OVER_TWO + i))) - t / 2 * Math.log((1 + e) / (1 - e));
  }

  var x = new S(),
      C = new S();

  function n(t, i, e, a) {
    var n = S.normalize(a.cartographicToCartesian(i, C), x),
        s = S.normalize(a.cartographicToCartesian(e, C), C);
    W.typeOf.number.greaterThanOrEquals("value", Math.abs(Math.abs(S.angleBetween(n, s)) - Math.PI), .0125);

    var h,
        d,
        r,
        u,
        o,
        l,
        c,
        _,
        g,
        M,
        p,
        f,
        P,
        m,
        O,
        E,
        v,
        I,
        T,
        y = a.maximumRadius,
        R = a.minimumRadius,
        b = y * y,
        w = R * R;

    t._ellipticitySquared = (b - w) / b, t._ellipticity = Math.sqrt(t._ellipticitySquared), t._start = q.clone(i, t._start), t._start.height = 0, t._end = q.clone(e, t._end), t._end.height = 0, t._heading = (h = t, d = i.longitude, r = i.latitude, u = e.longitude, o = e.latitude, l = N(h._ellipticity, r), c = N(h._ellipticity, o), Math.atan2(L.negativePiToPi(u - d), c - l)), t._distance = (_ = t, g = a.maximumRadius, M = a.minimumRadius, p = i.longitude, f = i.latitude, P = e.longitude, m = e.latitude, v = _._heading, I = P - p, T = 0, T = L.equalsEpsilon(Math.abs(v), L.PI_OVER_TWO, L.EPSILON8) ? g === M ? g * Math.cos(f) * L.negativePiToPi(I) : (O = Math.sin(f), g * Math.cos(f) * L.negativePiToPi(I) / Math.sqrt(1 - _._ellipticitySquared * O * O)) : (E = V(_._ellipticity, g, f), (V(_._ellipticity, g, m) - E) / Math.cos(v)), Math.abs(T));
  }

  function p(t, i, e, a, n, s) {
    var h,
        d,
        r,
        u,
        o,
        l,
        c = n * n;
    return o = Math.abs(L.PI_OVER_TWO - Math.abs(i)) > L.EPSILON8 ? (h = function (t, i, e) {
      var a = t / e;
      if (0 === i) return a;

      var n = a * a,
          s = n * a,
          h = s * a,
          d = i * i,
          r = d * d,
          u = r * d,
          o = u * d,
          l = o * d,
          c = l * d,
          _ = Math.sin(2 * a),
          g = Math.cos(2 * a),
          M = Math.sin(4 * a),
          p = Math.cos(4 * a),
          f = Math.sin(6 * a),
          P = Math.cos(6 * a),
          m = Math.sin(8 * a),
          O = Math.cos(8 * a),
          E = Math.sin(10 * a);

      return a + a * d / 4 + 7 * a * r / 64 + 15 * a * u / 256 + 579 * a * o / 16384 + 1515 * a * l / 65536 + 16837 * a * c / 1048576 + (3 * a * r / 16 + 45 * a * u / 256 - a * (32 * n - 561) * o / 4096 - a * (232 * n - 1677) * l / 16384 + a * (399985 - 90560 * n + 512 * h) * c / 5242880) * g + (21 * a * u / 256 + 483 * a * o / 4096 - a * (224 * n - 1969) * l / 16384 - a * (33152 * n - 112599) * c / 1048576) * p + (151 * a * o / 4096 + 4681 * a * l / 65536 + 1479 * a * c / 16384 - 453 * s * c / 32768) * P + (1097 * a * l / 65536 + 42783 * a * c / 1048576) * O + 8011 * a * c / 1048576 * Math.cos(10 * a) + (3 * d / 8 + 3 * r / 16 + 213 * u / 2048 - 3 * n * u / 64 + 255 * o / 4096 - 33 * n * o / 512 + 20861 * l / 524288 - 33 * n * l / 512 + h * l / 1024 + 28273 * c / 1048576 - 471 * n * c / 8192 + 9 * h * c / 4096) * _ + (21 * r / 256 + 21 * u / 256 + 533 * o / 8192 - 21 * n * o / 512 + 197 * l / 4096 - 315 * n * l / 4096 + 584039 * c / 16777216 - 12517 * n * c / 131072 + 7 * h * c / 2048) * M + (151 * u / 6144 + 151 * o / 4096 + 5019 * l / 131072 - 453 * n * l / 16384 + 26965 * c / 786432 - 8607 * n * c / 131072) * f + (1097 * o / 131072 + 1097 * l / 65536 + 225797 * c / 10485760 - 1097 * n * c / 65536) * m + (8011 * l / 2621440 + 8011 * c / 1048576) * E + 293393 * c / 251658240 * Math.sin(12 * a);
    }(V(n, a, t.latitude) + e * Math.cos(i), n, a), d = N(n, t.latitude), r = N(n, h), u = Math.tan(i) * (r - d), L.negativePiToPi(t.longitude + u)) : (h = t.latitude, u = e / (0 === n ? a * Math.cos(t.latitude) : (l = Math.sin(t.latitude), a * Math.cos(t.latitude) / Math.sqrt(1 - c * l * l))), 0 < i ? L.negativePiToPi(t.longitude + u) : L.negativePiToPi(t.longitude - u)), g(s) ? (s.longitude = o, s.latitude = h, s.height = 0, s) : new q(o, h, 0);
  }

  function f(t, i, e) {
    var a = c(e, _.WGS84);
    this._ellipsoid = a, this._start = new q(), this._end = new q(), this._heading = void 0, this._distance = void 0, this._ellipticity = void 0, this._ellipticitySquared = void 0, g(t) && g(i) && n(this, t, i, a);
  }

  return t(f.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    },
    surfaceDistance: {
      get: function get() {
        return W.defined("distance", this._distance), this._distance;
      }
    },
    start: {
      get: function get() {
        return this._start;
      }
    },
    end: {
      get: function get() {
        return this._end;
      }
    },
    heading: {
      get: function get() {
        return W.defined("distance", this._distance), this._heading;
      }
    }
  }), f.fromStartHeadingDistance = function (t, i, e, a, n) {
    W.defined("start", t), W.defined("heading", i), W.defined("distance", e), W.typeOf.number.greaterThan("distance", e, 0);
    var s = c(a, _.WGS84),
        h = s.maximumRadius,
        d = s.minimumRadius,
        r = h * h,
        u = d * d,
        o = Math.sqrt((r - u) / r),
        l = p(t, i = L.negativePiToPi(i), e, s.maximumRadius, o);
    return !g(n) || g(a) && !a.equals(n.ellipsoid) ? new f(t, l, s) : (n.setEndPoints(t, l), n);
  }, f.prototype.setEndPoints = function (t, i) {
    W.defined("start", t), W.defined("end", i), n(this, t, i, this._ellipsoid);
  }, f.prototype.interpolateUsingFraction = function (t, i) {
    return this.interpolateUsingSurfaceDistance(t * this._distance, i);
  }, f.prototype.interpolateUsingSurfaceDistance = function (t, i) {
    if (W.typeOf.number("distance", t), !g(this._distance) || 0 === this._distance) throw new M("EllipsoidRhumbLine must have distinct start and end set.");
    return p(this._start, this._heading, t, this._ellipsoid.maximumRadius, this._ellipticity, i);
  }, f.prototype.findIntersectionWithLongitude = function (t, i) {
    if (W.typeOf.number("intersectionLongitude", t), !g(this._distance) || 0 === this._distance) throw new M("EllipsoidRhumbLine must have distinct start and end set.");
    var e = this._ellipticity,
        a = this._heading,
        n = Math.abs(a),
        s = this._start;
    if (t = L.negativePiToPi(t), L.equalsEpsilon(Math.abs(t), Math.PI, L.EPSILON14) && (t = L.sign(s.longitude) * Math.PI), g(i) || (i = new q()), Math.abs(L.PI_OVER_TWO - n) <= L.EPSILON8) return i.longitude = t, i.latitude = s.latitude, i.height = 0, i;

    if (L.equalsEpsilon(Math.abs(L.PI_OVER_TWO - n), L.PI_OVER_TWO, L.EPSILON8)) {
      if (L.equalsEpsilon(t, s.longitude, L.EPSILON12)) return;
      return i.longitude = t, i.latitude = L.PI_OVER_TWO * L.sign(L.PI_OVER_TWO - a), i.height = 0, i;
    }

    var h,
        d = s.latitude,
        r = e * Math.sin(d),
        u = Math.tan(.5 * (L.PI_OVER_TWO + d)) * Math.exp((t - s.longitude) / Math.tan(a)),
        o = (1 + r) / (1 - r),
        l = s.latitude;

    do {
      h = l;

      var c = e * Math.sin(h),
          _ = (1 + c) / (1 - c),
          l = 2 * Math.atan(u * Math.pow(_ / o, e / 2)) - L.PI_OVER_TWO;
    } while (!L.equalsEpsilon(l, h, L.EPSILON12));

    return i.longitude = t, i.latitude = l, i.height = 0, i;
  }, f.prototype.findIntersectionWithLatitude = function (t, i) {
    if (W.typeOf.number("intersectionLatitude", t), !g(this._distance) || 0 === this._distance) throw new M("EllipsoidRhumbLine must have distinct start and end set.");
    var e = this._ellipticity,
        a = this._heading,
        n = this._start;

    if (!L.equalsEpsilon(Math.abs(a), L.PI_OVER_TWO, L.EPSILON8)) {
      var s = N(e, n.latitude),
          h = N(e, t),
          d = Math.tan(a) * (h - s),
          r = L.negativePiToPi(n.longitude + d);
      return g(i) ? (i.longitude = r, i.latitude = t, i.height = 0, i) : new q(r, t, 0);
    }
  }, f;
});