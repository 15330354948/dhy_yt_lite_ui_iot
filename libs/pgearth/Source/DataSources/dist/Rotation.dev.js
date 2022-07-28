"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/DeveloperError", "../Core/Math"], function (f, c, d, w) {
  "use strict";

  return {
    packedLength: 1,
    pack: function pack(r, e, n) {
      if (!c(r)) throw new d("value is required");
      if (!c(e)) throw new d("array is required");
      return e[n = f(n, 0)] = r, e;
    },
    unpack: function unpack(r, e, n) {
      if (!c(r)) throw new d("array is required");
      return r[e = f(e, 0)];
    },
    convertPackedArrayForInterpolation: function convertPackedArrayForInterpolation(r, e, n, t) {
      if (!c(r)) throw new d("packedArray is required");
      var i;
      e = f(e, 0);

      for (var a = 0, o = (n = f(n, r.length)) - e + 1; a < o; a++) {
        var u = r[e + a];
        0 === a || Math.abs(i - u) < Math.PI ? t[a] = u : t[a] = u - w.TWO_PI, i = u;
      }
    },
    unpackInterpolationResult: function unpackInterpolationResult(r, e, n, t, i) {
      if (!c(r)) throw new d("array is required");
      if (!c(e)) throw new d("sourceArray is required");
      return (i = r[0]) < 0 ? i + w.TWO_PI : i;
    }
  };
});