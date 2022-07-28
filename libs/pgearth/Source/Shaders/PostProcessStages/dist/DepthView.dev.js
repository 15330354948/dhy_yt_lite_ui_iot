"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D depthTexture;\nvarying vec2 v_textureCoordinates;\nvoid main(void)\n{\nfloat depth = czm_readDepth(depthTexture, v_textureCoordinates);\ngl_FragColor = vec4(vec3(depth), 1.0);\n}\n";
});