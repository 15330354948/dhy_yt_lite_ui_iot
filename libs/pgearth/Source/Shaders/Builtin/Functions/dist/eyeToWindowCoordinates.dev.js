"use strict";

define(function () {
  "use strict";

  return "vec4 czm_eyeToWindowCoordinates(vec4 positionEC)\n{\nvec4 q = czm_projection * positionEC;\nq.xyz /= q.w;\nq.xyz = (czm_viewportTransformation * vec4(q.xyz, 1.0)).xyz;\nreturn q;\n}\n";
});