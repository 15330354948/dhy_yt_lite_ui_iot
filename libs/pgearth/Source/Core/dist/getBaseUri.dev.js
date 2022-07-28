"use strict";

define(["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (t, u, f) {
  "use strict";

  return function (r, e) {
    if (!u(r)) throw new f("uri is required.");
    var n = "",
        i = r.lastIndexOf("/");
    return -1 !== i && (n = r.substring(0, i + 1)), e && (r = new t(r), u(r.query) && (n += "?" + r.query), u(r.fragment) && (n += "#" + r.fragment)), n;
  };
});