"use strict";

define(function () {
  "use strict";

  return "#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\nuniform vec4 color;\nuniform float spacing;\nuniform float width;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nfloat distanceToContour = mod(materialInput.height, spacing);\n#ifdef GL_OES_standard_derivatives\nfloat dxc = abs(dFdx(materialInput.height));\nfloat dyc = abs(dFdy(materialInput.height));\nfloat dF = max(dxc, dyc) * width;\nfloat alpha = (distanceToContour < dF) ? 1.0 : 0.0;\n#else\nfloat alpha = (distanceToContour < (czm_resolutionScale * width)) ? 1.0 : 0.0;\n#endif\nvec4 outColor = czm_gammaCorrect(vec4(color.rgb, alpha));\nmaterial.diffuse = outColor.rgb;\nmaterial.alpha = outColor.a;\nreturn material;\n}\n";
});