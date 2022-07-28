"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D u_texture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\ngl_FragColor = texture2D(u_texture, v_textureCoordinates);\n}\n";
});