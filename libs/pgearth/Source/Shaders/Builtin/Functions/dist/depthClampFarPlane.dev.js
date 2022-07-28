"use strict";

define(function () {
  "use strict";

  return "#ifndef LOG_DEPTH\nvarying float v_WindowZ;\n#endif\nvec4 czm_depthClampFarPlane(vec4 coords)\n{\n#ifndef LOG_DEPTH\nv_WindowZ = (0.5 * (coords.z / coords.w) + 0.5) * coords.w;\ncoords.z = min(coords.z, coords.w);\n#endif\nreturn coords;\n}\n";
});