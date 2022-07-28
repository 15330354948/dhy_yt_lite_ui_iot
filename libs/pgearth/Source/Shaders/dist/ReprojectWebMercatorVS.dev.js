"use strict";

define(function () {
  "use strict";

  return "attribute vec4 position;\nattribute float webMercatorT;\nuniform vec2 u_textureDimensions;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\nv_textureCoordinates = vec2(position.x, webMercatorT);\ngl_Position = czm_viewportOrthographic * (position * vec4(u_textureDimensions, 1.0, 1.0));\n}\n";
});