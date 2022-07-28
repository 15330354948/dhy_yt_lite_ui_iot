"use strict";

define(function () {
  "use strict";

  return "vec3 czm_XYZToRGB(vec3 Yxy)\n{\nconst mat3 XYZ2RGB = mat3( 3.2405, -0.9693,  0.0556,\n-1.5371,  1.8760, -0.2040,\n-0.4985,  0.0416,  1.0572);\nvec3 xyz;\nxyz.r = Yxy.r * Yxy.g / Yxy.b;\nxyz.g = Yxy.r;\nxyz.b = Yxy.r * (1.0 - Yxy.g - Yxy.b) / Yxy.b;\nreturn XYZ2RGB * xyz;\n}\n";
});