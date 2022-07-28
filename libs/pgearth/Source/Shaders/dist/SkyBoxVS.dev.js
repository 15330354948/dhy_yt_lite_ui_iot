"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position;\nvarying vec3 v_texCoord;\nvoid main()\n{\nvec3 p = czm_viewRotation * (czm_temeToPseudoFixed * (czm_entireFrustum.y * position));\ngl_Position = czm_projection * vec4(p, 1.0);\nv_texCoord = position.xyz;\n}\n";
});