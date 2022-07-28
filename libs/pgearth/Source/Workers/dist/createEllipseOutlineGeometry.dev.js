"use strict";

define(["../Core/Cartesian3", "../Core/defined", "../Core/EllipseOutlineGeometry", "../Core/Ellipsoid"], function (r, i, o, t) {
  "use strict";

  return function (e, n) {
    return i(n) && (e = o.unpack(e, n)), e._center = r.clone(e._center), e._ellipsoid = t.clone(e._ellipsoid), o.createGeometry(e);
  };
});