"use strict";

define(["../Core/Cartesian3", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Matrix3", "../Core/ReferenceFrame", "../Core/Transforms"], function (a, s, r, e, u, c, f) {
  "use strict";

  function t() {
    e.throwInstantiationError();
  }

  r(t.prototype, {
    isConstant: {
      get: e.throwInstantiationError
    },
    definitionChanged: {
      get: e.throwInstantiationError
    },
    referenceFrame: {
      get: e.throwInstantiationError
    }
  }), t.prototype.getValue = e.throwInstantiationError, t.prototype.getValueInReferenceFrame = e.throwInstantiationError, t.prototype.equals = e.throwInstantiationError;
  var p = new u();
  return t.convertToReferenceFrame = function (r, e, t, o, n) {
    if (!s(e)) return e;
    if (s(n) || (n = new a()), t === o) return a.clone(e, n);
    var i = f.computeIcrfToFixedMatrix(r, p);
    return s(i) || (i = f.computeTemeToPseudoFixedMatrix(r, p)), t === c.INERTIAL ? u.multiplyByVector(i, e, n) : t === c.FIXED ? u.multiplyByVector(u.transpose(i, p), e, n) : void 0;
  }, t;
});