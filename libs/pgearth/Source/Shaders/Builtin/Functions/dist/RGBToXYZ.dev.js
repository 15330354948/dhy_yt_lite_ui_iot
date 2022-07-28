"use strict";

define(function () {
  "use strict";

  return "vec3 czm_RGBToXYZ(vec3 rgb)\n{\nconst mat3 RGB2XYZ = mat3(0.4124, 0.2126, 0.0193,\n0.3576, 0.7152, 0.1192,\n0.1805, 0.0722, 0.9505);\nvec3 xyz = RGB2XYZ * rgb;\nvec3 Yxy;\nYxy.r = xyz.g;\nfloat temp = dot(vec3(1.0), xyz);\nYxy.gb = xyz.rg / temp;\nreturn Yxy;\n}\n";
});