"use strict";

define(function () {
  "use strict";

  return "varying vec2 v_textureCoordinates;\nvoid main()\n{\nczm_materialInput materialInput;\nmaterialInput.s = v_textureCoordinates.s;\nmaterialInput.st = v_textureCoordinates;\nmaterialInput.str = vec3(v_textureCoordinates, 0.0);\nmaterialInput.normalEC = vec3(0.0, 0.0, -1.0);\nczm_material material = czm_getMaterial(materialInput);\ngl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n}\n";
});