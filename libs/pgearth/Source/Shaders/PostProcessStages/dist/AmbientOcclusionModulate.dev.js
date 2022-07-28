"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform sampler2D ambientOcclusionTexture;\nuniform bool ambientOcclusionOnly;\nvarying vec2 v_textureCoordinates;\nvoid main(void)\n{\nvec3 color = texture2D(colorTexture, v_textureCoordinates).rgb;\nvec3 ao = texture2D(ambientOcclusionTexture, v_textureCoordinates).rgb;\ngl_FragColor.rgb = ambientOcclusionOnly ? ao : ao * color;\n}\n";
});