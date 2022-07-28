"use strict";

define(["../Core/binarySearch", "../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/ExtrapolationType", "../Core/JulianDate", "../Core/LinearApproximation"], function (O, I, d, N, t, u, f, S, P, _) {
  "use strict";

  var c = {
    packedLength: 1,
    pack: function pack(t, e, i) {
      e[i = d(i, 0)] = t;
    },
    unpack: function unpack(t, e, i) {
      return t[e = d(e, 0)];
    }
  };

  function g(t, e, i) {
    var n = t.length,
        r = i.length,
        a = n + r;
    if (t.length = a, n !== e) for (var o = n - 1, s = a - 1; e <= s; s--) {
      t[s] = t[o--];
    }

    for (s = 0; s < r; s++) {
      t[e++] = i[s];
    }
  }

  function v(t, e) {
    return t instanceof P ? t : "string" == typeof t ? P.fromIso8601(t) : P.addSeconds(e, t, new P());
  }

  var m = [],
      y = [];

  function k(t, e, i, n, r) {
    for (var a, o, s, h, p, l, d = 0; d < n.length;) {
      p = v(n[d], t);
      var u = 0,
          f = 0;

      if ((s = O(e, p, P.compare)) < 0) {
        for (h = (s = ~s) * r, o = void 0, l = e[s]; d < n.length && (p = v(n[d], t), !(N(o) && 0 <= P.compare(o, p) || N(l) && 0 <= P.compare(p, l)));) {
          for (m[u++] = p, d += 1, a = 0; a < r; a++) {
            y[f++] = n[d], d += 1;
          }

          o = p;
        }

        0 < u && (y.length = f, g(i, h, y), m.length = u, g(e, s, m));
      } else {
        for (a = 0; a < r; a++) {
          d++, i[s * r + a] = n[d];
        }

        d++;
      }
    }
  }

  function e(t, e) {
    I.defined("type", t);
    var i = t;
    i === Number && (i = c);
    var n = i.packedLength,
        r = d(i.packedInterpolationLength, n),
        a = 0;

    if (N(e)) {
      for (var o = e.length, s = new Array(o), h = 0; h < o; h++) {
        var p = e[h];
        p === Number && (p = c);
        var l = p.packedLength;
        n += l, r += d(p.packedInterpolationLength, l), s[h] = p;
      }

      a = o;
    }

    this._type = t, this._innerType = i, this._interpolationDegree = 1, this._interpolationAlgorithm = _, this._numberOfPoints = 0, this._times = [], this._values = [], this._xTable = [], this._yTable = [], this._packedLength = n, this._packedInterpolationLength = r, this._updateTableLength = !0, this._interpolationResult = new Array(r), this._definitionChanged = new f(), this._derivativeTypes = e, this._innerDerivativeTypes = s, this._inputOrder = a, this._forwardExtrapolationType = S.NONE, this._forwardExtrapolationDuration = 0, this._backwardExtrapolationType = S.NONE, this._backwardExtrapolationDuration = 0;
  }

  function r(t, e, i) {
    var n = t._packedLength;
    t._times.splice(e, i), t._values.splice(e * n, i * n), t._updateTableLength = !0, t._definitionChanged.raiseEvent(t);
  }

  return t(e.prototype, {
    isConstant: {
      get: function get() {
        return 0 === this._values.length;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    type: {
      get: function get() {
        return this._type;
      }
    },
    derivativeTypes: {
      get: function get() {
        return this._derivativeTypes;
      }
    },
    interpolationDegree: {
      get: function get() {
        return this._interpolationDegree;
      }
    },
    interpolationAlgorithm: {
      get: function get() {
        return this._interpolationAlgorithm;
      }
    },
    forwardExtrapolationType: {
      get: function get() {
        return this._forwardExtrapolationType;
      },
      set: function set(t) {
        this._forwardExtrapolationType !== t && (this._forwardExtrapolationType = t, this._definitionChanged.raiseEvent(this));
      }
    },
    forwardExtrapolationDuration: {
      get: function get() {
        return this._forwardExtrapolationDuration;
      },
      set: function set(t) {
        this._forwardExtrapolationDuration !== t && (this._forwardExtrapolationDuration = t, this._definitionChanged.raiseEvent(this));
      }
    },
    backwardExtrapolationType: {
      get: function get() {
        return this._backwardExtrapolationType;
      },
      set: function set(t) {
        this._backwardExtrapolationType !== t && (this._backwardExtrapolationType = t, this._definitionChanged.raiseEvent(this));
      }
    },
    backwardExtrapolationDuration: {
      get: function get() {
        return this._backwardExtrapolationDuration;
      },
      set: function set(t) {
        this._backwardExtrapolationDuration !== t && (this._backwardExtrapolationDuration = t, this._definitionChanged.raiseEvent(this));
      }
    }
  }), e.prototype.getValue = function (t, e) {
    I.defined("time", t);
    var i = this._times,
        n = i.length;

    if (0 !== n) {
      var r = this._innerType,
          a = this._values,
          o = O(i, t, P.compare);

      if (o < 0) {
        if (0 === (o = ~o)) {
          var s = i[o],
              h = this._backwardExtrapolationDuration;
          if (this._backwardExtrapolationType === S.NONE || 0 !== h && P.secondsDifference(s, t) > h) return;
          if (this._backwardExtrapolationType === S.HOLD) return r.unpack(a, 0, e);
        }

        if (n <= o) {
          var p = i[o = n - 1];
          if (h = this._forwardExtrapolationDuration, this._forwardExtrapolationType === S.NONE || 0 !== h && P.secondsDifference(t, p) > h) return;
          if (this._forwardExtrapolationType === S.HOLD) return o = n - 1, r.unpack(a, o * r.packedLength, e);
        }

        var l,
            d = this._xTable,
            u = this._yTable,
            f = this._interpolationAlgorithm,
            _ = this._packedInterpolationLength,
            c = this._inputOrder;
        this._updateTableLength && (this._updateTableLength = !1, (l = Math.min(f.getRequiredDataPoints(this._interpolationDegree, c), n)) !== this._numberOfPoints && (this._numberOfPoints = l, d.length = l, u.length = l * _));
        var g = this._numberOfPoints - 1;
        if (g < 1) return;
        var v,
            m,
            y = 0,
            k = n - 1;
        1 + g <= k - y + 1 && ((v = o - (g / 2 | 0) - 1) < y && (v = y), k < (m = v + g) && (v = (m = k) - g) < y && (v = y), y = v, k = m);

        for (var E = k - y + 1, T = 0; T < E; ++T) {
          d[T] = P.secondsDifference(i[y + T], i[k]);
        }

        if (N(r.convertPackedArrayForInterpolation)) r.convertPackedArrayForInterpolation(a, y, k, u);else for (var w = 0, b = this._packedLength, D = y * b, x = (k + 1) * b; D < x;) {
          u[w] = a[D], D++, w++;
        }
        var L,
            C,
            A = P.secondsDifference(t, i[k]);
        return C = 0 !== c && N(f.interpolate) ? (L = Math.floor(_ / (c + 1)), f.interpolate(A, d, u, L, c, c, this._interpolationResult)) : f.interpolateOrderZero(A, d, u, _, this._interpolationResult), N(r.unpackInterpolationResult) ? r.unpackInterpolationResult(C, a, y, k, e) : r.unpack(C, 0, e);
      }

      return r.unpack(a, o * this._packedLength, e);
    }
  }, e.prototype.setInterpolationOptions = function (t) {
    var e, i, n;
    N(t) && (e = !1, i = t.interpolationAlgorithm, n = t.interpolationDegree, N(i) && this._interpolationAlgorithm !== i && (this._interpolationAlgorithm = i, e = !0), N(n) && this._interpolationDegree !== n && (this._interpolationDegree = n, e = !0), e && (this._updateTableLength = !0, this._definitionChanged.raiseEvent(this)));
  }, e.prototype.addSample = function (t, e, i) {
    var n = this._innerDerivativeTypes,
        r = N(n);
    I.defined("time", t), I.defined("value", e), r && I.defined("derivatives", i);
    var a = this._innerType,
        o = [];
    if (o.push(t), a.pack(e, o, o.length), r) for (var s = n.length, h = 0; h < s; h++) {
      n[h].pack(i[h], o, o.length);
    }
    k(void 0, this._times, this._values, o, this._packedLength), this._updateTableLength = !0, this._definitionChanged.raiseEvent(this);
  }, e.prototype.addSamples = function (t, e, i) {
    var n = this._innerDerivativeTypes,
        r = N(n);
    if (I.defined("times", t), I.defined("values", e), t.length !== e.length) throw new u("times and values must be the same length.");
    if (r && (!N(i) || i.length !== t.length)) throw new u("times and derivativeValues must be the same length.");

    for (var a = this._innerType, o = t.length, s = [], h = 0; h < o; h++) {
      if (s.push(t[h]), a.pack(e[h], s, s.length), r) for (var p = i[h], l = n.length, d = 0; d < l; d++) {
        n[d].pack(p[d], s, s.length);
      }
    }

    k(void 0, this._times, this._values, s, this._packedLength), this._updateTableLength = !0, this._definitionChanged.raiseEvent(this);
  }, e.prototype.addSamplesPackedArray = function (t, e) {
    I.defined("packedSamples", t), k(e, this._times, this._values, t, this._packedLength), this._updateTableLength = !0, this._definitionChanged.raiseEvent(this);
  }, e.prototype.removeSample = function (t) {
    I.defined("time", t);
    var e = O(this._times, t, P.compare);
    return !(e < 0) && (r(this, e, 1), !0);
  }, e.prototype.removeSamples = function (t) {
    I.defined("timeInterval", t);
    var e = this._times,
        i = O(e, t.start, P.compare);
    i < 0 ? i = ~i : t.isStartIncluded || ++i;
    var n = O(e, t.stop, P.compare);
    n < 0 ? n = ~n : t.isStopIncluded && ++n, r(this, i, n - i);
  }, e.prototype.equals = function (t) {
    if (this === t) return !0;
    if (!N(t)) return !1;
    if (this._type !== t._type || this._interpolationDegree !== t._interpolationDegree || this._interpolationAlgorithm !== t._interpolationAlgorithm) return !1;
    var e = this._derivativeTypes,
        i = N(e),
        n = t._derivativeTypes;
    if (i !== N(n)) return !1;

    if (i) {
      if ((r = e.length) !== n.length) return !1;

      for (p = 0; p < r; p++) {
        if (e[p] !== n[p]) return !1;
      }
    }

    var r,
        a = this._times,
        o = t._times;
    if ((r = a.length) !== o.length) return !1;

    for (p = 0; p < r; p++) {
      if (!P.equals(a[p], o[p])) return !1;
    }

    for (var s = this._values, h = t._values, p = 0; p < r; p++) {
      if (s[p] !== h[p]) return !1;
    }

    return !0;
  }, e._mergeNewSamples = k, e;
});