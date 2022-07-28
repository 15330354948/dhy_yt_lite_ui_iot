"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position;\nvarying vec2 depth;\nvoid main()\n{\nvec4 pos = vec4(position.xyz,1.0);\ndepth = pos.zw;\npos.z = 0.0;\ngl_Position = czm_projection*pos;\n}\n";
});