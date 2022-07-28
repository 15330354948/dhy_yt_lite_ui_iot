"use strict";

define(["../Core/Check", "../Core/defined", "../Core/DeveloperError", "../Core/Resource", "../ThirdParty/when", "./CubeMap"], function (a, n, o, v, c, d) {
  "use strict";

  return function (t, e) {
    if (a.defined("context", t), !(n(e) && n(e.positiveX) && n(e.negativeX) && n(e.positiveY) && n(e.negativeY) && n(e.positiveZ) && n(e.negativeZ))) throw new o("urls is required and must have positiveX, negativeX, positiveY, negativeY, positiveZ, and negativeZ properties.");
    var i = {
      flipY: !0,
      preferImageBitmap: !0
    },
        r = [v.createIfNeeded(e.positiveX).fetchImage(i), v.createIfNeeded(e.negativeX).fetchImage(i), v.createIfNeeded(e.positiveY).fetchImage(i), v.createIfNeeded(e.negativeY).fetchImage(i), v.createIfNeeded(e.positiveZ).fetchImage(i), v.createIfNeeded(e.negativeZ).fetchImage(i)];
    return c.all(r, function (e) {
      return new d({
        context: t,
        source: {
          positiveX: e[0],
          negativeX: e[1],
          positiveY: e[2],
          negativeY: e[3],
          positiveZ: e[4],
          negativeZ: e[5]
        }
      });
    });
  };
});