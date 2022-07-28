"use strict";

define(["../Core/Check"], function (l) {
  "use strict";

  return function (n, i, e) {
    return l.typeOf.string("samplerUniformName", n), l.typeOf.string("matrixUniformName", i), l.typeOf.string("styleUniformName", e), "    float clipDistance = clip(gl_FragCoord, " + n + ", " + i + "); \n    vec4 clippingPlanesEdgeColor = vec4(1.0); \n    clippingPlanesEdgeColor.rgb = " + e + ".rgb; \n    float clippingPlanesEdgeWidth = " + e + ".a; \n    if (clipDistance > 0.0 && clipDistance < clippingPlanesEdgeWidth) \n    { \n        gl_FragColor = clippingPlanesEdgeColor;\n    } \n";
  };
});