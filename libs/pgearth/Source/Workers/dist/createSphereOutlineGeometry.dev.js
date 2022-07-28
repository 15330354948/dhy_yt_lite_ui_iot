"use strict";

define(["../Core/defined", "../Core/SphereOutlineGeometry"], function (n, t) {
  "use strict";

  return function (e, r) {
    return n(r) && (e = t.unpack(e, r)), t.createGeometry(e);
  };
});