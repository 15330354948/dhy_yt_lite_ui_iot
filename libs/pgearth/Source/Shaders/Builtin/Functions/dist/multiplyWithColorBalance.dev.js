"use strict";

define(function () {
  "use strict";

  return "vec3 czm_multiplyWithColorBalance(vec3 left, vec3 right)\n{\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nvec3 target = left * right;\nfloat leftLuminance = dot(left, W);\nfloat rightLuminance = dot(right, W);\nfloat targetLuminance = dot(target, W);\nreturn ((leftLuminance + rightLuminance) / (2.0 * targetLuminance)) * target;\n}\n";
});