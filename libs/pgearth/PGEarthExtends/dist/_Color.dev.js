"use strict";

define(["../Source/Core/Color", "../Source/Core/defaultValue", "../Source/Core/defined", "../Source/Core/Math"], function (r, e, o, n) {
  return function (o) {
    if ("string" == typeof o) return r.fromCssColorString(o);
    if (o instanceof Array) return r(e(o[0], 1), e(o[1], 1), e(o[2], 1), e(o[3], 1));

    if (o instanceof Object) {
      var n = o.r,
          t = o.g,
          f = o.b,
          i = o.a;
      return r.fromBytes(n, t, f).withAlpha(i);
    }
  };
});