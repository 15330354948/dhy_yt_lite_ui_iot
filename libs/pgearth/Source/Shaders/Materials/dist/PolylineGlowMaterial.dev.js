"use strict";

define(function () {
  "use strict";

  return "uniform vec4 color;\nuniform float glowPower;\nuniform float taperPower;\nvarying float v_width;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nfloat glow = glowPower / abs(st.t - 0.5) - (glowPower / 0.5);\nif (taperPower <= 0.99999) {\nglow *= min(1.0, taperPower / (0.5 - st.s * 0.5) - (taperPower / 0.5));\n}\nvec4 fragColor;\nfragColor.rgb = max(vec3(glow - 1.0 + color.rgb), color.rgb);\nfragColor.a = clamp(0.0, 1.0, glow) * color.a;\nfragColor = czm_gammaCorrect(fragColor);\nmaterial.emission = fragColor.rgb;\nmaterial.alpha = fragColor.a;\nreturn material;\n}\n";
});