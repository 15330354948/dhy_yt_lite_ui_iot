"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform float contrast;\nuniform float brightness;\nvarying vec2 v_textureCoordinates;\nvoid main(void)\n{\nvec3 sceneColor = texture2D(colorTexture, v_textureCoordinates).xyz;\nsceneColor = czm_RGBToHSB(sceneColor);\nsceneColor.z += brightness;\nsceneColor = czm_HSBToRGB(sceneColor);\nfloat factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));\nsceneColor = factor * (sceneColor - vec3(0.5)) + vec3(0.5);\ngl_FragColor = vec4(sceneColor, 1.0);\n}\n";
});