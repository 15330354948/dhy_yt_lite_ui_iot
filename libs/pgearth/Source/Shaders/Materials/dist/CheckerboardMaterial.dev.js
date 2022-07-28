"use strict";

define(function () {
  "use strict";

  return "uniform vec4 lightColor;\nuniform vec4 darkColor;\nuniform vec2 repeat;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nfloat b = mod(floor(repeat.s * st.s) + floor(repeat.t * st.t), 2.0);\nfloat scaledWidth = fract(repeat.s * st.s);\nscaledWidth = abs(scaledWidth - floor(scaledWidth + 0.5));\nfloat scaledHeight = fract(repeat.t * st.t);\nscaledHeight = abs(scaledHeight - floor(scaledHeight + 0.5));\nfloat value = min(scaledWidth, scaledHeight);\nvec4 currentColor = mix(lightColor, darkColor, b);\nvec4 color = czm_antialias(lightColor, darkColor, currentColor, value, 0.03);\ncolor = czm_gammaCorrect(color);\nmaterial.diffuse = color.rgb;\nmaterial.alpha = color.a;\nreturn material;\n}\n";
});