"use strict";

define(function () {
  "use strict";

  return "float czm_private_getLambertDiffuseOfMaterial(vec3 lightDirectionEC, czm_material material)\n{\nreturn czm_getLambertDiffuse(lightDirectionEC, material.normal);\n}\nfloat czm_private_getSpecularOfMaterial(vec3 lightDirectionEC, vec3 toEyeEC, czm_material material)\n{\nreturn czm_getSpecular(lightDirectionEC, toEyeEC, material.normal, material.shininess);\n}\nvec4 czm_phong(vec3 toEye, czm_material material)\n{\nfloat diffuse = czm_private_getLambertDiffuseOfMaterial(vec3(0.0, 0.0, 1.0), material);\nif (czm_sceneMode == czm_sceneMode3D) {\ndiffuse += czm_private_getLambertDiffuseOfMaterial(vec3(0.0, 1.0, 0.0), material);\n}\nfloat specular = czm_private_getSpecularOfMaterial(czm_sunDirectionEC, toEye, material) + czm_private_getSpecularOfMaterial(czm_moonDirectionEC, toEye, material);\nvec3 materialDiffuse = material.diffuse * 0.5;\nvec3 ambient = materialDiffuse;\nvec3 color = ambient + material.emission;\ncolor += materialDiffuse * diffuse;\ncolor += material.specular * specular;\n#ifdef HDR\nfloat sunDiffuse = czm_private_getLambertDiffuseOfMaterial(czm_sunDirectionEC, material);\ncolor += materialDiffuse * sunDiffuse * czm_sunColor;\n#endif\nreturn vec4(color, material.alpha);\n}\nvec4 czm_private_phong(vec3 toEye, czm_material material)\n{\nfloat diffuse = czm_private_getLambertDiffuseOfMaterial(czm_sunDirectionEC, material);\nfloat specular = czm_private_getSpecularOfMaterial(czm_sunDirectionEC, toEye, material);\nvec3 ambient = vec3(0.0);\nvec3 color = ambient + material.emission;\ncolor += material.diffuse * diffuse;\ncolor += material.specular * specular;\nreturn vec4(color, material.alpha);\n}\n";
});