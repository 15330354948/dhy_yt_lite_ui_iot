"use strict";

define(function () {
  "use strict";

  return "#ifdef LOG_DEPTH\nvarying float v_logZ;\n#ifdef SHADOW_MAP\nvarying vec3 v_logPositionEC;\n#endif\n#endif\nvoid czm_updatePositionDepth() {\n#if defined(LOG_DEPTH) && !defined(DISABLE_GL_POSITION_LOG_DEPTH)\nvec3 logPositionEC = (czm_inverseProjection * gl_Position).xyz;\n#ifdef SHADOW_MAP\nv_logPositionEC = logPositionEC;\n#endif\n#ifdef ENABLE_GL_POSITION_LOG_DEPTH_AT_HEIGHT\nif (length(logPositionEC) < 2.0e6)\n{\nreturn;\n}\n#endif\ngl_Position.z = log2(max(1e-6, 1.0 + gl_Position.w)) * czm_log2FarDistance - 1.0;\ngl_Position.z *= gl_Position.w;\n#endif\n}\nvoid czm_vertexLogDepth()\n{\n#ifdef LOG_DEPTH\nv_logZ = 1.0 + gl_Position.w;\nczm_updatePositionDepth();\n#endif\n}\nvoid czm_vertexLogDepth(vec4 clipCoords)\n{\n#ifdef LOG_DEPTH\nv_logZ = 1.0 + clipCoords.w;\nczm_updatePositionDepth();\n#endif\n}\n";
});