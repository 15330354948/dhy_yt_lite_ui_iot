"use strict";

define(function () {
  "use strict";

  return "bool czm_ellipsoidContainsPoint(czm_ellipsoid ellipsoid, vec3 point)\n{\nvec3 scaled = ellipsoid.inverseRadii * (czm_inverseModelView * vec4(point, 1.0)).xyz;\nreturn (dot(scaled, scaled) <= 1.0);\n}\n";
});