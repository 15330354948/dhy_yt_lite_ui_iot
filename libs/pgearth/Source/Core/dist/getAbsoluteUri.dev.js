"use strict";

define(["../ThirdParty/Uri", "./defaultValue", "./defined", "./DeveloperError"], function (t, o, u, f) {
  "use strict";

  function i(e, r) {
    var n;
    return "undefined" != typeof document && (n = document), i._implementation(e, r, n);
  }

  return i._implementation = function (e, r, n) {
    if (!u(e)) throw new f("relative uri is required.");

    if (!u(r)) {
      if (void 0 === n) return e;
      r = o(n.baseURI, n.location.href);
    }

    var i = new t(r);
    return new t(e).resolve(i).toString();
  }, i;
});