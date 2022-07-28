"use strict";

define(function () {
  "use strict";

  return "uniform mat4 shadowMap_cascadeMatrices[4];\nmat4 czm_cascadeMatrix(vec4 weights)\n{\nreturn shadowMap_cascadeMatrices[0] * weights.x +\nshadowMap_cascadeMatrices[1] * weights.y +\nshadowMap_cascadeMatrices[2] * weights.z +\nshadowMap_cascadeMatrices[3] * weights.w;\n}\n";
});