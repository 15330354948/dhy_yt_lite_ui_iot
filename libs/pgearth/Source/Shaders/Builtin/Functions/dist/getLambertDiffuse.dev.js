"use strict";

define(function () {
  "use strict";

  return "float czm_getLambertDiffuse(vec3 lightDirectionEC, vec3 normalEC)\n{\nreturn max(dot(lightDirectionEC, normalEC), 0.0);\n}\n";
});