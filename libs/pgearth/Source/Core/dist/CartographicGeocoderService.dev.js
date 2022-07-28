"use strict";

define(["../ThirdParty/when", "./Cartesian3", "./Check"], function (f, h, g) {
  "use strict";

  function e() {}

  return e.prototype.geocode = function (e) {
    g.typeOf.string("query", e);
    var t = e.match(/[^\s,\n]+/g);

    if (2 === t.length || 3 === t.length) {
      var i = +t[0],
          n = +t[1],
          r = 3 === t.length ? +t[2] : 300;
      if (isNaN(i) && isNaN(n)) for (var s = /^(\d+.?\d*)([nsew])/i, a = 0; a < t.length; ++a) {
        var o = t[a].match(s);
        s.test(t[a]) && 3 === o.length && (/^[ns]/i.test(o[2]) ? n = /^[n]/i.test(o[2]) ? +o[1] : -o[1] : /^[ew]/i.test(o[2]) && (i = /^[e]/i.test(o[2]) ? +o[1] : -o[1]));
      }

      if (!isNaN(i) && !isNaN(n) && !isNaN(r)) {
        var N = {
          displayName: e,
          destination: h.fromDegrees(i, n, r)
        };
        return f.resolve([N]);
      }
    }

    return f.resolve([]);
  }, e;
});