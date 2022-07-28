"use strict";

define(function () {
  "use strict";

  return "vec2 czm_decompressTextureCoordinates(float encoded)\n{\nfloat temp = encoded / 4096.0;\nfloat xZeroTo4095 = floor(temp);\nfloat stx = xZeroTo4095 / 4095.0;\nfloat sty = (encoded - xZeroTo4095 * 4096.0) / 4095.0;\nreturn vec2(stx, sty);\n}\n";
});