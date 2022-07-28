"use strict";

define(function () {
  "use strict";

  return "mat3 czm_eastNorthUpToEyeCoordinates(vec3 positionMC, vec3 normalEC)\n{\nvec3 tangentMC = normalize(vec3(-positionMC.y, positionMC.x, 0.0));\nvec3 tangentEC = normalize(czm_normal3D * tangentMC);\nvec3 bitangentEC = normalize(cross(normalEC, tangentEC));\nreturn mat3(\ntangentEC.x,   tangentEC.y,   tangentEC.z,\nbitangentEC.x, bitangentEC.y, bitangentEC.z,\nnormalEC.x,    normalEC.y,    normalEC.z);\n}\n";
});