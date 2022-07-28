"use strict";

define(["../Core/Cartesian3", "../Core/defined", "../Core/EllipseGeometry", "../Core/Ellipsoid"], function (n, i, o, t) {
  "use strict";

  return function (e, r) {
    return i(r) && (e = o.unpack(e, r)), e._center = n.clone(e._center), e._ellipsoid = t.clone(e._ellipsoid), o.createGeometry(e);
  };
});