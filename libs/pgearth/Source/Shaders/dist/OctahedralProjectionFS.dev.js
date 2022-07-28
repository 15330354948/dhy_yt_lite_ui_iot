"use strict";

define(function () {
  "use strict";

  return "varying vec3 v_cubeMapCoordinates;\nuniform samplerCube cubeMap;\nvoid main()\n{\nvec4 rgbm = textureCube(cubeMap, v_cubeMapCoordinates);\nfloat m = rgbm.a * 16.0;\nvec3 r = rgbm.rgb * m;\ngl_FragColor = vec4(r * r, 1.0);\n}\n";
});