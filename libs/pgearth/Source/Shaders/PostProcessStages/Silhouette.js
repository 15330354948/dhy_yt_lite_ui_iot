define(function(){"use strict";return"uniform sampler2D colorTexture;\nuniform sampler2D silhouetteTexture;\n\nvarying vec2 v_textureCoordinates;\n\nvoid main(void)\n{\n    vec4 silhouetteColor = texture2D(silhouetteTexture, v_textureCoordinates);\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n    gl_FragColor = mix(color, silhouetteColor, silhouetteColor.a);\n}\n"});