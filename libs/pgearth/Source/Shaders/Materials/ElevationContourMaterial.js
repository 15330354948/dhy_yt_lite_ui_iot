define(function(){"use strict";return"#ifdef GL_OES_standard_derivatives\n    #extension GL_OES_standard_derivatives : enable\n#endif\n\nuniform vec4 color;\nuniform float spacing;\nuniform float width;\n\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\n    czm_material material = czm_getDefaultMaterial(materialInput);\n\n    float distanceToContour = mod(materialInput.height, spacing);\n\n#ifdef GL_OES_standard_derivatives\n    float dxc = abs(dFdx(materialInput.height));\n    float dyc = abs(dFdy(materialInput.height));\n    float dF = max(dxc, dyc) * width;\n    float alpha = (distanceToContour < dF) ? 1.0 : 0.0;\n#else\n    float alpha = (distanceToContour < (czm_resolutionScale * width)) ? 1.0 : 0.0;\n#endif\n\n    vec4 outColor = czm_gammaCorrect(vec4(color.rgb, alpha));\n    material.diffuse = outColor.rgb;\n    material.alpha = outColor.a;\n\n    return material;\n}\n"});