define(function(){"use strict";return"attribute vec4 position;\nattribute vec3 cubeMapCoordinates;\n\nvarying vec3 v_cubeMapCoordinates;\n\nvoid main()\n{\n    gl_Position = position;\n    v_cubeMapCoordinates = cubeMapCoordinates;\n}\n"});