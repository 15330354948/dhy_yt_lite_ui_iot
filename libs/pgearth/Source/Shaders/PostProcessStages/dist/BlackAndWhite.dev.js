"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform float gradations;\nvarying vec2 v_textureCoordinates;\nvoid main(void)\n{\nvec3 rgb = texture2D(colorTexture, v_textureCoordinates).rgb;\n#ifdef CZM_SELECTED_FEATURE\nif (czm_selected()) {\ngl_FragColor = vec4(rgb, 1.0);\nreturn;\n}\n#endif\nfloat luminance = czm_luminance(rgb);\nfloat darkness = luminance * gradations;\ndarkness = (darkness - fract(darkness)) / gradations;\ngl_FragColor = vec4(vec3(darkness), 1.0);\n}\n";
});