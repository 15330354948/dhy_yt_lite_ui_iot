"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nvarying vec2 v_textureCoordinates;\n#ifdef AUTO_EXPOSURE\nuniform sampler2D autoExposure;\n#endif\nvoid main()\n{\nvec4 fragmentColor = texture2D(colorTexture, v_textureCoordinates);\nvec3 color = fragmentColor.rgb;\n#ifdef AUTO_EXPOSURE\nfloat exposure = texture2D(autoExposure, vec2(0.5)).r;\ncolor /= exposure;\n#endif\ncolor = color / (1.0 + color);\ncolor = czm_inverseGamma(color);\ngl_FragColor = vec4(color, fragmentColor.a);\n}\n";
});