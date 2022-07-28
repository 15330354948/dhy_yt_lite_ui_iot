"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform sampler2D bloomTexture;\nuniform bool  glowOnly;\nvarying vec2 v_textureCoordinates;\nvoid main(void)\n{\nvec4 bloom = texture2D(bloomTexture, v_textureCoordinates);\nvec4 color = texture2D(colorTexture, v_textureCoordinates);\ngl_FragColor = glowOnly ? bloom : bloom + color;\n}\n";
});