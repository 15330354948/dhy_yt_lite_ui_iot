"use strict";

define(function () {
  "use strict";

  return "float czm_signNotZero(float value)\n{\nreturn value >= 0.0 ? 1.0 : -1.0;\n}\nvec2 czm_signNotZero(vec2 value)\n{\nreturn vec2(czm_signNotZero(value.x), czm_signNotZero(value.y));\n}\nvec3 czm_signNotZero(vec3 value)\n{\nreturn vec3(czm_signNotZero(value.x), czm_signNotZero(value.y), czm_signNotZero(value.z));\n}\nvec4 czm_signNotZero(vec4 value)\n{\nreturn vec4(czm_signNotZero(value.x), czm_signNotZero(value.y), czm_signNotZero(value.z), czm_signNotZero(value.w));\n}\n";
});