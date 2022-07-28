"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError"], function (o, u, t, e) {
  "use strict";

  function a() {
    e.throwInstantiationError();
  }

  return t(a.prototype, {
    isConstant: {
      get: e.throwInstantiationError
    },
    definitionChanged: {
      get: e.throwInstantiationError
    }
  }), a.prototype.getValue = e.throwInstantiationError, a.prototype.equals = e.throwInstantiationError, a.equals = function (t, e) {
    return t === e || u(t) && t.equals(e);
  }, a.arrayEquals = function (t, e) {
    if (t === e) return !0;
    if (!u(t) || !u(e) || t.length !== e.length) return !1;

    for (var r = t.length, n = 0; n < r; n++) {
      if (!a.equals(t[n], e[n])) return !1;
    }

    return !0;
  }, a.isConstant = function (t) {
    return !u(t) || t.isConstant;
  }, a.getValueOrUndefined = function (t, e, r) {
    return u(t) ? t.getValue(e, r) : void 0;
  }, a.getValueOrDefault = function (t, e, r, n) {
    return u(t) ? o(t.getValue(e, n), r) : r;
  }, a.getValueOrClonedDefault = function (t, e, r, n) {
    var o;
    return u(t) && (o = t.getValue(e, n)), u(o) || (o = r.clone(o)), o;
  }, a;
});