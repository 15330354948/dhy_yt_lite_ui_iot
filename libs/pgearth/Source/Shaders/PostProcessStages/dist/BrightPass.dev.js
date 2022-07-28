"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform float avgLuminance;\nuniform float threshold;\nuniform float offset;\nvarying vec2 v_textureCoordinates;\nfloat key(float avg)\n{\nfloat guess = 1.5 - (1.5 / (avg * 0.1 + 1.0));\nreturn max(0.0, guess) + 0.1;\n}\nvoid main()\n{\nvec4 color = texture2D(colorTexture, v_textureCoordinates);\nvec3 xyz = czm_RGBToXYZ(color.rgb);\nfloat luminance = xyz.r;\nfloat scaledLum = key(avgLuminance) * luminance / avgLuminance;\nfloat brightLum = max(scaledLum - threshold, 0.0);\nfloat brightness = brightLum / (offset + brightLum);\nxyz.r = brightness;\ngl_FragColor = vec4(czm_XYZToRGB(xyz), 1.0);\n}\n";
});