"use strict";

define(function () {
  "use strict";

  return "vec4 czm_eyeOffset(vec4 positionEC, vec3 eyeOffset)\n{\nvec4 p = positionEC;\nvec4 zEyeOffset = normalize(p) * eyeOffset.z;\np.xy += eyeOffset.xy + zEyeOffset.xy;\np.z += zEyeOffset.z;\nreturn p;\n}\n";
});