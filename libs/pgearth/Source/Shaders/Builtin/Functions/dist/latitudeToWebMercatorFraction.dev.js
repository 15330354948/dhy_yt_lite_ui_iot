"use strict";

define(function () {
  "use strict";

  return "float czm_latitudeToWebMercatorFraction(float latitude, float southMercatorY, float oneOverMercatorHeight)\n{\nfloat sinLatitude = sin(latitude);\nfloat mercatorY = 0.5 * log((1.0 + sinLatitude) / (1.0 - sinLatitude));\nreturn (mercatorY - southMercatorY) * oneOverMercatorHeight;\n}\n";
});