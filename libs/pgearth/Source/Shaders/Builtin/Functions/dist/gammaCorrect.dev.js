"use strict";

define(function () {
  "use strict";

  return "vec3 czm_gammaCorrect(vec3 color) {\n#ifdef HDR\ncolor = pow(color, vec3(czm_gamma));\n#endif\nreturn color;\n}\nvec4 czm_gammaCorrect(vec4 color) {\n#ifdef HDR\ncolor.rgb = pow(color.rgb, vec3(czm_gamma));\n#endif\nreturn color;\n}\n";
});