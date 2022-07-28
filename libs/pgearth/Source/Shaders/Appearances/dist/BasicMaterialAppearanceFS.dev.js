"use strict";

define(function () {
  "use strict";

  return "varying vec3 v_positionEC;\nvarying vec3 v_normalEC;\nvoid main()\n{\nvec3 positionToEyeEC = -v_positionEC;\nvec3 normalEC = normalize(v_normalEC);\n#ifdef FACE_FORWARD\nnormalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);\n#endif\nczm_materialInput materialInput;\nmaterialInput.normalEC = normalEC;\nmaterialInput.positionToEyeEC = positionToEyeEC;\nczm_material material = czm_getMaterial(materialInput);\n#ifdef FLAT\ngl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n#else\ngl_FragColor = czm_phong(normalize(positionToEyeEC), material);\n#endif\n}\n";
});