"use strict";

define(["../Core/defined", "../Core/Ellipsoid", "../Core/PolylineGeometry"], function (o, n, r) {
  "use strict";

  return function (e, i) {
    return o(i) && (e = r.unpack(e, i)), e._ellipsoid = n.clone(e._ellipsoid), r.createGeometry(e);
  };
});