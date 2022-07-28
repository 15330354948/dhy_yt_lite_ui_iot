"use strict";

define(function () {
  "use strict";

  return "uniform samplerCube u_cubeMap;\nvarying vec3 v_texCoord;\nvoid main()\n{\nvec4 color = textureCube(u_cubeMap, normalize(v_texCoord));\ngl_FragColor = vec4(czm_gammaCorrect(color).rgb, czm_morphTime);\n}\n";
});