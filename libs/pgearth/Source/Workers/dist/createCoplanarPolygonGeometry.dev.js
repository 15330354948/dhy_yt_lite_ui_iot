"use strict";

define(["../Core/defined", "../Core/CoplanarPolygonGeometry"], function (r, o) {
  "use strict";

  return function (e, n) {
    return r(n) && (e = o.unpack(e, n)), o.createGeometry(e);
  };
});