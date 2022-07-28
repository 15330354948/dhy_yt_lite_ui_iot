"use strict";

define(function () {
  "use strict";

  return "vec3 czm_hue(vec3 rgb, float adjustment)\n{\nconst mat3 toYIQ = mat3(0.299,     0.587,     0.114,\n0.595716, -0.274453, -0.321263,\n0.211456, -0.522591,  0.311135);\nconst mat3 toRGB = mat3(1.0,  0.9563,  0.6210,\n1.0, -0.2721, -0.6474,\n1.0, -1.107,   1.7046);\nvec3 yiq = toYIQ * rgb;\nfloat hue = atan(yiq.z, yiq.y) + adjustment;\nfloat chroma = sqrt(yiq.z * yiq.z + yiq.y * yiq.y);\nvec3 color = vec3(yiq.x, chroma * cos(hue), chroma * sin(hue));\nreturn toRGB * color;\n}\n";
});