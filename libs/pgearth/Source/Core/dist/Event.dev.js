"use strict";

define(["./Check", "./defined", "./defineProperties"], function (o, h, e) {
  "use strict";

  function t() {
    this._listeners = [], this._scopes = [], this._toRemove = [], this._insideRaiseEvent = !1;
  }

  function p(e, t) {
    return t - e;
  }

  return e(t.prototype, {
    numberOfListeners: {
      get: function get() {
        return this._listeners.length - this._toRemove.length;
      }
    }
  }), t.prototype.addEventListener = function (e, t) {
    o.typeOf.func("listener", e), this._listeners.push(e), this._scopes.push(t);
    var i = this;
    return function () {
      i.removeEventListener(e, t);
    };
  }, t.prototype.removeEventListener = function (e, t) {
    o.typeOf.func("listener", e);

    for (var i = this._listeners, s = this._scopes, n = -1, r = 0; r < i.length; r++) {
      if (i[r] === e && s[r] === t) {
        n = r;
        break;
      }
    }

    return -1 !== n && (this._insideRaiseEvent ? (this._toRemove.push(n), i[n] = void 0, s[n] = void 0) : (i.splice(n, 1), s.splice(n, 1)), !0);
  }, t.prototype.raiseEvent = function () {
    this._insideRaiseEvent = !0;

    for (var e = this._listeners, t = this._scopes, i = e.length, s = 0; s < i; s++) {
      var n = e[s];
      h(n) && e[s].apply(t[s], arguments);
    }

    var r = this._toRemove;

    if (0 < (i = r.length)) {
      for (r.sort(p), s = 0; s < i; s++) {
        var o = r[s];
        e.splice(o, 1), t.splice(o, 1);
      }

      r.length = 0;
    }

    this._insideRaiseEvent = !1;
  }, t;
});