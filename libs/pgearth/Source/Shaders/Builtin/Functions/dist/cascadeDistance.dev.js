"use strict";

define(function () {
  "use strict";

  return "uniform vec4 shadowMap_cascadeDistances;\nfloat czm_cascadeDistance(vec4 weights)\n{\nreturn dot(shadowMap_cascadeDistances, weights);\n}\n";
});