"use strict";

define(function () {
  "use strict";

  return "czm_ellipsoid czm_getWgs84EllipsoidEC()\n{\nvec3 radii = vec3(6378137.0, 6378137.0, 6356752.314245);\nvec3 inverseRadii = vec3(1.0 / radii.x, 1.0 / radii.y, 1.0 / radii.z);\nvec3 inverseRadiiSquared = inverseRadii * inverseRadii;\nczm_ellipsoid temp = czm_ellipsoid(czm_view[3].xyz, radii, inverseRadii, inverseRadiiSquared);\nreturn temp;\n}\n";
});