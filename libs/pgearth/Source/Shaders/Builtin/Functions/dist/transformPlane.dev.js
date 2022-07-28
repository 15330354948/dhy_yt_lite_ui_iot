"use strict";

define(function () {
  "use strict";

  return "vec4 czm_transformPlane(vec4 clippingPlane, mat4 transform) {\nvec3 transformedDirection = normalize((transform * vec4(clippingPlane.xyz, 0.0)).xyz);\nvec3 transformedPosition = (transform * vec4(clippingPlane.xyz * -clippingPlane.w, 1.0)).xyz;\nvec4 transformedPlane;\ntransformedPlane.xyz = transformedDirection;\ntransformedPlane.w = -dot(transformedDirection, transformedPosition);\nreturn transformedPlane;\n}\n";
});