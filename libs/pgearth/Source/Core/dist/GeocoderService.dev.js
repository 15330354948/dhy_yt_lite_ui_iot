"use strict";

define(["./DeveloperError"], function (r) {
  "use strict";

  function o() {}

  return o.prototype.geocode = r.throwInstantiationError, o;
});