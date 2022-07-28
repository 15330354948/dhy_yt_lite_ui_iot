"use strict";

define(function () {
  "use strict";

  return "varying vec4 positionEC;\nvoid main()\n{\nczm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\nvec3 direction = normalize(positionEC.xyz);\nczm_ray ray = czm_ray(vec3(0.0), direction);\nczm_raySegment intersection = czm_rayEllipsoidIntersectionInterval(ray, ellipsoid);\nif (!czm_isEmpty(intersection))\n{\ngl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n}\nelse\n{\ndiscard;\n}\nczm_writeLogDepth();\n}\n";
});