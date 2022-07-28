"use strict";

define(["../Core/defined", "../Core/Ellipsoid", "../Core/WallOutlineGeometry"], function (n, o, r) {
  "use strict";

  return function (e, i) {
    return n(i) && (e = r.unpack(e, i)), e._ellipsoid = o.clone(e._ellipsoid), r.createGeometry(e);
  };
});