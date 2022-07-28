"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D image;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec4 rampColor = texture2D(image, vec2(materialInput.slope / (czm_pi / 2.0), 0.5));\nrampColor = czm_gammaCorrect(rampColor);\nmaterial.diffuse = rampColor.rgb;\nmaterial.alpha = rampColor.a;\nreturn material;\n}\n";
});