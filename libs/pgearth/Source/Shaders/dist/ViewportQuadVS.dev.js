"use strict";

define(function () {
  "use strict";

  return "attribute vec4 position;\nattribute vec2 textureCoordinates;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\ngl_Position = position;\nv_textureCoordinates = textureCoordinates;\n}\n";
});