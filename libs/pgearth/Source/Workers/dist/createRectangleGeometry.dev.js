"use strict";

define(["../Core/defined", "../Core/Ellipsoid", "../Core/Rectangle", "../Core/RectangleGeometry"], function (r, o, t, l) {
  "use strict";

  return function (e, n) {
    return r(n) && (e = l.unpack(e, n)), e._ellipsoid = o.clone(e._ellipsoid), e._rectangle = t.clone(e._rectangle), l.createGeometry(e);
  };
});