"use strict";

define(["./defaultValue", "./getStringFromTypedArray"], function (n, r) {
  "use strict";

  return function (t, e) {
    return e = n(e, 0), r(t, e, Math.min(4, t.length));
  };
});