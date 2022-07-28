"use strict";

define(function () {
  "use strict";

  return "vec4 czm_modelToWindowCoordinates(vec4 position)\n{\nvec4 q = czm_modelViewProjection * position;\nq.xyz /= q.w;\nq.xyz = (czm_viewportTransformation * vec4(q.xyz, 1.0)).xyz;\nreturn q;\n}\n";
});