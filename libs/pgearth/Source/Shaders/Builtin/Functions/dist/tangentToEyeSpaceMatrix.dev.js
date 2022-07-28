"use strict";

define(function () {
  "use strict";

  return "mat3 czm_tangentToEyeSpaceMatrix(vec3 normalEC, vec3 tangentEC, vec3 bitangentEC)\n{\nvec3 normal = normalize(normalEC);\nvec3 tangent = normalize(tangentEC);\nvec3 bitangent = normalize(bitangentEC);\nreturn mat3(tangent.x  , tangent.y  , tangent.z,\nbitangent.x, bitangent.y, bitangent.z,\nnormal.x   , normal.y   , normal.z);\n}\n";
});