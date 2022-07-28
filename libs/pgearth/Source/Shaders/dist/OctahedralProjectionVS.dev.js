"use strict";

define(function () {
  "use strict";

  return "attribute vec4 position;\nattribute vec3 cubeMapCoordinates;\nvarying vec3 v_cubeMapCoordinates;\nvoid main()\n{\ngl_Position = position;\nv_cubeMapCoordinates = cubeMapCoordinates;\n}\n";
});