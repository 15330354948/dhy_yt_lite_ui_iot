"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D u_depthTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\nfloat z_window = czm_unpackDepth(texture2D(u_depthTexture, v_textureCoordinates));\nz_window = czm_reverseLogDepth(z_window);\nfloat n_range = czm_depthRange.near;\nfloat f_range = czm_depthRange.far;\nfloat z_ndc = (2.0 * z_window - n_range - f_range) / (f_range - n_range);\nfloat scale = pow(z_ndc * 0.5 + 0.5, 8.0);\ngl_FragColor = vec4(mix(vec3(0.0), vec3(1.0), scale), 1.0);\n}\n";
});