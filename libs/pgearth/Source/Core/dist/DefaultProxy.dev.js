"use strict";

define(function () {
  "use strict";

  function t(t) {
    this.proxy = t;
  }

  return t.prototype.getURL = function (t) {
    var n = -1 === this.proxy.indexOf("?") ? "?" : "";
    return this.proxy + n + encodeURIComponent(t);
  }, t;
});