"use strict";

define(["../Core/defined", "../Core/CoplanarPolygonOutlineGeometry", "../Core/Ellipsoid"], function (n, i, r) {
  "use strict";

  return function (e, o) {
    return n(o) && (e = i.unpack(e, o)), e._ellipsoid = r.clone(e._ellipsoid), i.createGeometry(e);
  };
});