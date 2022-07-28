"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform float brightness;\nvarying vec2 v_textureCoordinates;\nvoid main(void)\n{\nvec3 rgb = texture2D(colorTexture, v_textureCoordinates).rgb;\nvec3 target = vec3(0.0);\ngl_FragColor = vec4(mix(target, rgb, brightness), 1.0);\n}\n";
});