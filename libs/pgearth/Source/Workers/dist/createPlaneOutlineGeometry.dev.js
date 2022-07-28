"use strict";

define(["../Core/defined", "../Core/PlaneOutlineGeometry"], function (r, t) {
  "use strict";

  return function (e, n) {
    return r(n) && (e = t.unpack(e, n)), t.createGeometry(e);
  };
});