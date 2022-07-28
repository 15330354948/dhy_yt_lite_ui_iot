"use strict";

define(function () {
  "use strict";

  return "float czm_getSpecular(vec3 lightDirectionEC, vec3 toEyeEC, vec3 normalEC, float shininess)\n{\nvec3 toReflectedLight = reflect(-lightDirectionEC, normalEC);\nfloat specular = max(dot(toReflectedLight, toEyeEC), 0.0);\nreturn pow(specular, max(shininess, czm_epsilon2));\n}\n";
});