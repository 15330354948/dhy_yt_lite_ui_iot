"use strict";

define(["../Core/defined", "../Core/Ellipsoid", "../Core/PolygonGeometry"], function (i, n, r) {
  "use strict";

  return function (e, o) {
    return i(o) && (e = r.unpack(e, o)), e._ellipsoid = n.clone(e._ellipsoid), r.createGeometry(e);
  };
});