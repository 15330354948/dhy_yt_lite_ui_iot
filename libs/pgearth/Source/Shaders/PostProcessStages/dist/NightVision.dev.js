"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nvarying vec2 v_textureCoordinates;\nfloat rand(vec2 co)\n{\nreturn fract(sin(dot(co.xy ,vec2(12.9898, 78.233))) * 43758.5453);\n}\nvoid main(void)\n{\nfloat noiseValue = rand(v_textureCoordinates + sin(czm_frameNumber)) * 0.1;\nvec3 rgb = texture2D(colorTexture, v_textureCoordinates).rgb;\nvec3 green = vec3(0.0, 1.0, 0.0);\ngl_FragColor = vec4((noiseValue + rgb) * green, 1.0);\n}\n";
});