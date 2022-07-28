define(function(){"use strict";return"attribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform vec2 u_resolution;\n\nvarying vec2 v_texCoord;\n\nvoid main() {\n   // convert the rectangle from pixels to 0.0 to 1.0\n   vec2 zeroToOne = a_position / u_resolution;\n\n   // convert from 0->1 to 0->2\n   vec2 zeroToTwo = zeroToOne * 2.0;\n\n   // convert from 0->2 to -1->+1 (clipspace)\n   vec2 clipSpace = zeroToTwo - 1.0;\n\n   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n\n   // pass the texCoord to the fragment shader\n   // The GPU will interpolate this value between points.\n   v_texCoord = a_texCoord;\n}\n"});