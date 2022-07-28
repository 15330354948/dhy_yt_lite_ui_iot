"use strict";

define(["./defined"], function (t) {
  "use strict";

  var n = {
    defaultKey: void 0,
    getKey: function getKey(e) {
      return t(e) ? e : n.defaultKey;
    }
  };
  return n;
});