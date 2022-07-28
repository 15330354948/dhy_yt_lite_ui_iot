"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform sampler2D silhouetteTexture;\nvarying vec2 v_textureCoordinates;\nvoid main(void)\n{\nvec4 silhouetteColor = texture2D(silhouetteTexture, v_textureCoordinates);\nvec4 color = texture2D(colorTexture, v_textureCoordinates);\ngl_FragColor = mix(color, silhouetteColor, silhouetteColor.a);\n}\n";
});