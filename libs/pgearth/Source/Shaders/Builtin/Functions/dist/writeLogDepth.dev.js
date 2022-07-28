"use strict";

define(function () {
  "use strict";

  return "#ifdef LOG_DEPTH\nvarying float v_logZ;\n#endif\nvoid czm_writeLogDepth(float logZ)\n{\n#if defined(GL_EXT_frag_depth) && defined(LOG_DEPTH) && !defined(DISABLE_LOG_DEPTH_FRAGMENT_WRITE)\nfloat halfLogFarDistance = czm_log2FarDistance * 0.5;\nfloat depth = log2(logZ);\nif (depth < czm_log2NearDistance) {\ndiscard;\n}\ngl_FragDepthEXT = depth * halfLogFarDistance;\n#endif\n}\nvoid czm_writeLogDepth() {\n#ifdef LOG_DEPTH\nczm_writeLogDepth(v_logZ);\n#endif\n}\n";
});