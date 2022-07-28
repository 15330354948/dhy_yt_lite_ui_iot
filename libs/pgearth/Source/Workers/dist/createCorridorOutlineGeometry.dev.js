"use strict";

define(["../Core/CorridorOutlineGeometry", "../Core/defined", "../Core/Ellipsoid"], function (i, o, n) {
  "use strict";

  return function (e, r) {
    return o(r) && (e = i.unpack(e, r)), e._ellipsoid = n.clone(e._ellipsoid), i.createGeometry(e);
  };
});