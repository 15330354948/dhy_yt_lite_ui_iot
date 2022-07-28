"use strict";

define(function () {
  "use strict";

  return "varying vec3 v_positionEC;\nvarying vec3 v_normalEC;\nvarying vec3 v_tangentEC;\nvarying vec3 v_bitangentEC;\nvarying vec2 v_st;\nvoid main()\n{\nvec3 positionToEyeEC = -v_positionEC;\nmat3 tangentToEyeMatrix = czm_tangentToEyeSpaceMatrix(v_normalEC, v_tangentEC, v_bitangentEC);\nvec3 normalEC = normalize(v_normalEC);\n#ifdef FACE_FORWARD\nnormalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);\n#endif\nczm_materialInput materialInput;\nmaterialInput.normalEC = normalEC;\nmaterialInput.tangentToEyeMatrix = tangentToEyeMatrix;\nmaterialInput.positionToEyeEC = positionToEyeEC;\nmaterialInput.st = v_st;\nczm_material material = czm_getMaterial(materialInput);\n#ifdef FLAT\ngl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n#else\ngl_FragColor = czm_phong(normalize(positionToEyeEC), material);\n#endif\n}\n";
});