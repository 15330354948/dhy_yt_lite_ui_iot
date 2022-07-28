"use strict";

define(["../ThirdParty/when", "./buildModuleUrl", "./defaultValue", "./defined", "./Iau2006XysSample", "./JulianDate", "./Resource", "./TimeStandard"], function (m, t, o, D, S, n, h, p) {
  "use strict";

  function e(e) {
    e = o(e, o.EMPTY_OBJECT), this._xysFileUrlTemplate = h.createIfNeeded(e.xysFileUrlTemplate), this._interpolationOrder = o(e.interpolationOrder, 9), this._sampleZeroJulianEphemerisDate = o(e.sampleZeroJulianEphemerisDate, 2442396.5), this._sampleZeroDateTT = new n(this._sampleZeroJulianEphemerisDate, 0, p.TAI), this._stepSizeDays = o(e.stepSizeDays, 1), this._samplesPerXysFile = o(e.samplesPerXysFile, 1e3), this._totalSamples = o(e.totalSamples, 27426), this._samples = new Array(3 * this._totalSamples), this._chunkDownloadsInProgress = [];

    for (var s = this._interpolationOrder, t = this._denominators = new Array(s + 1), r = this._xTable = new Array(s + 1), a = Math.pow(this._stepSizeDays, s), i = 0; i <= s; ++i) {
      t[i] = a, r[i] = i * this._stepSizeDays;

      for (var l = 0; l <= s; ++l) {
        l !== i && (t[i] *= i - l);
      }

      t[i] = 1 / t[i];
    }

    this._work = new Array(s + 1), this._coef = new Array(s + 1);
  }

  var a = new n(0, 0, p.TAI);

  function v(e, s, t) {
    var r = a;
    return r.dayNumber = s, r.secondsOfDay = t, n.daysDifference(r, e._sampleZeroDateTT);
  }

  function w(l, o) {
    if (l._chunkDownloadsInProgress[o]) return l._chunkDownloadsInProgress[o];
    var n = m.defer();
    l._chunkDownloadsInProgress[o] = n;
    var e = l._xysFileUrlTemplate,
        s = D(e) ? e.getDerivedResource({
      templateValues: {
        0: o
      }
    }) : new h({
      url: t("Assets/IAU2006_XYS/IAU2006_XYS_" + o + ".json")
    });
    return m(s.fetchJson(), function (e) {
      l._chunkDownloadsInProgress[o] = !1;

      for (var s = l._samples, t = e.samples, r = o * l._samplesPerXysFile * 3, a = 0, i = t.length; a < i; ++a) {
        s[r + a] = t[a];
      }

      n.resolve();
    }), n.promise;
  }

  return e.prototype.preload = function (e, s, t, r) {
    var a = v(this, e, s),
        i = v(this, t, r),
        l = a / this._stepSizeDays - this._interpolationOrder / 2 | 0;
    l < 0 && (l = 0);
    var o = i / this._stepSizeDays - this._interpolationOrder / 2 | 0 + this._interpolationOrder;
    o >= this._totalSamples && (o = this._totalSamples - 1);

    for (var n = l / this._samplesPerXysFile | 0, h = o / this._samplesPerXysFile | 0, p = [], _ = n; _ <= h; ++_) {
      p.push(w(this, _));
    }

    return m.all(p);
  }, e.prototype.computeXysRadians = function (e, s, t) {
    var r = v(this, e, s);

    if (!(r < 0)) {
      var a = r / this._stepSizeDays | 0;

      if (!(a >= this._totalSamples)) {
        var i = this._interpolationOrder,
            l = a - (i / 2 | 0);
        l < 0 && (l = 0);
        var o = l + i;
        o >= this._totalSamples && (l = (o = this._totalSamples - 1) - i) < 0 && (l = 0);
        var n = !1,
            h = this._samples;

        if (D(h[3 * l]) || (w(this, l / this._samplesPerXysFile | 0), n = !0), D(h[3 * o]) || (w(this, o / this._samplesPerXysFile | 0), n = !0), !n) {
          D(t) ? (t.x = 0, t.y = 0, t.s = 0) : t = new S(0, 0, 0);

          for (var p, _ = r - l * this._stepSizeDays, m = this._work, u = this._denominators, y = this._coef, d = this._xTable, f = 0; f <= i; ++f) {
            m[f] = _ - d[f];
          }

          for (f = 0; f <= i; ++f) {
            for (y[f] = 1, p = 0; p <= i; ++p) {
              p !== f && (y[f] *= m[p]);
            }

            y[f] *= u[f];
            var c = 3 * (l + f);
            t.x += y[f] * h[c++], t.y += y[f] * h[c++], t.s += y[f] * h[c];
          }

          return t;
        }
      }
    }
  }, e;
});