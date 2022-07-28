"use strict";

define(function () {
  "use strict";

  return "#ifdef VECTOR_TILE\nuniform vec4 u_highlightColor;\n#endif\nvarying vec2 v_st;\nvoid main()\n{\nczm_materialInput materialInput;\nmaterialInput.s = v_st.s;\nmaterialInput.st = v_st;\nmaterialInput.str = vec3(v_st, 0.0);\nczm_material material = czm_getMaterial(materialInput);\ngl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n#ifdef VECTOR_TILE\ngl_FragColor *= u_highlightColor;\n#endif\nczm_writeLogDepth();\n}\n";
});