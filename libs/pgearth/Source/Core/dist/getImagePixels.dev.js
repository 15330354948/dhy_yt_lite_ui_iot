"use strict";

define(["./defined"], function (d) {
  "use strict";

  var o = {};
  return function (e, t, a) {
    d(t) || (t = e.width), d(a) || (a = e.height);
    var n = o[t];
    d(n) || (n = {}, o[t] = n);
    var i,
        r = n[a];
    return d(r) || ((i = document.createElement("canvas")).width = t, i.height = a, (r = i.getContext("2d")).globalCompositeOperation = "copy", n[a] = r), r.drawImage(e, 0, 0, t, a), r.getImageData(0, 0, t, a).data;
  };
});