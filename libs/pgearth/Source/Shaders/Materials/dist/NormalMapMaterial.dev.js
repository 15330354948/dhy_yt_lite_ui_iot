"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D image;\nuniform float strength;\nuniform vec2 repeat;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec4 textureValue = texture2D(image, fract(repeat * materialInput.st));\nvec3 normalTangentSpace = textureValue.channels;\nnormalTangentSpace.xy = normalTangentSpace.xy * 2.0 - 1.0;\nnormalTangentSpace.z = clamp(1.0 - strength, 0.1, 1.0);\nnormalTangentSpace = normalize(normalTangentSpace);\nvec3 normalEC = materialInput.tangentToEyeMatrix * normalTangentSpace;\nmaterial.normal = normalEC;\nreturn material;\n}\n";
});