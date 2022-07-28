"use strict";

define(function () {
  "use strict";

  return "struct czm_raySegment\n{\nfloat start;\nfloat stop;\n};\nconst czm_raySegment czm_emptyRaySegment = czm_raySegment(-czm_infinity, -czm_infinity);\nconst czm_raySegment czm_fullRaySegment = czm_raySegment(0.0, czm_infinity);\n";
});