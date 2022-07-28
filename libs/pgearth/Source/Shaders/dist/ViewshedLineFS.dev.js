"use strict";

define(function () {
  "use strict";

  return "uniform vec4 u_bgColor;\nvoid main()\n{\ngl_FragColor = u_bgColor;\n}\n";
});