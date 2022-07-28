"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position3DHigh;\nattribute vec3 position3DLow;\nattribute vec3 normal;\nattribute float batchId;\nvarying vec3 v_positionEC;\nvarying vec3 v_normalEC;\nvoid main()\n{\nvec4 p = czm_computePosition();\nv_positionEC = (czm_modelViewRelativeToEye * p).xyz;\nv_normalEC = czm_normal * normal;\ngl_Position = czm_modelViewProjectionRelativeToEye * p;\n}\n";
});