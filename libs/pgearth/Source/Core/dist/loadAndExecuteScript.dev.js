"use strict";

define(["../ThirdParty/when"], function (o) {
  "use strict";

  return function (e) {
    var n = o.defer(),
        r = document.createElement("script");
    r.async = !0, r.src = e;
    var t = document.getElementsByTagName("head")[0];
    return r.onload = function () {
      r.onload = void 0, t.removeChild(r), n.resolve();
    }, r.onerror = function (e) {
      n.reject(e);
    }, t.appendChild(r), n.promise;
  };
});