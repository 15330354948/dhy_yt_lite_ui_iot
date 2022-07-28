"use strict";

define(["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (i, s, u) {
  "use strict";

  return function (r) {
    if (!s(r)) throw new u("uri is required.");
    var e = new i(r);
    e.normalize();
    var n = e.path,
        t = n.lastIndexOf("/");
    return -1 !== t && (n = n.substr(t + 1)), n = -1 === (t = n.lastIndexOf(".")) ? "" : n.substr(t + 1);
  };
});