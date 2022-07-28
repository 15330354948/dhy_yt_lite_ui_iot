"use strict";

define(function () {
  "use strict";

  return "vec4 czm_packDepth(float depth)\n{\nvec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * depth;\nenc = fract(enc);\nenc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);\nreturn enc;\n}\n";
});