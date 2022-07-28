"use strict";

define(function () {
  "use strict";

  return "#define SAMPLES 8\nuniform float delta;\nuniform float sigma;\nuniform float direction;\nuniform sampler2D colorTexture;\n#ifdef USE_STEP_SIZE\nuniform float stepSize;\n#else\nuniform vec2 step;\n#endif\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\nvec2 st = v_textureCoordinates;\nvec2 dir = vec2(1.0 - direction, direction);\n#ifdef USE_STEP_SIZE\nvec2 step = vec2(stepSize / czm_viewport.zw);\n#else\nvec2 step = step;\n#endif\nvec3 g;\ng.x = 1.0 / (sqrt(czm_twoPi) * sigma);\ng.y = exp((-0.5 * delta * delta) / (sigma * sigma));\ng.z = g.y * g.y;\nvec4 result = texture2D(colorTexture, st) * g.x;\nfor (int i = 1; i < SAMPLES; ++i)\n{\ng.xy *= g.yz;\nvec2 offset = float(i) * dir * step;\nresult += texture2D(colorTexture, st - offset) * g.x;\nresult += texture2D(colorTexture, st + offset) * g.x;\n}\ngl_FragColor = result;\n}\n";
});