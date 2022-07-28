"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nvarying vec2 v_textureCoordinates;\n#ifdef AUTO_EXPOSURE\nuniform sampler2D autoExposure;\n#endif\nvoid main()\n{\nvec4 fragmentColor = texture2D(colorTexture, v_textureCoordinates);\nvec3 color = fragmentColor.rgb;\n#ifdef AUTO_EXPOSURE\ncolor /= texture2D(autoExposure, vec2(0.5)).r;\n#endif\nfloat g = 0.985;\nfloat a = 0.065;\nfloat b = 0.0001;\nfloat c = 0.433;\nfloat d = 0.238;\ncolor = (color * (color + a) - b) / (color * (g * color + c) + d);\ncolor = clamp(color, 0.0, 1.0);\ncolor = czm_inverseGamma(color);\ngl_FragColor = vec4(color, fragmentColor.a);\n}\n";
});