"use strict";

define(function () {
  "use strict";

  return "#ifdef MRT\n#extension GL_EXT_draw_buffers : enable\n#endif\nuniform vec4 u_bgColor;\nuniform sampler2D u_depthTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\nif (texture2D(u_depthTexture, v_textureCoordinates).r < 1.0)\n{\n#ifdef MRT\ngl_FragData[0] = u_bgColor;\ngl_FragData[1] = vec4(u_bgColor.a);\n#else\ngl_FragColor = u_bgColor;\n#endif\nreturn;\n}\ndiscard;\n}\n";
});