"use strict";

define(function () {
  "use strict";

  return "vec4 czm_columbusViewMorph(vec4 position2D, vec4 position3D, float time)\n{\nvec3 p = mix(position2D.xyz, position3D.xyz, time);\nreturn vec4(p, 1.0);\n}\n";
});