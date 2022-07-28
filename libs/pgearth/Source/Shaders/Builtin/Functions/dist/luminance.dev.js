"use strict";

define(function () {
  "use strict";

  return "float czm_luminance(vec3 rgb)\n{\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nreturn dot(rgb, W);\n}\n";
});