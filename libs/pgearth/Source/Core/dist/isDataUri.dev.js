"use strict";

define(["./Check"], function (e) {
  "use strict";

  var n = /^data:/i;
  return function (t) {
    return e.typeOf.string("uri", t), n.test(t);
  };
});