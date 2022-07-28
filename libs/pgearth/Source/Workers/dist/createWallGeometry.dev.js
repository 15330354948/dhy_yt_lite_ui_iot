"use strict";

define(["../Core/defined", "../Core/Ellipsoid", "../Core/WallGeometry"], function (o, r, n) {
  "use strict";

  return function (e, i) {
    return o(i) && (e = n.unpack(e, i)), e._ellipsoid = r.clone(e._ellipsoid), n.createGeometry(e);
  };
});