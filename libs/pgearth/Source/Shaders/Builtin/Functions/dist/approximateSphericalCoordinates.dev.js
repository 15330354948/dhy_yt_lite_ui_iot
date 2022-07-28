"use strict";

define(function () {
  "use strict";

  return "vec2 czm_approximateSphericalCoordinates(vec3 normal) {\nfloat latitudeApproximation = czm_fastApproximateAtan(sqrt(normal.x * normal.x + normal.y * normal.y), normal.z);\nfloat longitudeApproximation = czm_fastApproximateAtan(normal.x, normal.y);\nreturn vec2(latitudeApproximation, longitudeApproximation);\n}\n";
});