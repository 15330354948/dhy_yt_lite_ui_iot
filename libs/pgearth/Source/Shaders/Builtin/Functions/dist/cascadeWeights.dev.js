"use strict";

define(function () {
  "use strict";

  return "uniform vec4 shadowMap_cascadeSplits[2];\nvec4 czm_cascadeWeights(float depthEye)\n{\nvec4 near = step(shadowMap_cascadeSplits[0], vec4(depthEye));\nvec4 far = step(depthEye, shadowMap_cascadeSplits[1]);\nreturn near * far;\n}\n";
});