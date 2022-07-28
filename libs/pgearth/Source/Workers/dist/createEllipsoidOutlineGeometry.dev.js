"use strict";

define(["../Core/defined", "../Core/EllipsoidOutlineGeometry"], function (n, t) {
  "use strict";

  return function (e, r) {
    return n(e.buffer, r) && (e = t.unpack(e, r)), t.createGeometry(e);
  };
});