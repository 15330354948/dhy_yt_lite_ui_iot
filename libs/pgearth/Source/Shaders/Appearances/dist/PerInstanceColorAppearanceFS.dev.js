"use strict";

define(function () {
  "use strict";

  return "varying vec3 v_positionEC;\nvarying vec3 v_normalEC;\nvarying vec4 v_color;\nvoid main()\n{\nvec3 positionToEyeEC = -v_positionEC;\nvec3 normalEC = normalize(v_normalEC);\n#ifdef FACE_FORWARD\nnormalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);\n#endif\nvec4 color = czm_gammaCorrect(v_color);\nczm_materialInput materialInput;\nmaterialInput.normalEC = normalEC;\nmaterialInput.positionToEyeEC = positionToEyeEC;\nczm_material material = czm_getDefaultMaterial(materialInput);\nmaterial.diffuse = color.rgb;\nmaterial.alpha = color.a;\ngl_FragColor = czm_phong(normalize(positionToEyeEC), material);\n}\n";
});