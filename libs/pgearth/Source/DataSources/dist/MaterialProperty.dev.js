"use strict";

define(["../Core/Color", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Scene/Material"], function (n, i, r, t, a) {
  "use strict";

  function o() {
    t.throwInstantiationError();
  }

  return r(o.prototype, {
    isConstant: {
      get: t.throwInstantiationError
    },
    definitionChanged: {
      get: t.throwInstantiationError
    }
  }), o.prototype.getType = t.throwInstantiationError, o.prototype.getValue = t.throwInstantiationError, o.prototype.equals = t.throwInstantiationError, o.getValue = function (r, t, o) {
    var e;
    return i(t) && (e = t.getType(r), i(e)) ? (i(o) && o.type === e || (o = a.fromType(e)), t.getValue(r, o.uniforms)) : (i(o) && o.type === a.ColorType || (o = a.fromType(a.ColorType)), n.clone(n.WHITE, o.uniforms.color)), o;
  }, o;
});