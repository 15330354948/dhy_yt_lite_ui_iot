"use strict";

define(["./defined"], function (r) {
  "use strict";

  function t(t) {
    var r;
    this.name = "DeveloperError", this.message = t;

    try {
      throw new Error();
    } catch (t) {
      r = t.stack;
    }

    this.stack = r;
  }

  return r(Object.create) && ((t.prototype = Object.create(Error.prototype)).constructor = t), t.prototype.toString = function () {
    var t = this.name + ": " + this.message;
    return r(this.stack) && (t += "\n" + this.stack.toString()), t;
  }, t.throwInstantiationError = function () {
    throw new t("This function defines an interface and should not be called directly.");
  }, t;
});