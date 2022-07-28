"use strict";

define(function () {
  "use strict";

  return "uniform vec4 evenColor;\nuniform vec4 oddColor;\nuniform float offset;\nuniform float repeat;\nuniform bool horizontal;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nfloat coord = mix(materialInput.st.s, materialInput.st.t, float(horizontal));\nfloat value = fract((coord - offset) * (repeat * 0.5));\nfloat dist = min(value, min(abs(value - 0.5), 1.0 - value));\nvec4 currentColor = mix(evenColor, oddColor, step(0.5, value));\nvec4 color = czm_antialias(evenColor, oddColor, currentColor, dist);\ncolor = czm_gammaCorrect(color);\nmaterial.diffuse = color.rgb;\nmaterial.alpha = color.a;\nreturn material;\n}\n";
});