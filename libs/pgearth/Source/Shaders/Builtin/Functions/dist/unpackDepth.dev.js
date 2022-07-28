"use strict";

define(function () {
  "use strict";

  return "float czm_unpackDepth(vec4 packedDepth)\n{\nreturn dot(packedDepth, vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0));\n}\n";
});