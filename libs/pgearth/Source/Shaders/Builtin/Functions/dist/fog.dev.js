"use strict";

define(function () {
  "use strict";

  return "vec3 czm_fog(float distanceToCamera, vec3 color, vec3 fogColor)\n{\nfloat scalar = distanceToCamera * czm_fogDensity;\nfloat fog = 1.0 - exp(-(scalar * scalar));\nreturn mix(color, fogColor, fog);\n}\nvec3 czm_fog(float distanceToCamera, vec3 color, vec3 fogColor, float fogModifierConstant)\n{\nfloat scalar = distanceToCamera * czm_fogDensity;\nfloat fog = 1.0 - exp(-((fogModifierConstant * scalar + fogModifierConstant) * (scalar * (1.0 + fogModifierConstant))));\nreturn mix(color, fogColor, fog);\n}\n";
});