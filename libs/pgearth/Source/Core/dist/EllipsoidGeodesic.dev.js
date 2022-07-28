"use strict";

define(["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./Math"], function (P, E, T, e, w, t, s, N) {
  "use strict";

  function x(t, a, i, n, e, s, h) {
    var r,
        d,
        o = (r = t) * (d = i) * (4 + r * (4 - 3 * d)) / 16;
    return (1 - o) * t * a * (n + o * e * (h + o * s * (2 * h * h - 1)));
  }

  var D = new P(),
      I = new P();

  function h(t, a, i, n) {
    var e,
        s,
        h,
        r,
        d,
        o,
        u,
        c,
        M,
        l,
        _,
        g,
        f,
        p,
        v,
        m,
        H,
        O,
        q,
        S,
        U,
        b,
        w,
        A,
        R,
        y = P.normalize(n.cartographicToCartesian(a, I), D),
        C = P.normalize(n.cartographicToCartesian(i, I), I);

    T.typeOf.number.greaterThanOrEquals("value", Math.abs(Math.abs(P.angleBetween(y, C)) - Math.PI), .0125), function (t, a, i, n, e, s, h) {
      var r = (a - i) / a,
          d = s - n,
          o = Math.atan((1 - r) * Math.tan(e)),
          u = Math.atan((1 - r) * Math.tan(h)),
          c = Math.cos(o),
          M = Math.sin(o),
          l = Math.cos(u),
          _ = Math.sin(u),
          g = c * l,
          f = c * _,
          p = M * _,
          v = M * l,
          m = d,
          H = N.TWO_PI,
          O = Math.cos(m),
          q = Math.sin(m);

      do {
        O = Math.cos(m), q = Math.sin(m);
        var S,
            U,
            b = f - v * O,
            w = Math.sqrt(l * l * q * q + b * b),
            A = p + g * O,
            R = Math.atan2(w, A),
            H = m,
            y = A - 2 * p / (U = 0 === w ? (S = 0, 1) : 1 - (S = g * q / w) * S);
        isNaN(y) && (y = 0), m = d + x(r, S, U, R, w, A, y);
      } while (Math.abs(m - H) > N.EPSILON12);

      var C = U * (a * a - i * i) / (i * i),
          P = C * (256 + C * (C * (74 - 47 * C) - 128)) / 1024,
          E = y * y,
          T = i * (1 + C * (4096 + C * (C * (320 - 175 * C) - 768)) / 16384) * (R - P * w * (y + P * (A * (2 * E - 1) - P * y * (4 * w * w - 3) * (4 * E - 3) / 6) / 4)),
          D = Math.atan2(l * q, f - v * O),
          I = Math.atan2(c * q, f * O - v);
      t._distance = T, t._startHeading = D, t._endHeading = I, t._uSquared = C;
    }(t, n.maximumRadius, n.minimumRadius, a.longitude, a.latitude, i.longitude, i.latitude), t._start = E.clone(a, t._start), t._end = E.clone(i, t._end), t._start.height = 0, t._end.height = 0, s = (e = t)._uSquared, h = e._ellipsoid.maximumRadius, r = e._ellipsoid.minimumRadius, d = (h - r) / h, o = Math.cos(e._startHeading), u = Math.sin(e._startHeading), c = (1 - d) * Math.tan(e._start.latitude), M = 1 / Math.sqrt(1 + c * c), l = M * c, _ = Math.atan2(c, o), p = 1 - (f = (g = M * u) * g), v = Math.sqrt(p), b = 1 - 3 * (m = s / 4) + 35 * (H = m * m) / 4, w = 1 - 5 * m, A = (S = 1 + m - 3 * H / 4 + 5 * (O = H * m) / 4 - 175 * (q = H * H) / 64) * _ - (U = 1 - m + 15 * H / 8 - 35 * O / 8) * Math.sin(2 * _) * m / 2 - b * Math.sin(4 * _) * H / 16 - w * Math.sin(6 * _) * O / 48 - 5 * Math.sin(8 * _) * q / 512, (R = e._constants).a = h, R.b = r, R.f = d, R.cosineHeading = o, R.sineHeading = u, R.tanU = c, R.cosineU = M, R.sineU = l, R.sigma = _, R.sineAlpha = g, R.sineSquaredAlpha = f, R.cosineSquaredAlpha = p, R.cosineAlpha = v, R.u2Over4 = m, R.u4Over16 = H, R.u6Over64 = O, R.u8Over256 = q, R.a0 = S, R.a1 = U, R.a2 = b, R.a3 = w, R.distanceRatio = A;
  }

  function a(t, a, i) {
    var n = e(i, s.WGS84);
    this._ellipsoid = n, this._start = new E(), this._end = new E(), this._constants = {}, this._startHeading = void 0, this._endHeading = void 0, this._distance = void 0, this._uSquared = void 0, w(t) && w(a) && h(this, t, a, n);
  }

  return t(a.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    },
    surfaceDistance: {
      get: function get() {
        return T.defined("distance", this._distance), this._distance;
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
    startHeading: {
      get: function get() {
        return T.defined("distance", this._distance), this._startHeading;
      }
    },
    endHeading: {
      get: function get() {
        return T.defined("distance", this._distance), this._endHeading;
      }
    }
  }), a.prototype.setEndPoints = function (t, a) {
    T.defined("start", t), T.defined("end", a), h(this, t, a, this._ellipsoid);
  }, a.prototype.interpolateUsingFraction = function (t, a) {
    return this.interpolateUsingSurfaceDistance(this._distance * t, a);
  }, a.prototype.interpolateUsingSurfaceDistance = function (t, a) {
    T.defined("distance", this._distance);
    var i = this._constants,
        n = i.distanceRatio + t / i.b,
        e = Math.cos(2 * n),
        s = Math.cos(4 * n),
        h = Math.cos(6 * n),
        r = Math.sin(2 * n),
        d = Math.sin(4 * n),
        o = Math.sin(6 * n),
        u = Math.sin(8 * n),
        c = n * n,
        M = n * c,
        l = i.u8Over256,
        _ = i.u2Over4,
        g = i.u6Over64,
        f = i.u4Over16,
        p = 2 * M * l * e / 3 + n * (1 - _ + 7 * f / 4 - 15 * g / 4 + 579 * l / 64 - (f - 15 * g / 4 + 187 * l / 16) * e - (5 * g / 4 - 115 * l / 16) * s - 29 * l * h / 16) + (_ / 2 - f + 71 * g / 32 - 85 * l / 16) * r + (5 * f / 16 - 5 * g / 4 + 383 * l / 96) * d - c * ((g - 11 * l / 2) * r + 5 * l * d / 2) + (29 * g / 96 - 29 * l / 16) * o + 539 * l * u / 1536,
        v = Math.asin(Math.sin(p) * i.cosineAlpha),
        m = Math.atan(i.a / i.b * Math.tan(v));
    p -= i.sigma;
    var H = Math.cos(2 * i.sigma + p),
        O = Math.sin(p),
        q = Math.cos(p),
        S = i.cosineU * q,
        U = i.sineU * O,
        b = Math.atan2(O * i.sineHeading, S - U * i.cosineHeading) - x(i.f, i.sineAlpha, i.cosineSquaredAlpha, p, O, q, H);
    return w(a) ? (a.longitude = this._start.longitude + b, a.latitude = m, a.height = 0, a) : new E(this._start.longitude + b, m, 0);
  }, a;
});