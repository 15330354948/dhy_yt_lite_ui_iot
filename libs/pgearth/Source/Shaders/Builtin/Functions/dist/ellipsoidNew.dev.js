"use strict";

define(function () {
  "use strict";

  return "czm_ellipsoid czm_ellipsoidNew(vec3 center, vec3 radii)\n{\nvec3 inverseRadii = vec3(1.0 / radii.x, 1.0 / radii.y, 1.0 / radii.z);\nvec3 inverseRadiiSquared = inverseRadii * inverseRadii;\nczm_ellipsoid temp = czm_ellipsoid(center, radii, inverseRadii, inverseRadiiSquared);\nreturn temp;\n}\n";
});