"use strict";

define(function () {
  "use strict";

  return "float czm_alphaWeight(float a)\n{\nfloat z = (gl_FragCoord.z - czm_viewportTransformation[3][2]) / czm_viewportTransformation[2][2];\nreturn pow(a + 0.01, 4.0) + max(1e-2, min(3.0 * 1e3, 0.003 / (1e-5 + pow(abs(z) / 200.0, 4.0))));\n}\n";
});