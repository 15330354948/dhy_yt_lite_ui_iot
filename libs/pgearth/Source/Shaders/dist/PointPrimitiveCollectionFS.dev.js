"use strict";

define(function () {
  "use strict";

  return "varying vec4 v_color;\nvarying vec4 v_outlineColor;\nvarying float v_innerPercent;\nvarying float v_pixelDistance;\nvarying vec4 v_pickColor;\nvoid main()\n{\nfloat distanceToCenter = length(gl_PointCoord - vec2(0.5));\nfloat maxDistance = max(0.0, 0.5 - v_pixelDistance);\nfloat wholeAlpha = 1.0 - smoothstep(maxDistance, 0.5, distanceToCenter);\nfloat innerAlpha = 1.0 - smoothstep(maxDistance * v_innerPercent, 0.5 * v_innerPercent, distanceToCenter);\nvec4 color = mix(v_outlineColor, v_color, innerAlpha);\ncolor.a *= wholeAlpha;\n#if !defined(OPAQUE) && !defined(TRANSLUCENT)\nif (color.a < 0.005)\n{\ndiscard;\n}\n#else\n#ifdef OPAQUE\nif (color.a < 0.995)\n{\ndiscard;\n}\n#else\nif (color.a >= 0.995)\n{\ndiscard;\n}\n#endif\n#endif\ngl_FragColor = czm_gammaCorrect(color);\nczm_writeLogDepth();\n}\n";
});