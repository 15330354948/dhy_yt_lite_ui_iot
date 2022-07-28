"use strict";

define(["../Core/Cartesian3", "../Core/CircleOutlineGeometry", "../Core/defined", "../Core/Ellipsoid"], function (i, l, o, t) {
  "use strict";

  return function (e, r) {
    return o(r) && (e = l.unpack(e, r)), e._ellipseGeometry._center = i.clone(e._ellipseGeometry._center), e._ellipseGeometry._ellipsoid = t.clone(e._ellipseGeometry._ellipsoid), l.createGeometry(e);
  };
});