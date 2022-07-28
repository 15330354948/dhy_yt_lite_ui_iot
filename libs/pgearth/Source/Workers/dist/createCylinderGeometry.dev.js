"use strict";

define(["../Core/CylinderGeometry", "../Core/defined"], function (n, t) {
  "use strict";

  return function (e, r) {
    return t(r) && (e = n.unpack(e, r)), n.createGeometry(e);
  };
});