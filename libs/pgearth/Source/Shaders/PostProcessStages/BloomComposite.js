define(function(){"use strict";return"uniform sampler2D colorTexture;\nuniform sampler2D bloomTexture;\nuniform bool  glowOnly;\n\nvarying vec2 v_textureCoordinates;\n\nvoid main(void)\n{\n    vec4 bloom = texture2D(bloomTexture, v_textureCoordinates);\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n    gl_FragColor = glowOnly ? bloom : bloom + color;\n}\n"});