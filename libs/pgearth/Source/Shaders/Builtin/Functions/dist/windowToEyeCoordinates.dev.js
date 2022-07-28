"use strict";

define(function () {
  "use strict";

  return "vec4 czm_windowToEyeCoordinates(vec4 fragmentCoordinate)\n{\nfloat x = 2.0 * (fragmentCoordinate.x - czm_viewport.x) / czm_viewport.z - 1.0;\nfloat y = 2.0 * (fragmentCoordinate.y - czm_viewport.y) / czm_viewport.w - 1.0;\nfloat z = (fragmentCoordinate.z - czm_viewportTransformation[3][2]) / czm_viewportTransformation[2][2];\nvec4 q = vec4(x, y, z, 1.0);\nq /= fragmentCoordinate.w;\nif (!(czm_inverseProjection == mat4(0.0)))\n{\nq = czm_inverseProjection * q;\n}\nelse\n{\nfloat top = czm_frustumPlanes.x;\nfloat bottom = czm_frustumPlanes.y;\nfloat left = czm_frustumPlanes.z;\nfloat right = czm_frustumPlanes.w;\nfloat near = czm_currentFrustum.x;\nfloat far = czm_currentFrustum.y;\nq.x = (q.x * (right - left) + left + right) * 0.5;\nq.y = (q.y * (top - bottom) + bottom + top) * 0.5;\nq.z = (q.z * (near - far) - near - far) * 0.5;\nq.w = 1.0;\n}\nreturn q;\n}\nvec4 czm_windowToEyeCoordinates(vec2 fragmentCoordinateXY, float depthOrLogDepth)\n{\n#ifdef LOG_DEPTH\nfloat near = czm_currentFrustum.x;\nfloat far = czm_currentFrustum.y;\nfloat unscaledDepth = pow(2.0, depthOrLogDepth * czm_log2FarPlusOne) - 1.0;\nvec4 windowCoord = vec4(fragmentCoordinateXY, far * (1.0 - near / unscaledDepth) / (far - near), 1.0);\nvec4 eyeCoordinate = czm_windowToEyeCoordinates(windowCoord);\neyeCoordinate.w = 1.0 / unscaledDepth;\n#else\nvec4 windowCoord = vec4(fragmentCoordinateXY, depthOrLogDepth, 1.0);\nvec4 eyeCoordinate = czm_windowToEyeCoordinates(windowCoord);\n#endif\nreturn eyeCoordinate;\n}\n";
});