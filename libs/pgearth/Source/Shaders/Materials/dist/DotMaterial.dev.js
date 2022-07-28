"use strict";

define(function () {
  "use strict";

  return "uniform vec4 lightColor;\nuniform vec4 darkColor;\nuniform vec2 repeat;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nfloat b = smoothstep(0.3, 0.32, length(fract(repeat * materialInput.st) - 0.5));\nvec4 color = mix(lightColor, darkColor, b);\ncolor = czm_gammaCorrect(color);\nmaterial.diffuse = color.rgb;\nmaterial.alpha = color.a;\nreturn material;\n}\n";
});