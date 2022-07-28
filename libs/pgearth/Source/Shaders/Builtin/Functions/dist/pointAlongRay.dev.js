"use strict";

define(function () {
  "use strict";

  return "vec3 czm_pointAlongRay(czm_ray ray, float time)\n{\nreturn ray.origin + (time * ray.direction);\n}\n";
});