"use strict";

define(function () {
  "use strict";

  return "vec4 czm_translateRelativeToEye(vec3 high, vec3 low)\n{\nvec3 highDifference = high - czm_encodedCameraPositionMCHigh;\nvec3 lowDifference = low - czm_encodedCameraPositionMCLow;\nreturn vec4(highDifference + lowDifference, 1.0);\n}\n";
});