"use strict";

define(["./ForEach", "../../Core/defined"], function (n, i) {
  "use strict";

  function t(e) {
    e.extras = i(e.extras) ? e.extras : {}, e.extras._pipeline = i(e.extras._pipeline) ? e.extras._pipeline : {};
  }

  return function (e) {
    return n.shader(e, function (e) {
      t(e);
    }), n.buffer(e, function (e) {
      t(e);
    }), n.image(e, function (e) {
      t(e), n.compressedImage(e, function (e) {
        t(e);
      });
    }), t(e), e;
  };
});