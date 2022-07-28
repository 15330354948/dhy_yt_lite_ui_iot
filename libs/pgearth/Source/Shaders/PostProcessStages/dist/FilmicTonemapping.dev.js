"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nvarying vec2 v_textureCoordinates;\n#ifdef AUTO_EXPOSURE\nuniform sampler2D autoExposure;\n#endif\nvoid main()\n{\nvec4 fragmentColor = texture2D(colorTexture, v_textureCoordinates);\nvec3 color = fragmentColor.rgb;\n#ifdef AUTO_EXPOSURE\nfloat exposure = texture2D(autoExposure, vec2(0.5)).r;\ncolor /= exposure;\n#endif\nconst float A = 0.22;\nconst float B = 0.30;\nconst float C = 0.10;\nconst float D = 0.20;\nconst float E = 0.01;\nconst float F = 0.30;\nconst float white = 11.2;\nvec3 c = ((color * (A * color + C * B) + D * E) / (color * ( A * color + B) + D * F)) - E / F;\nfloat w = ((white * (A * white + C * B) + D * E) / (white * ( A * white + B) + D * F)) - E / F;\nc = czm_inverseGamma(c / w);\ngl_FragColor = vec4(c, fragmentColor.a);\n}\n";
});