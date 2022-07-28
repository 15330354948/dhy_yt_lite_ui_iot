"use strict";

define(function () {
  "use strict";

  return "float czm_nearFarScalar(vec4 nearFarScalar, float cameraDistSq)\n{\nfloat valueAtMin = nearFarScalar.y;\nfloat valueAtMax = nearFarScalar.w;\nfloat nearDistanceSq = nearFarScalar.x * nearFarScalar.x;\nfloat farDistanceSq = nearFarScalar.z * nearFarScalar.z;\nfloat t = (cameraDistSq - nearDistanceSq) / (farDistanceSq - nearDistanceSq);\nt = pow(clamp(t, 0.0, 1.0), 0.2);\nreturn mix(valueAtMin, valueAtMax, t);\n}\n";
});