"use strict";

define(function () {
  "use strict";

  return "vec3 czm_sphericalHarmonics(vec3 normal, vec3 coefficients[9])\n{\nconst float c1 = 0.429043;\nconst float c2 = 0.511664;\nconst float c3 = 0.743125;\nconst float c4 = 0.886227;\nconst float c5 = 0.247708;\nvec3 L00 = coefficients[0];\nvec3 L1_1 = coefficients[1];\nvec3 L10 = coefficients[2];\nvec3 L11 = coefficients[3];\nvec3 L2_2 = coefficients[4];\nvec3 L2_1 = coefficients[5];\nvec3 L20 = coefficients[6];\nvec3 L21 = coefficients[7];\nvec3 L22 = coefficients[8];\nfloat x = normal.x;\nfloat y = normal.y;\nfloat z = normal.z;\nreturn c1 * L22 * (x * x - y * y) + c3 * L20 * z * z + c4 * L00 - c5 * L20 +\n2.0 * c1 * (L2_2 * x * y + L21 * x * z + L2_1 * y * z) +\n2.0 * c2 * (L11 * x + L1_1 * y + L10 * z);\n}\n";
});