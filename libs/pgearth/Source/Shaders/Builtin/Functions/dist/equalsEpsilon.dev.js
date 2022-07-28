"use strict";

define(function () {
  "use strict";

  return "bool czm_equalsEpsilon(vec4 left, vec4 right, float epsilon) {\nreturn all(lessThanEqual(abs(left - right), vec4(epsilon)));\n}\nbool czm_equalsEpsilon(vec3 left, vec3 right, float epsilon) {\nreturn all(lessThanEqual(abs(left - right), vec3(epsilon)));\n}\nbool czm_equalsEpsilon(vec2 left, vec2 right, float epsilon) {\nreturn all(lessThanEqual(abs(left - right), vec2(epsilon)));\n}\nbool czm_equalsEpsilon(float left, float right, float epsilon) {\nreturn (abs(left - right) <= epsilon);\n}\n";
});