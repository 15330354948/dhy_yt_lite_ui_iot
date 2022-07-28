"use strict";

define(function () {
  "use strict";

  return "uniform vec4 fadeInColor;\nuniform vec4 fadeOutColor;\nuniform float maximumDistance;\nuniform bool repeat;\nuniform vec2 fadeDirection;\nuniform vec2 time;\nfloat getTime(float t, float coord)\n{\nfloat scalar = 1.0 / maximumDistance;\nfloat q  = distance(t, coord) * scalar;\nif (repeat)\n{\nfloat r = distance(t, coord + 1.0) * scalar;\nfloat s = distance(t, coord - 1.0) * scalar;\nq = min(min(r, s), q);\n}\nreturn clamp(q, 0.0, 1.0);\n}\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nfloat s = getTime(time.x, st.s) * fadeDirection.s;\nfloat t = getTime(time.y, st.t) * fadeDirection.t;\nfloat u = length(vec2(s, t));\nvec4 color = mix(fadeInColor, fadeOutColor, u);\ncolor = czm_gammaCorrect(color);\nmaterial.emission = color.rgb;\nmaterial.alpha = color.a;\nreturn material;\n}\n";
});