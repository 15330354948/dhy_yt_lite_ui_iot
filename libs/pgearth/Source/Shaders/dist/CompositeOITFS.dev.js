"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D u_opaque;\nuniform sampler2D u_accumulation;\nuniform sampler2D u_revealage;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\nvec4 opaque = texture2D(u_opaque, v_textureCoordinates);\nvec4 accum = texture2D(u_accumulation, v_textureCoordinates);\nfloat r = texture2D(u_revealage, v_textureCoordinates).r;\n#ifdef MRT\nvec4 transparent = vec4(accum.rgb / clamp(r, 1e-4, 5e4), accum.a);\n#else\nvec4 transparent = vec4(accum.rgb / clamp(accum.a, 1e-4, 5e4), r);\n#endif\ngl_FragColor = (1.0 - transparent.a) * transparent + transparent.a * opaque;\nif (opaque != czm_backgroundColor)\n{\ngl_FragColor.a = 1.0;\n}\n}\n";
});