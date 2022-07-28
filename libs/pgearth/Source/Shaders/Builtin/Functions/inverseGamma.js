define(function(){"use strict";return"/**\n * Converts a color in linear space to RGB space.\n *\n * @name czm_inverseGamma\n * @glslFunction\n *\n * @param {vec3} color The color in linear space.\n * @returns {vec3} The color in RGB space.\n */\nvec3 czm_inverseGamma(vec3 color) {\n    return pow(color, vec3(1.0 / czm_gamma));\n}\n"});