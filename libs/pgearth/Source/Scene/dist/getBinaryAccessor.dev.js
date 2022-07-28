"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/ComponentDatatype", "../Core/Matrix2", "../Core/Matrix3", "../Core/Matrix4"], function (e, r, t, o, n, a, C) {
  "use strict";

  var i = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  },
      A = {
    SCALAR: void 0,
    VEC2: e,
    VEC3: r,
    VEC4: t,
    MAT2: n,
    MAT3: a,
    MAT4: C
  };
  return function (e) {
    var r = e.componentType,
        n = "string" == typeof r ? o.fromName(r) : r,
        a = i[e.type],
        t = A[e.type];
    return {
      componentsPerAttribute: a,
      classType: t,
      createArrayBufferView: function createArrayBufferView(e, r, t) {
        return o.createArrayBufferView(n, e, r, a * t);
      }
    };
  };
});