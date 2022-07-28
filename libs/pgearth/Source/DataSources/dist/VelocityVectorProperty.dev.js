"use strict";

define(["../Core/Cartesian3", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/JulianDate", "./Property"], function (a, e, u, i, h, n, d, f) {
  "use strict";

  function t(i, t) {
    this._position = void 0, this._subscription = void 0, this._definitionChanged = new n(), this._normalize = e(t, !0), this.position = i;
  }

  i(t.prototype, {
    isConstant: {
      get: function get() {
        return f.isConstant(this._position);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    position: {
      get: function get() {
        return this._position;
      },
      set: function set(i) {
        var t = this._position;
        t !== i && (u(t) && this._subscription(), this._position = i, u(i) && (this._subscription = i._definitionChanged.addEventListener(function () {
          this._definitionChanged.raiseEvent(this);
        }, this)), this._definitionChanged.raiseEvent(this));
      }
    },
    normalize: {
      get: function get() {
        return this._normalize;
      },
      set: function set(i) {
        this._normalize !== i && (this._normalize = i, this._definitionChanged.raiseEvent(this));
      }
    }
  });

  var l = new a(),
      _ = new a(),
      c = new d(),
      p = 1 / 60;

  return t.prototype.getValue = function (i, t) {
    return this._getValue(i, t);
  }, t.prototype._getValue = function (i, t, e) {
    if (!u(i)) throw new h("time is required");
    u(t) || (t = new a());
    var n = this._position;
    if (f.isConstant(n)) return this._normalize ? void 0 : a.clone(a.ZERO, t);
    var o = n.getValue(i, l),
        s = n.getValue(d.addSeconds(i, p, c), _);

    if (u(o) && (u(s) || (s = o, o = n.getValue(d.addSeconds(i, -p, c), _), u(o)))) {
      if (a.equals(o, s)) return this._normalize ? void 0 : a.clone(a.ZERO, t);
      u(e) && o.clone(e);
      var r = a.subtract(s, o, t);
      return this._normalize ? a.normalize(r, t) : a.divideByScalar(r, p, t);
    }
  }, t.prototype.equals = function (i) {
    return this === i || i instanceof t && f.equals(this._position, i._position);
  }, t;
});