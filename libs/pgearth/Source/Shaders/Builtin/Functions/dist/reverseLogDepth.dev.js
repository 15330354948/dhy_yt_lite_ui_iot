"use strict";

define(function () {
  "use strict";

  return "float czm_reverseLogDepth(float logZ)\n{\n#ifdef LOG_DEPTH\nfloat near = czm_currentFrustum.x;\nfloat far = czm_currentFrustum.y;\nlogZ = pow(2.0, logZ * czm_log2FarPlusOne) - 1.0;\nlogZ = far * (1.0 - near / logZ) / (far - near);\n#endif\nreturn logZ;\n}\n";
});