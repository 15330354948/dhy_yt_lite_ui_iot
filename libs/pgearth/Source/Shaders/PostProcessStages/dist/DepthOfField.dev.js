"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D colorTexture;\nuniform sampler2D blurTexture;\nuniform sampler2D depthTexture;\nuniform float focalDistance;\nvarying vec2 v_textureCoordinates;\nvec4 toEye(vec2 uv, float depth)\n{\nvec2 xy = vec2((uv.x * 2.0 - 1.0), ((1.0 - uv.y) * 2.0 - 1.0));\nvec4 posInCamera = czm_inverseProjection * vec4(xy, depth, 1.0);\nposInCamera = posInCamera / posInCamera.w;\nreturn posInCamera;\n}\nfloat computeDepthBlur(float depth)\n{\nfloat f;\nif (depth < focalDistance)\n{\nf = (focalDistance - depth) / (focalDistance - czm_currentFrustum.x);\n}\nelse\n{\nf = (depth - focalDistance) / (czm_currentFrustum.y - focalDistance);\nf = pow(f, 0.1);\n}\nf *= f;\nf = clamp(f, 0.0, 1.0);\nreturn pow(f, 0.5);\n}\nvoid main(void)\n{\nfloat depth = czm_readDepth(depthTexture, v_textureCoordinates);\nvec4 posInCamera = toEye(v_textureCoordinates, depth);\nfloat d = computeDepthBlur(-posInCamera.z);\ngl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), texture2D(blurTexture, v_textureCoordinates), d);\n}\n";
});