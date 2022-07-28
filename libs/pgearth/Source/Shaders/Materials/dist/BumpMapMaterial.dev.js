"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D image;\nuniform float strength;\nuniform vec2 repeat;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nvec2 centerPixel = fract(repeat * st);\nfloat centerBump = texture2D(image, centerPixel).channel;\nfloat imageWidth = float(imageDimensions.x);\nvec2 rightPixel = fract(repeat * (st + vec2(1.0 / imageWidth, 0.0)));\nfloat rightBump = texture2D(image, rightPixel).channel;\nfloat imageHeight = float(imageDimensions.y);\nvec2 leftPixel = fract(repeat * (st + vec2(0.0, 1.0 / imageHeight)));\nfloat topBump = texture2D(image, leftPixel).channel;\nvec3 normalTangentSpace = normalize(vec3(centerBump - rightBump, centerBump - topBump, clamp(1.0 - strength, 0.1, 1.0)));\nvec3 normalEC = materialInput.tangentToEyeMatrix * normalTangentSpace;\nmaterial.normal = normalEC;\nmaterial.diffuse = vec3(0.01);\nreturn material;\n}\n";
});