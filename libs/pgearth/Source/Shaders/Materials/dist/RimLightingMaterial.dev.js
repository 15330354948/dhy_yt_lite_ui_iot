"use strict";

define(function () {
  "use strict";

  return "uniform vec4 color;\nuniform vec4 rimColor;\nuniform float width;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nfloat d = 1.0 - dot(materialInput.normalEC, normalize(materialInput.positionToEyeEC));\nfloat s = smoothstep(1.0 - width, 1.0, d);\nvec4 outColor = czm_gammaCorrect(color);\nvec4 outRimColor = czm_gammaCorrect(rimColor);\nmaterial.diffuse = outColor.rgb;\nmaterial.emission = outRimColor.rgb * s;\nmaterial.alpha = mix(outColor.a, outRimColor.a, s);\nreturn material;\n}\n";
});