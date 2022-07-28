"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position3DHigh;\nattribute vec3 position3DLow;\nattribute vec3 prevPosition3DHigh;\nattribute vec3 prevPosition3DLow;\nattribute vec3 nextPosition3DHigh;\nattribute vec3 nextPosition3DLow;\nattribute vec2 expandAndWidth;\nattribute vec2 st;\nattribute float batchId;\nvarying float v_width;\nvarying vec2 v_st;\nvarying float v_polylineAngle;\nvoid main()\n{\nfloat expandDir = expandAndWidth.x;\nfloat width = abs(expandAndWidth.y) + 0.5;\nbool usePrev = expandAndWidth.y < 0.0;\nvec4 p = czm_computePosition();\nvec4 prev = czm_computePrevPosition();\nvec4 next = czm_computeNextPosition();\nv_width = width;\nv_st = st;\nvec4 positionWC = getPolylineWindowCoordinates(p, prev, next, expandDir, width, usePrev, v_polylineAngle);\ngl_Position = czm_viewportOrthographic * positionWC;\n#ifdef LOG_DEPTH\nczm_vertexLogDepth(czm_modelViewProjectionRelativeToEye * p);\n#endif\n}\n";
});