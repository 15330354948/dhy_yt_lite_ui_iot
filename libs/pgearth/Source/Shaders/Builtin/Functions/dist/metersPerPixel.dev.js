"use strict";

define(function () {
  "use strict";

  return "float czm_metersPerPixel(vec4 positionEC)\n{\nfloat width = czm_viewport.z;\nfloat height = czm_viewport.w;\nfloat pixelWidth;\nfloat pixelHeight;\nfloat top = czm_frustumPlanes.x;\nfloat bottom = czm_frustumPlanes.y;\nfloat left = czm_frustumPlanes.z;\nfloat right = czm_frustumPlanes.w;\nif (czm_sceneMode == czm_sceneMode2D || czm_orthographicIn3D == 1.0)\n{\nfloat frustumWidth = right - left;\nfloat frustumHeight = top - bottom;\npixelWidth = frustumWidth / width;\npixelHeight = frustumHeight / height;\n}\nelse\n{\nfloat distanceToPixel = -positionEC.z;\nfloat inverseNear = 1.0 / czm_currentFrustum.x;\nfloat tanTheta = top * inverseNear;\npixelHeight = 2.0 * distanceToPixel * tanTheta / height;\ntanTheta = right * inverseNear;\npixelWidth = 2.0 * distanceToPixel * tanTheta / width;\n}\nreturn max(pixelWidth, pixelHeight);\n}\n";
});