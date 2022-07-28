"use strict";

define(["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (t, u, a) {
  "use strict";

  return function (r) {
    if (!u(r)) throw new a("uri is required.");
    var e = new t(r);
    e.normalize();
    var i = e.path,
        n = i.lastIndexOf("/");
    return -1 !== n && (i = i.substr(n + 1)), i;
  };
});