"use strict";

define(["./ForEach", "../../Core/defined"], function (n, t) {
  "use strict";

  function i(e) {
    t(e.extras) && (t(e.extras._pipeline) && delete e.extras._pipeline, 0 === Object.keys(e.extras).length && delete e.extras);
  }

  return function (e) {
    return n.shader(e, function (e) {
      i(e);
    }), n.buffer(e, function (e) {
      i(e);
    }), n.image(e, function (e) {
      i(e), n.compressedImage(e, function (e) {
        i(e);
      });
    }), i(e), e;
  };
});