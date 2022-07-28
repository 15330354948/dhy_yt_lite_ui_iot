"use strict";

define(["../Core/defined"], function (t) {
  "use strict";

  function i(t) {
    this.type = "KmlTourWait", this.blocking = !0, this.duration = t, this.timeout = null;
  }

  return i.prototype.play = function (t) {
    var i = this;
    this.activeCallback = t, this.timeout = setTimeout(function () {
      delete i.activeCallback, t(!1);
    }, 1e3 * this.duration);
  }, i.prototype.stop = function () {
    clearTimeout(this.timeout), t(this.activeCallback) && this.activeCallback(!0);
  }, i;
});