"use strict";

define(function () {
  "use strict";

  return "float czm_planeDistance(vec4 plane, vec3 point) {\nreturn (dot(plane.xyz, point) + plane.w);\n}\nfloat czm_planeDistance(vec3 planeNormal, float planeDistance, vec3 point) {\nreturn (dot(planeNormal, point) + planeDistance);\n}\n";
});