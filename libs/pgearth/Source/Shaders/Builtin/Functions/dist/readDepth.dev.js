"use strict";

define(function () {
  "use strict";

  return "float czm_readDepth(sampler2D depthTexture, vec2 texCoords)\n{\nreturn czm_reverseLogDepth(texture2D(depthTexture, texCoords).r);\n}\n";
});