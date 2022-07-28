"use strict";

define(function () {
  "use strict";

  return "#ifdef GL_EXT_frag_depth\n#extension GL_EXT_frag_depth : enable\n#endif\nvarying vec4 v_startPlaneNormalEcAndHalfWidth;\nvarying vec4 v_endPlaneNormalEcAndBatchId;\nvarying vec4 v_rightPlaneEC;\nvarying vec4 v_endEcAndStartEcX;\nvarying vec4 v_texcoordNormalizationAndStartEcYZ;\n#ifdef PER_INSTANCE_COLOR\nvarying vec4 v_color;\n#endif\nvoid main(void)\n{\nfloat logDepthOrDepth = czm_branchFreeTernary(czm_sceneMode == czm_sceneMode2D, gl_FragCoord.z, czm_unpackDepth(texture2D(czm_globeDepthTexture, gl_FragCoord.xy / czm_viewport.zw)));\nvec3 ecStart = vec3(v_endEcAndStartEcX.w, v_texcoordNormalizationAndStartEcYZ.zw);\nif (logDepthOrDepth == 0.0) {\n#ifdef DEBUG_SHOW_VOLUME\ngl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);\nreturn;\n#else // DEBUG_SHOW_VOLUME\ndiscard;\n#endif // DEBUG_SHOW_VOLUME\n}\nvec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, logDepthOrDepth);\neyeCoordinate /= eyeCoordinate.w;\nfloat halfMaxWidth = v_startPlaneNormalEcAndHalfWidth.w * czm_metersPerPixel(eyeCoordinate);\nfloat widthwiseDistance = czm_planeDistance(v_rightPlaneEC, eyeCoordinate.xyz);\nfloat distanceFromStart = czm_planeDistance(v_startPlaneNormalEcAndHalfWidth.xyz, -dot(ecStart, v_startPlaneNormalEcAndHalfWidth.xyz), eyeCoordinate.xyz);\nfloat distanceFromEnd = czm_planeDistance(v_endPlaneNormalEcAndBatchId.xyz, -dot(v_endEcAndStartEcX.xyz, v_endPlaneNormalEcAndBatchId.xyz), eyeCoordinate.xyz);\nif (abs(widthwiseDistance) > halfMaxWidth || distanceFromStart < 0.0 || distanceFromEnd < 0.0) {\n#ifdef DEBUG_SHOW_VOLUME\ngl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);\nreturn;\n#else // DEBUG_SHOW_VOLUME\ndiscard;\n#endif // DEBUG_SHOW_VOLUME\n}\nvec3 alignedPlaneNormal;\nalignedPlaneNormal = cross(v_rightPlaneEC.xyz, v_startPlaneNormalEcAndHalfWidth.xyz);\nalignedPlaneNormal = normalize(cross(alignedPlaneNormal, v_rightPlaneEC.xyz));\ndistanceFromStart = czm_planeDistance(alignedPlaneNormal, -dot(alignedPlaneNormal, ecStart), eyeCoordinate.xyz);\nalignedPlaneNormal = cross(v_rightPlaneEC.xyz, v_endPlaneNormalEcAndBatchId.xyz);\nalignedPlaneNormal = normalize(cross(alignedPlaneNormal, v_rightPlaneEC.xyz));\ndistanceFromEnd = czm_planeDistance(alignedPlaneNormal, -dot(alignedPlaneNormal, v_endEcAndStartEcX.xyz), eyeCoordinate.xyz);\n#ifdef PER_INSTANCE_COLOR\ngl_FragColor = v_color;\n#else // PER_INSTANCE_COLOR\nfloat s = clamp(distanceFromStart / (distanceFromStart + distanceFromEnd), 0.0, 1.0);\ns = (s * v_texcoordNormalizationAndStartEcYZ.x) + v_texcoordNormalizationAndStartEcYZ.y;\nfloat t = (widthwiseDistance + halfMaxWidth) / (2.0 * halfMaxWidth);\nczm_materialInput materialInput;\nmaterialInput.s = s;\nmaterialInput.st = vec2(s, t);\nmaterialInput.str = vec3(s, t, 0.0);\nczm_material material = czm_getMaterial(materialInput);\ngl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n#endif // PER_INSTANCE_COLOR\nczm_writeDepthClampedToFarPlane();\n}\n";
});