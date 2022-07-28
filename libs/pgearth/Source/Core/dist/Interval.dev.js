"use strict";

define(["./defaultValue"], function (i) {
  "use strict";

  return function (t, e) {
    this.start = i(t, 0), this.stop = i(e, 0);
  };
});