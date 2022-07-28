define(function(){"use strict";return"uniform sampler2D colorTexture;\nuniform float contrast;\nuniform float brightness;\n\nvarying vec2 v_textureCoordinates;\n\nvoid main(void)\n{\n    vec3 sceneColor = texture2D(colorTexture, v_textureCoordinates).xyz;\n    sceneColor = czm_RGBToHSB(sceneColor);\n    sceneColor.z += brightness;\n    sceneColor = czm_HSBToRGB(sceneColor);\n\n    float factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));\n    sceneColor = factor * (sceneColor - vec3(0.5)) + vec3(0.5);\n    gl_FragColor = vec4(sceneColor, 1.0);\n}\n"});