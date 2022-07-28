define(function(){"use strict";return"varying vec2 v_textureCoordinates;\n\nuniform sampler2D colorTexture;\n\nconst float fxaaQualitySubpix = 0.5;\nconst float fxaaQualityEdgeThreshold = 0.125;\nconst float fxaaQualityEdgeThresholdMin = 0.0833;\n\nvoid main()\n{\n    vec2 fxaaQualityRcpFrame = vec2(1.0) / czm_viewport.zw;\n    vec4 color = FxaaPixelShader(\n        v_textureCoordinates,\n        colorTexture,\n        fxaaQualityRcpFrame,\n        fxaaQualitySubpix,\n        fxaaQualityEdgeThreshold,\n        fxaaQualityEdgeThresholdMin);\n    float alpha = texture2D(colorTexture, v_textureCoordinates).a;\n    gl_FragColor = vec4(color.rgb, alpha);\n}\n"});