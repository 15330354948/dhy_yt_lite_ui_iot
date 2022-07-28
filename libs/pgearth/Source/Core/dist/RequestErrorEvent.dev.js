"use strict";

define(["./defined", "./parseResponseHeaders"], function (s, r) {
  "use strict";

  function e(e, s, t) {
    this.statusCode = e, this.response = s, this.responseHeaders = t, "string" == typeof this.responseHeaders && (this.responseHeaders = r(this.responseHeaders));
  }

  return e.prototype.toString = function () {
    var e = "Request has failed.";
    return s(this.statusCode) && (e += " Status Code: " + this.statusCode), e;
  }, e;
});