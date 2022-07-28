"use strict";

define(["./addToArray"], function (f) {
  "use strict";

  return function (e, t) {
    var r = {
      byteLength: t.length,
      extras: {
        _pipeline: {
          source: t
        }
      }
    },
        n = {
      buffer: f(e.buffers, r),
      byteOffset: 0,
      byteLength: t.length
    };
    return f(e.bufferViews, n);
  };
});