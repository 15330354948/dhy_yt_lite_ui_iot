"use strict";

define(function () {
  "use strict";

  return "#ifndef LOG_DEPTH\nvarying float v_WindowZ;\n#endif\nvoid czm_writeDepthClampedToFarPlane()\n{\n#if defined(GL_EXT_frag_depth) && !defined(LOG_DEPTH)\ngl_FragDepthEXT = min(v_WindowZ * gl_FragCoord.w, 1.0);\n#endif\n}\n";
});