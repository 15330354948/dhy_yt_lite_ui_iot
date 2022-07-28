"use strict";

define(function () {
  "use strict";

  return "vec3 czm_octDecode(vec2 encoded, float range)\n{\nif (encoded.x == 0.0 && encoded.y == 0.0) {\nreturn vec3(0.0, 0.0, 0.0);\n}\nencoded = encoded / range * 2.0 - 1.0;\nvec3 v = vec3(encoded.x, encoded.y, 1.0 - abs(encoded.x) - abs(encoded.y));\nif (v.z < 0.0)\n{\nv.xy = (1.0 - abs(v.yx)) * czm_signNotZero(v.xy);\n}\nreturn normalize(v);\n}\nvec3 czm_octDecode(vec2 encoded)\n{\nreturn czm_octDecode(encoded, 255.0);\n}\nvec3 czm_octDecode(float encoded)\n{\nfloat temp = encoded / 256.0;\nfloat x = floor(temp);\nfloat y = (temp - x) * 256.0;\nreturn czm_octDecode(vec2(x, y));\n}\nvoid czm_octDecode(vec2 encoded, out vec3 vector1, out vec3 vector2, out vec3 vector3)\n{\nfloat temp = encoded.x / 65536.0;\nfloat x = floor(temp);\nfloat encodedFloat1 = (temp - x) * 65536.0;\ntemp = encoded.y / 65536.0;\nfloat y = floor(temp);\nfloat encodedFloat2 = (temp - y) * 65536.0;\nvector1 = czm_octDecode(encodedFloat1);\nvector2 = czm_octDecode(encodedFloat2);\nvector3 = czm_octDecode(vec2(x, y));\n}\n";
});