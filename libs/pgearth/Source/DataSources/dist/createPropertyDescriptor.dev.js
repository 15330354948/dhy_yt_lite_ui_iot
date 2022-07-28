"use strict";

define(["../Core/defaultValue", "../Core/defined", "./ConstantProperty"], function (u, h, i) {
  "use strict";

  function a(t) {
    return new i(t);
  }

  return function (t, i, n) {
    return r = "_" + (e = t).toString(), o = "_" + t.toString() + "Subscription", s = u(i, !1), d = u(n, a), {
      configurable: s,
      get: function get() {
        return this[r];
      },
      set: function set(t) {
        var i = this[r],
            n = this[o];
        h(n) && (n(), this[o] = void 0), void 0 === t || h(t) && h(t.getValue) || !h(d) || (t = d(t)), i !== t && (this[r] = t, this._definitionChanged.raiseEvent(this, e, t, i)), h(t) && h(t.definitionChanged) && (this[o] = t.definitionChanged.addEventListener(function () {
          this._definitionChanged.raiseEvent(this, e, t, t);
        }, this));
      }
    };
    var e, r, o, s, d;
  };
});