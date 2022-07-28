"use strict";

define(function () {
  "use strict";

  return "vec3 czm_sampleOctahedralProjectionWithFiltering(sampler2D projectedMap, vec2 textureSize, vec3 direction, float lod)\n{\ndirection /= dot(vec3(1.0), abs(direction));\nvec2 rev = abs(direction.zx) - vec2(1.0);\nvec2 neg = vec2(direction.x < 0.0 ? rev.x : -rev.x,\ndirection.z < 0.0 ? rev.y : -rev.y);\nvec2 uv = direction.y < 0.0 ? neg : direction.xz;\nvec2 coord = 0.5 * uv + vec2(0.5);\nvec2 pixel = 1.0 / textureSize;\nif (lod > 0.0)\n{\nfloat scale = 1.0 / pow(2.0, lod);\nfloat offset = ((textureSize.y + 1.0) / textureSize.x);\ncoord.x *= offset;\ncoord *= scale;\ncoord.x += offset + pixel.x;\ncoord.y += (1.0 - (1.0 / pow(2.0, lod - 1.0))) + pixel.y * (lod - 1.0) * 2.0;\n}\nelse\n{\ncoord.x *= (textureSize.y / textureSize.x);\n}\n#ifndef OES_texture_float_linear\nvec3 color1 = texture2D(projectedMap, coord + vec2(0.0, pixel.y)).rgb;\nvec3 color2 = texture2D(projectedMap, coord + vec2(pixel.x, 0.0)).rgb;\nvec3 color3 = texture2D(projectedMap, coord + pixel).rgb;\nvec3 color4 = texture2D(projectedMap, coord).rgb;\nvec2 texturePosition = coord * textureSize;\nfloat fu = fract(texturePosition.x);\nfloat fv = fract(texturePosition.y);\nvec3 average1 = mix(color4, color2, fu);\nvec3 average2 = mix(color1, color3, fu);\nvec3 color = mix(average1, average2, fv);\n#else\nvec3 color = texture2D(projectedMap, coord).rgb;\n#endif\nreturn color;\n}\nvec3 czm_sampleOctahedralProjection(sampler2D projectedMap, vec2 textureSize, vec3 direction, float lod, float maxLod) {\nfloat currentLod = floor(lod + 0.5);\nfloat nextLod = min(currentLod + 1.0, maxLod);\nvec3 colorCurrentLod = czm_sampleOctahedralProjectionWithFiltering(projectedMap, textureSize, direction, currentLod);\nvec3 colorNextLod = czm_sampleOctahedralProjectionWithFiltering(projectedMap, textureSize, direction, nextLod);\nreturn mix(colorNextLod, colorCurrentLod, nextLod - lod);\n}\n";
});