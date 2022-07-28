"use strict";

define(function () {
  "use strict";

  return "vec4 czm_cascadeColor(vec4 weights)\n{\nreturn vec4(1.0, 0.0, 0.0, 1.0) * weights.x +\nvec4(0.0, 1.0, 0.0, 1.0) * weights.y +\nvec4(0.0, 0.0, 1.0, 1.0) * weights.z +\nvec4(1.0, 0.0, 1.0, 1.0) * weights.w;\n}\n";
});