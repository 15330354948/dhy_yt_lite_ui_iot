"use strict";

define(function () {
  "use strict";

  return "vec4 czm_translucentPhong(vec3 toEye, czm_material material)\n{\nfloat diffuse = czm_getLambertDiffuse(vec3(0.0, 0.0, 1.0), material.normal);\nif (czm_sceneMode == czm_sceneMode3D) {\ndiffuse += czm_getLambertDiffuse(vec3(0.0, 1.0, 0.0), material.normal);\n}\ndiffuse = clamp(diffuse, 0.0, 1.0);\nfloat specular = czm_getSpecular(czm_sunDirectionEC, toEye, material.normal, material.shininess);\nspecular += czm_getSpecular(czm_moonDirectionEC, toEye, material.normal, material.shininess);\nvec3 materialDiffuse = material.diffuse * 0.5;\nvec3 ambient = materialDiffuse;\nvec3 color = ambient + material.emission;\ncolor += materialDiffuse * diffuse;\ncolor += material.specular * specular;\nreturn vec4(color, material.alpha);\n}\n";
});