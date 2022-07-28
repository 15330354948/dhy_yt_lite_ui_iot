"use strict";

define(["../Core/Color", "../Core/DeveloperError", "../Core/Resource", "./ColorMaterialProperty", "./createPropertyDescriptor", "./ImageMaterialProperty"], function (n, t, o, i, a, f) {
  "use strict";

  function c(e) {
    if (e instanceof n) return new i(e);

    if ("string" == typeof e || e instanceof o || e instanceof HTMLCanvasElement || e instanceof HTMLVideoElement) {
      var r = new f();
      return r.image = e, r;
    }

    throw new t("Unable to infer material type: " + e);
  }

  return function (e, r) {
    return a(e, r, c);
  };
});