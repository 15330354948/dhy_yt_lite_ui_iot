"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\ngl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n}\n";
});