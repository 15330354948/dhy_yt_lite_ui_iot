"use strict";

define(function () {
  "use strict";

  return "vec3 czm_inverseGamma(vec3 color) {\nreturn pow(color, vec3(1.0 / czm_gamma));\n}\n";
});