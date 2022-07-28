"use strict";

define(function () {
  "use strict";

  return "float czm_fastApproximateAtan(float x) {\nreturn x * (-0.1784 * x - 0.0663 * x * x + 1.0301);\n}\nfloat czm_fastApproximateAtan(float x, float y) {\nfloat t = abs(x);\nfloat opposite = abs(y);\nfloat adjacent = max(t, opposite);\nopposite = min(t, opposite);\nt = czm_fastApproximateAtan(opposite / adjacent);\nt = czm_branchFreeTernary(abs(y) > abs(x), czm_piOverTwo - t, t);\nt = czm_branchFreeTernary(x < 0.0, czm_pi - t, t);\nt = czm_branchFreeTernary(y < 0.0, -t, t);\nreturn t;\n}\n";
});