"use strict";

define(function () {
  "use strict";

  return "#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\nuniform vec4 color;\nuniform float cellAlpha;\nuniform vec2 lineCount;\nuniform vec2 lineThickness;\nuniform vec2 lineOffset;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nfloat scaledWidth = fract(lineCount.s * st.s - lineOffset.s);\nscaledWidth = abs(scaledWidth - floor(scaledWidth + 0.5));\nfloat scaledHeight = fract(lineCount.t * st.t - lineOffset.t);\nscaledHeight = abs(scaledHeight - floor(scaledHeight + 0.5));\nfloat value;\n#ifdef GL_OES_standard_derivatives\nconst float fuzz = 1.2;\nvec2 thickness = (lineThickness * czm_resolutionScale) - 1.0;\nvec2 dx = abs(dFdx(st));\nvec2 dy = abs(dFdy(st));\nvec2 dF = vec2(max(dx.s, dy.s), max(dx.t, dy.t)) * lineCount;\nvalue = min(\nsmoothstep(dF.s * thickness.s, dF.s * (fuzz + thickness.s), scaledWidth),\nsmoothstep(dF.t * thickness.t, dF.t * (fuzz + thickness.t), scaledHeight));\n#else\nconst float fuzz = 0.05;\nvec2 range = 0.5 - (lineThickness * 0.05);\nvalue = min(\n1.0 - smoothstep(range.s, range.s + fuzz, scaledWidth),\n1.0 - smoothstep(range.t, range.t + fuzz, scaledHeight));\n#endif\nfloat dRim = 1.0 - abs(dot(materialInput.normalEC, normalize(materialInput.positionToEyeEC)));\nfloat sRim = smoothstep(0.8, 1.0, dRim);\nvalue *= (1.0 - sRim);\nvec4 halfColor;\nhalfColor.rgb = color.rgb * 0.5;\nhalfColor.a = color.a * (1.0 - ((1.0 - cellAlpha) * value));\nhalfColor = czm_gammaCorrect(halfColor);\nmaterial.diffuse = halfColor.rgb;\nmaterial.emission = halfColor.rgb;\nmaterial.alpha = halfColor.a;\nreturn material;\n}\n";
});