define(function(){"use strict";return"\nuniform mat4 shadowMap_cascadeMatrices[4];\n\nmat4 czm_cascadeMatrix(vec4 weights)\n{\n    return shadowMap_cascadeMatrices[0] * weights.x +\n           shadowMap_cascadeMatrices[1] * weights.y +\n           shadowMap_cascadeMatrices[2] * weights.z +\n           shadowMap_cascadeMatrices[3] * weights.w;\n}\n"});