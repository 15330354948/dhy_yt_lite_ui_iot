"use strict";

define(function () {
  "use strict";

  return "varying vec2 depth;\nvec4 packDepth(float depth)\n{\nconst vec4 bias = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);\nfloat r = depth;\nfloat g = fract(r * 255.0);\nfloat b = fract(g * 255.0);\nfloat a = fract(b * 255.0);\nvec4 color = vec4(r, g, b, a);\nreturn color - (color.yzww * bias);\n}\nvoid main()\n{\nfloat fDepth = (depth.x / 5000.0)/2.0 + 0.5;\ngl_FragColor = packDepth(fDepth);\n}\n";
});