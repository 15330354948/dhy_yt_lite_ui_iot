"use strict";

define(function () {
  "use strict";

  return "attribute vec4 position;\nvarying vec4 positionEC;\nvoid main()\n{\npositionEC = czm_modelView * position;\ngl_Position = czm_projection * positionEC;\nczm_vertexLogDepth();\n}\n";
});