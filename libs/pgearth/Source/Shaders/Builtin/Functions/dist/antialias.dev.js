"use strict";

define(function () {
  "use strict";

  return "vec4 czm_antialias(vec4 color1, vec4 color2, vec4 currentColor, float dist, float fuzzFactor)\n{\nfloat val1 = clamp(dist / fuzzFactor, 0.0, 1.0);\nfloat val2 = clamp((dist - 0.5) / fuzzFactor, 0.0, 1.0);\nval1 = val1 * (1.0 - val2);\nval1 = val1 * val1 * (3.0 - (2.0 * val1));\nval1 = pow(val1, 0.5);\nvec4 midColor = (color1 + color2) * 0.5;\nreturn mix(midColor, currentColor, val1);\n}\nvec4 czm_antialias(vec4 color1, vec4 color2, vec4 currentColor, float dist)\n{\nreturn czm_antialias(color1, color2, currentColor, dist, 0.1);\n}\n";
});