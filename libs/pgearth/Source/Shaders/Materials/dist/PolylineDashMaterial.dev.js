"use strict";

define(function () {
  "use strict";

  return "uniform vec4 color;\nuniform vec4 gapColor;\nuniform float dashLength;\nuniform float dashPattern;\nvarying float v_polylineAngle;\nconst float maskLength = 16.0;\nmat2 rotate(float rad) {\nfloat c = cos(rad);\nfloat s = sin(rad);\nreturn mat2(\nc, s,\n-s, c\n);\n}\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 pos = rotate(v_polylineAngle) * gl_FragCoord.xy;\nfloat dashPosition = fract(pos.x / dashLength);\nfloat maskIndex = floor(dashPosition * maskLength);\nfloat maskTest = floor(dashPattern / pow(2.0, maskIndex));\nvec4 fragColor = (mod(maskTest, 2.0) < 1.0) ? gapColor : color;\nif (fragColor.a < 0.005) {\ndiscard;\n}\nfragColor = czm_gammaCorrect(fragColor);\nmaterial.emission = fragColor.rgb;\nmaterial.alpha = fragColor.a;\nreturn material;\n}\n";
});