"use strict";

define(["./defined", "./DeveloperError"], function (a, f) {
  "use strict";

  return function (r, e) {
    if (!a(r)) throw new f("array is required.");
    if (!a(e) || e < 1) throw new f("numberOfArrays must be greater than 0.");

    for (var n = [], t = r.length, i = 0; i < t;) {
      var u = Math.ceil((t - i) / e--);
      n.push(r.slice(i, i + u)), i += u;
    }

    return n;
  };
});