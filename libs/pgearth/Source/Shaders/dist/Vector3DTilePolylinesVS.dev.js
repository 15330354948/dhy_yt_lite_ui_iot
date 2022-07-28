"use strict";

define(function () {
  "use strict";

  return "attribute vec4 currentPosition;\nattribute vec4 previousPosition;\nattribute vec4 nextPosition;\nattribute vec2 expandAndWidth;\nattribute float a_batchId;\nuniform mat4 u_modifiedModelView;\nvoid main()\n{\nfloat expandDir = expandAndWidth.x;\nfloat width = abs(expandAndWidth.y) + 0.5;\nbool usePrev = expandAndWidth.y < 0.0;\nvec4 p = u_modifiedModelView * currentPosition;\nvec4 prev = u_modifiedModelView * previousPosition;\nvec4 next = u_modifiedModelView * nextPosition;\nfloat angle;\nvec4 positionWC = getPolylineWindowCoordinatesEC(p, prev, next, expandDir, width, usePrev, angle);\ngl_Position = czm_viewportOrthographic * positionWC;\n#ifdef LOG_DEPTH\nczm_vertexLogDepth(czm_projection * p);\n#endif\n}\n";
});