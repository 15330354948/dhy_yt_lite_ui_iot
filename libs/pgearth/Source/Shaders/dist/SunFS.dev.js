"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D u_texture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\nvec4 color = texture2D(u_texture, v_textureCoordinates);\ngl_FragColor = czm_gammaCorrect(color);\n}\n";
});