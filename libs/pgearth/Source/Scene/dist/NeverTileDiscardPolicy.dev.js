"use strict";

define([], function () {
  "use strict";

  function t(t) {}

  return t.prototype.isReady = function () {
    return !0;
  }, t.prototype.shouldDiscardImage = function (t) {
    return !1;
  }, t;
});