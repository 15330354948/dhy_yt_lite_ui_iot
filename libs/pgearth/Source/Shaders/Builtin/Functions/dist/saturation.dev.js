"use strict";

define(function () {
  "use strict";

  return "vec3 czm_saturation(vec3 rgb, float adjustment)\n{\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nvec3 intensity = vec3(dot(rgb, W));\nreturn mix(intensity, rgb, adjustment);\n}\n";
});