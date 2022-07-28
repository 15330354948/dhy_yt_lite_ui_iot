"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position;\nattribute float a_batchId;\nuniform mat4 u_modifiedModelViewProjection;\nvoid main()\n{\ngl_Position = czm_depthClampFarPlane(u_modifiedModelViewProjection * vec4(position, 1.0));\n}\n";
});