define(function(){"use strict";return"attribute vec3 position;\n\nvarying vec3 v_texCoord;\n\nvoid main()\n{\n    vec3 p = czm_viewRotation * (czm_temeToPseudoFixed * (czm_entireFrustum.y * position));\n    gl_Position = czm_projection * vec4(p, 1.0);\n    v_texCoord = position.xyz;\n}\n"});