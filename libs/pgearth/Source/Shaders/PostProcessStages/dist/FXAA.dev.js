"use strict";

define(function () {
  "use strict";

  return "varying vec2 v_textureCoordinates;\nuniform sampler2D colorTexture;\nconst float fxaaQualitySubpix = 0.5;\nconst float fxaaQualityEdgeThreshold = 0.125;\nconst float fxaaQualityEdgeThresholdMin = 0.0833;\nvoid main()\n{\nvec2 fxaaQualityRcpFrame = vec2(1.0) / czm_viewport.zw;\nvec4 color = FxaaPixelShader(\nv_textureCoordinates,\ncolorTexture,\nfxaaQualityRcpFrame,\nfxaaQualitySubpix,\nfxaaQualityEdgeThreshold,\nfxaaQualityEdgeThresholdMin);\nfloat alpha = texture2D(colorTexture, v_textureCoordinates).a;\ngl_FragColor = vec4(color.rgb, alpha);\n}\n";
});