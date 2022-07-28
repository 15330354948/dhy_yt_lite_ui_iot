"use strict";

define(["./defaultValue", "./defined"], function (t, i) {
  "use strict";

  function h(n, e, i) {
    this.heading = t(n, 0), this.pitch = t(e, 0), this.range = t(i, 0);
  }

  return h.clone = function (n, e) {
    if (i(n)) return i(e) || (e = new h()), e.heading = n.heading, e.pitch = n.pitch, e.range = n.range, e;
  }, h;
});