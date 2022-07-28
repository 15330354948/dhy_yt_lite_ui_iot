"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position;\nuniform vec3 u_radii;\nvarying vec3 v_positionEC;\nvoid main()\n{\nvec4 p = vec4(u_radii * position, 1.0);\nv_positionEC = (czm_modelView * p).xyz;\ngl_Position = czm_modelViewProjection * p;\ngl_Position.z = clamp(gl_Position.z, czm_depthRange.near, czm_depthRange.far);\nczm_vertexLogDepth();\n}\n";
});