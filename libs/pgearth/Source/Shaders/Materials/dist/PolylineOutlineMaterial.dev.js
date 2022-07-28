"use strict";

define(function () {
  "use strict";

  return "uniform vec4 color;\nuniform vec4 outlineColor;\nuniform float outlineWidth;\nvarying float v_width;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nfloat halfInteriorWidth =  0.5 * (v_width - outlineWidth) / v_width;\nfloat b = step(0.5 - halfInteriorWidth, st.t);\nb *= 1.0 - step(0.5 + halfInteriorWidth, st.t);\nfloat d1 = abs(st.t - (0.5 - halfInteriorWidth));\nfloat d2 = abs(st.t - (0.5 + halfInteriorWidth));\nfloat dist = min(d1, d2);\nvec4 currentColor = mix(outlineColor, color, b);\nvec4 outColor = czm_antialias(outlineColor, color, currentColor, dist);\noutColor = czm_gammaCorrect(outColor);\nmaterial.diffuse = outColor.rgb;\nmaterial.alpha = outColor.a;\nreturn material;\n}\n";
});