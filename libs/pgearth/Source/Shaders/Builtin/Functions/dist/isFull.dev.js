"use strict";

define(function () {
  "use strict";

  return "bool czm_isFull(czm_raySegment interval)\n{\nreturn (interval.start == 0.0 && interval.stop == czm_infinity);\n}\n";
});