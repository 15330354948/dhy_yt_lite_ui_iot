"use strict";

define(function () {
  "use strict";

  return "struct czm_shadowParameters\n{\n#ifdef USE_CUBE_MAP_SHADOW\nvec3 texCoords;\n#else\nvec2 texCoords;\n#endif\nfloat depthBias;\nfloat depth;\nfloat nDotL;\nvec2 texelStepSize;\nfloat normalShadingSmooth;\nfloat darkness;\n};\n";
});