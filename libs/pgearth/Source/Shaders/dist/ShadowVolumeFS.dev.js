"use strict";

define(function () {
  "use strict";

  return "#ifdef GL_EXT_frag_depth\n#extension GL_EXT_frag_depth : enable\n#endif\n#ifdef VECTOR_TILE\nuniform vec4 u_highlightColor;\n#endif\nvoid main(void)\n{\n#ifdef VECTOR_TILE\ngl_FragColor = czm_gammaCorrect(u_highlightColor);\n#else\ngl_FragColor = vec4(1.0);\n#endif\nczm_writeDepthClampedToFarPlane();\n}\n";
});