"use strict";

define(["../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/JulianDate", "../Core/Math"], function (c, e, p, i, r, f) {
  "use strict";

  function m(e) {
    this.tilePropertyName = e, this._minimum = Number.MAX_VALUE, this._maximum = -Number.MAX_VALUE, this._previousMinimum = Number.MAX_VALUE, this._previousMaximum = -Number.MAX_VALUE, this._referenceMinimum = {}, this._referenceMaximum = {};
  }

  function A(e, i) {
    var m = "_loadTimestamp" === i ? r.toDate(e).getTime() : e;
    return m;
  }

  m.prototype.setReferenceMinimumMaximum = function (e, i, m) {
    this._referenceMinimum[m] = A(e, m), this._referenceMaximum[m] = A(i, m);
  };

  var b = [new c(.1, .1, .1, 1), new c(.153, .278, .878, 1), new c(.827, .231, .49, 1), new c(.827, .188, .22, 1), new c(1, .592, .259, 1), new c(1, .843, 0, 1)];
  return m.prototype.colorize = function (e, i) {
    var m,
        r,
        t,
        u,
        n,
        o,
        a,
        s,
        _,
        M,
        h,
        l = this.tilePropertyName;

    p(l) && e.contentAvailable && e._selectedFrame === i.frameNumber && (m = function (e, i) {
      var m = e.tilePropertyName;

      if (p(m)) {
        var r = A(i[m], m);
        return p(r) ? (e._maximum = Math.max(r, e._maximum), e._minimum = Math.min(r, e._minimum), r) : (e.tilePropertyName = void 0, r);
      }
    }(this, e), r = this._previousMinimum, t = this._previousMaximum, r !== Number.MAX_VALUE && t !== -Number.MAX_VALUE && (u = t - r + f.EPSILON7, n = f.clamp(m - r, 0, u) / u * (b.length - 1), o = Math.floor(n), a = Math.ceil(n), s = n - o, _ = b[o], M = b[a], (h = c.clone(c.WHITE)).red = f.lerp(_.red, M.red, s), h.green = f.lerp(_.green, M.green, s), h.blue = f.lerp(_.blue, M.blue, s), e._debugColor = h));
  }, m.prototype.resetMinimumMaximum = function () {
    var e,
        i,
        m,
        r = this.tilePropertyName;
    p(r) && (e = this._referenceMinimum[r], i = this._referenceMaximum[r], m = p(e) && p(i), this._previousMinimum = m ? e : this._minimum, this._previousMaximum = m ? i : this._maximum, this._minimum = Number.MAX_VALUE, this._maximum = -Number.MAX_VALUE);
  }, m;
});