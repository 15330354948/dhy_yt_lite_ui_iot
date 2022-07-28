"use strict";

define(function () {
  "use strict";

  return "czm_material czm_getDefaultMaterial(czm_materialInput materialInput)\n{\nczm_material material;\nmaterial.diffuse = vec3(0.0);\nmaterial.specular = 0.0;\nmaterial.shininess = 1.0;\nmaterial.normal = materialInput.normalEC;\nmaterial.emission = vec3(0.0);\nmaterial.alpha = 1.0;\nreturn material;\n}\n";
});