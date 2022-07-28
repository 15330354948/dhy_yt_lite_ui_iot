"use strict";

define(["../Core/defined", "../Core/defineProperties"], function (A, e) {
  "use strict";

  function n(A) {}

  var r;
  return n.prototype.isReady = function () {
    return !0;
  }, n.prototype.shouldDiscardImage = function (A) {
    return n.EMPTY_IMAGE === A;
  }, e(n, {
    EMPTY_IMAGE: {
      get: function get() {
        return A(r) || ((r = new Image()).src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="), r;
      }
    }
  }), n;
});