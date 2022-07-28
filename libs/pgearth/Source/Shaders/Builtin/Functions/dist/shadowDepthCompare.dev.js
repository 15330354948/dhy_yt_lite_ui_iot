"use strict";

define(function () {
  "use strict";

  return "float czm_sampleShadowMap(samplerCube shadowMap, vec3 d)\n{\nreturn czm_unpackDepth(textureCube(shadowMap, d));\n}\nfloat czm_sampleShadowMap(sampler2D shadowMap, vec2 uv)\n{\n#ifdef USE_SHADOW_DEPTH_TEXTURE\nreturn texture2D(shadowMap, uv).r;\n#else\nreturn czm_unpackDepth(texture2D(shadowMap, uv));\n#endif\n}\nfloat czm_shadowDepthCompare(samplerCube shadowMap, vec3 uv, float depth)\n{\nreturn step(depth, czm_sampleShadowMap(shadowMap, uv));\n}\nfloat czm_shadowDepthCompare(sampler2D shadowMap, vec2 uv, float depth)\n{\nreturn step(depth, czm_sampleShadowMap(shadowMap, uv));\n}\n";
});