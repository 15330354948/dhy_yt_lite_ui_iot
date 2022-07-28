"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D image;\nuniform float minimumHeight;\nuniform float maximumHeight;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nfloat scaledHeight = clamp((materialInput.height - minimumHeight) / (maximumHeight - minimumHeight), 0.0, 1.0);\nvec4 rampColor = texture2D(image, vec2(scaledHeight, 0.5));\nrampColor = czm_gammaCorrect(rampColor);\nmaterial.diffuse = rampColor.rgb;\nmaterial.alpha = rampColor.a;\nreturn material;\n}\n";
});