"use strict";

define(["../Core/defined", "../Core/FrustumOutlineGeometry"], function (t, n) {
  "use strict";

  return function (e, r) {
    return t(r) && (e = n.unpack(e, r)), n.createGeometry(e);
  };
});