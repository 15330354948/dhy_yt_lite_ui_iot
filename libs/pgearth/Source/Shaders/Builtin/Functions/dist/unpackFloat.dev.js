"use strict";

define(function () {
  "use strict";

  return "#define SHIFT_RIGHT_8 0.00390625 //1.0 / 256.0\n#define SHIFT_RIGHT_16 0.00001525878 //1.0 / 65536.0\n#define SHIFT_RIGHT_24 5.960464477539063e-8//1.0 / 16777216.0\n#define BIAS 38.0\nfloat czm_unpackFloat(vec4 packedFloat)\n{\npackedFloat *= 255.0;\nfloat temp = packedFloat.w / 2.0;\nfloat exponent = floor(temp);\nfloat sign = (temp - exponent) * 2.0;\nexponent = exponent - float(BIAS);\nsign = sign * 2.0 - 1.0;\nsign = -sign;\nfloat unpacked = sign * packedFloat.x * float(SHIFT_RIGHT_8);\nunpacked += sign * packedFloat.y * float(SHIFT_RIGHT_16);\nunpacked += sign * packedFloat.z * float(SHIFT_RIGHT_24);\nreturn unpacked * pow(10.0, exponent);\n}\n";
});