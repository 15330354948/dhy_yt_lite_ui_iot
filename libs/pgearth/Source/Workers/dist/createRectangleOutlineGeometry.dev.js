"use strict";

define(["../Core/defined", "../Core/Ellipsoid", "../Core/Rectangle", "../Core/RectangleOutlineGeometry"], function (r, t, l, o) {
  "use strict";

  return function (e, n) {
    return r(n) && (e = o.unpack(e, n)), e._ellipsoid = t.clone(e._ellipsoid), e._rectangle = l.clone(e._rectangle), o.createGeometry(e);
  };
});