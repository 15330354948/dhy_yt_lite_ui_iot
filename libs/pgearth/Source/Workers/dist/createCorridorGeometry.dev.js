"use strict";

define(["../Core/CorridorGeometry", "../Core/defined", "../Core/Ellipsoid"], function (o, i, n) {
  "use strict";

  return function (e, r) {
    return i(r) && (e = o.unpack(e, r)), e._ellipsoid = n.clone(e._ellipsoid), o.createGeometry(e);
  };
});