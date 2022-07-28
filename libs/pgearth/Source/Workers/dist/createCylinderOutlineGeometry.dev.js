"use strict";

define(["../Core/CylinderOutlineGeometry", "../Core/defined"], function (r, t) {
  "use strict";

  return function (e, n) {
    return t(n) && (e = r.unpack(e, n)), r.createGeometry(e);
  };
});