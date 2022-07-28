"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D u_depthTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\ngl_FragColor = czm_packDepth(texture2D(u_depthTexture, v_textureCoordinates).r);\n}\n";
});