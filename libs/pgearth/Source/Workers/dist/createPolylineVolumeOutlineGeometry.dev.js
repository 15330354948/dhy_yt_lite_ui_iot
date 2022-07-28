"use strict";

define(["../Core/defined", "../Core/Ellipsoid", "../Core/PolylineVolumeOutlineGeometry"], function (o, n, l) {
  "use strict";

  return function (e, i) {
    return o(i) && (e = l.unpack(e, i)), e._ellipsoid = n.clone(e._ellipsoid), l.createGeometry(e);
  };
});