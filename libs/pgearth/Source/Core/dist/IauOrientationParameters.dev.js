"use strict";

define(function () {
  "use strict";

  return function (t, i, n, o) {
    this.rightAscension = t, this.declination = i, this.rotation = n, this.rotationRate = o;
  };
});