"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position3DHigh;\nattribute vec3 position3DLow;\nattribute vec2 st;\nattribute float batchId;\nvarying vec3 v_positionMC;\nvarying vec3 v_positionEC;\nvarying vec2 v_st;\nvoid main()\n{\nvec4 p = czm_computePosition();\nv_positionMC = position3DHigh + position3DLow;\nv_positionEC = (czm_modelViewRelativeToEye * p).xyz;\nv_st = st;\ngl_Position = czm_modelViewProjectionRelativeToEye * p;\n}\n";
});