"use strict";

define(function () {
  "use strict";

  return "vec3 RGBtoHCV(vec3 rgb)\n{\nvec4 p = (rgb.g < rgb.b) ? vec4(rgb.bg, -1.0, 2.0 / 3.0) : vec4(rgb.gb, 0.0, -1.0 / 3.0);\nvec4 q = (rgb.r < p.x) ? vec4(p.xyw, rgb.r) : vec4(rgb.r, p.yzx);\nfloat c = q.x - min(q.w, q.y);\nfloat h = abs((q.w - q.y) / (6.0 * c + czm_epsilon7) + q.z);\nreturn vec3(h, c, q.x);\n}\nvec3 czm_RGBToHSL(vec3 rgb)\n{\nvec3 hcv = RGBtoHCV(rgb);\nfloat l = hcv.z - hcv.y * 0.5;\nfloat s = hcv.y / (1.0 - abs(l * 2.0 - 1.0) + czm_epsilon7);\nreturn vec3(hcv.x, s, l);\n}\n";
});