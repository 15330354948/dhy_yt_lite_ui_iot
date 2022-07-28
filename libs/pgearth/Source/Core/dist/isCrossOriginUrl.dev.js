"use strict";

define(["./defined"], function (t) {
  "use strict";

  var n;
  return function (e) {
    t(n) || (n = document.createElement("a")), n.href = window.location.href;
    var r = n.host,
        o = n.protocol;
    return n.href = e, n.href = n.href, o !== n.protocol || r !== n.host;
  };
});