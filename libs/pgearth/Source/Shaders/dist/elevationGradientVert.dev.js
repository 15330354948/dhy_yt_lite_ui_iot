"use strict";

define(function () {
  "use strict";

  return "attribute vec2 a_position;\nattribute vec2 a_texCoord;\nuniform vec2 u_resolution;\nvarying vec2 v_texCoord;\nvoid main() {\nvec2 zeroToOne = a_position / u_resolution;\nvec2 zeroToTwo = zeroToOne * 2.0;\nvec2 clipSpace = zeroToTwo - 1.0;\ngl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\nv_texCoord = a_texCoord;\n}\n";
});