"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position3DHigh;\nattribute vec3 position3DLow;\nattribute vec4 color;\nattribute float batchId;\nvarying vec4 v_color;\nvoid main()\n{\nvec4 p = czm_computePosition();\nv_color = color;\ngl_Position = czm_modelViewProjectionRelativeToEye * p;\n}\n";
});