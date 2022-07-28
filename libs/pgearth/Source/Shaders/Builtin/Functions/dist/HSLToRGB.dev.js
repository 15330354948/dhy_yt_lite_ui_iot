"use strict";

define(function () {
  "use strict";

  return "vec3 hueToRGB(float hue)\n{\nfloat r = abs(hue * 6.0 - 3.0) - 1.0;\nfloat g = 2.0 - abs(hue * 6.0 - 2.0);\nfloat b = 2.0 - abs(hue * 6.0 - 4.0);\nreturn clamp(vec3(r, g, b), 0.0, 1.0);\n}\nvec3 czm_HSLToRGB(vec3 hsl)\n{\nvec3 rgb = hueToRGB(hsl.x);\nfloat c = (1.0 - abs(2.0 * hsl.z - 1.0)) * hsl.y;\nreturn (rgb - 0.5) * c + hsl.z;\n}\n";
});