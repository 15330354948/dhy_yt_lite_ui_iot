"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform sampler2D colorTexture2;\nuniform vec2 center;\nuniform float radius;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\nvec4 color0 = texture2D(colorTexture, v_textureCoordinates);\nvec4 color1 = texture2D(colorTexture2, v_textureCoordinates);\nfloat x = length(gl_FragCoord.xy - center) / radius;\nfloat t = smoothstep(0.5, 0.8, x);\ngl_FragColor = mix(color0 + color1, color1, t);\n}\n";
});