"use strict";

define(function () {
  "use strict";

  return "attribute vec2 direction;\nuniform float u_size;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\nvec4 position;\nif (czm_morphTime == 1.0)\n{\nposition = vec4(czm_sunPositionWC, 1.0);\n}\nelse\n{\nposition = vec4(czm_sunPositionColumbusView.zxy, 1.0);\n}\nvec4 positionEC = czm_view * position;\nvec4 positionWC = czm_eyeToWindowCoordinates(positionEC);\nvec2 halfSize = vec2(u_size * 0.5);\nhalfSize *= ((direction * 2.0) - 1.0);\ngl_Position = czm_viewportOrthographic * vec4(positionWC.xy + halfSize, -positionWC.z, 1.0);\nv_textureCoordinates = direction;\n}\n";
});