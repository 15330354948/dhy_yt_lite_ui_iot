"use strict";

define(function () {
  "use strict";

  return "float czm_branchFreeTernary(bool comparison, float a, float b) {\nfloat useA = float(comparison);\nreturn a * useA + b * (1.0 - useA);\n}\nvec2 czm_branchFreeTernary(bool comparison, vec2 a, vec2 b) {\nfloat useA = float(comparison);\nreturn a * useA + b * (1.0 - useA);\n}\nvec3 czm_branchFreeTernary(bool comparison, vec3 a, vec3 b) {\nfloat useA = float(comparison);\nreturn a * useA + b * (1.0 - useA);\n}\nvec4 czm_branchFreeTernary(bool comparison, vec4 a, vec4 b) {\nfloat useA = float(comparison);\nreturn a * useA + b * (1.0 - useA);\n}\n";
});