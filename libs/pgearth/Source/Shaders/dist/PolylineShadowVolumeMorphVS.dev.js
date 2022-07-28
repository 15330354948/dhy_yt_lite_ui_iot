"use strict";

define(function () {
  "use strict";

  return "attribute vec3 position3DHigh;\nattribute vec3 position3DLow;\nattribute vec4 startHiAndForwardOffsetX;\nattribute vec4 startLoAndForwardOffsetY;\nattribute vec4 startNormalAndForwardOffsetZ;\nattribute vec4 endNormalAndTextureCoordinateNormalizationX;\nattribute vec4 rightNormalAndTextureCoordinateNormalizationY;\nattribute vec4 startHiLo2D;\nattribute vec4 offsetAndRight2D;\nattribute vec4 startEndNormals2D;\nattribute vec2 texcoordNormalization2D;\nattribute float batchId;\nvarying vec3 v_forwardDirectionEC;\nvarying vec3 v_texcoordNormalizationAndHalfWidth;\nvarying float v_batchId;\n#ifdef WIDTH_VARYING\nvarying float v_width;\n#endif\n#ifdef ANGLE_VARYING\nvarying float v_polylineAngle;\n#endif\n#ifdef PER_INSTANCE_COLOR\nvarying vec4 v_color;\n#else\nvarying vec2 v_alignedPlaneDistances;\nvarying float v_texcoordT;\n#endif\nvoid main()\n{\nv_batchId = batchId;\nvec4 posRelativeToEye2D = czm_translateRelativeToEye(vec3(0.0, startHiLo2D.xy), vec3(0.0, startHiLo2D.zw));\nvec4 posRelativeToEye3D = czm_translateRelativeToEye(startHiAndForwardOffsetX.xyz, startLoAndForwardOffsetY.xyz);\nvec4 posRelativeToEye = czm_columbusViewMorph(posRelativeToEye2D, posRelativeToEye3D, czm_morphTime);\nvec3 posEc2D = (czm_modelViewRelativeToEye * posRelativeToEye2D).xyz;\nvec3 posEc3D = (czm_modelViewRelativeToEye * posRelativeToEye3D).xyz;\nvec3 startEC = (czm_modelViewRelativeToEye * posRelativeToEye).xyz;\nvec4 startPlane2D;\nvec4 startPlane3D;\nstartPlane2D.xyz = czm_normal * vec3(0.0, startEndNormals2D.xy);\nstartPlane3D.xyz = czm_normal * startNormalAndForwardOffsetZ.xyz;\nstartPlane2D.w = -dot(startPlane2D.xyz, posEc2D);\nstartPlane3D.w = -dot(startPlane3D.xyz, posEc3D);\nvec4 rightPlane2D;\nvec4 rightPlane3D;\nrightPlane2D.xyz = czm_normal * vec3(0.0, offsetAndRight2D.zw);\nrightPlane3D.xyz = czm_normal * rightNormalAndTextureCoordinateNormalizationY.xyz;\nrightPlane2D.w = -dot(rightPlane2D.xyz, posEc2D);\nrightPlane3D.w = -dot(rightPlane3D.xyz, posEc3D);\nposRelativeToEye2D = posRelativeToEye2D + vec4(0.0, offsetAndRight2D.xy, 0.0);\nposRelativeToEye3D = posRelativeToEye3D + vec4(startHiAndForwardOffsetX.w, startLoAndForwardOffsetY.w, startNormalAndForwardOffsetZ.w, 0.0);\nposRelativeToEye = czm_columbusViewMorph(posRelativeToEye2D, posRelativeToEye3D, czm_morphTime);\nposEc2D = (czm_modelViewRelativeToEye * posRelativeToEye2D).xyz;\nposEc3D = (czm_modelViewRelativeToEye * posRelativeToEye3D).xyz;\nvec3 endEC = (czm_modelViewRelativeToEye * posRelativeToEye).xyz;\nvec3 forwardEc3D = czm_normal * normalize(vec3(startHiAndForwardOffsetX.w, startLoAndForwardOffsetY.w, startNormalAndForwardOffsetZ.w));\nvec3 forwardEc2D = czm_normal * normalize(vec3(0.0, offsetAndRight2D.xy));\nvec4 endPlane2D;\nvec4 endPlane3D;\nendPlane2D.xyz = czm_normal * vec3(0.0, startEndNormals2D.zw);\nendPlane3D.xyz = czm_normal * endNormalAndTextureCoordinateNormalizationX.xyz;\nendPlane2D.w = -dot(endPlane2D.xyz, posEc2D);\nendPlane3D.w = -dot(endPlane3D.xyz, posEc3D);\nv_forwardDirectionEC = normalize(endEC - startEC);\nvec2 cleanTexcoordNormalization2D;\ncleanTexcoordNormalization2D.x = abs(texcoordNormalization2D.x);\ncleanTexcoordNormalization2D.y = czm_branchFreeTernary(texcoordNormalization2D.y > 1.0, 0.0, abs(texcoordNormalization2D.y));\nvec2 cleanTexcoordNormalization3D;\ncleanTexcoordNormalization3D.x = abs(endNormalAndTextureCoordinateNormalizationX.w);\ncleanTexcoordNormalization3D.y = rightNormalAndTextureCoordinateNormalizationY.w;\ncleanTexcoordNormalization3D.y = czm_branchFreeTernary(cleanTexcoordNormalization3D.y > 1.0, 0.0, abs(cleanTexcoordNormalization3D.y));\nv_texcoordNormalizationAndHalfWidth.xy = mix(cleanTexcoordNormalization2D, cleanTexcoordNormalization3D, czm_morphTime);\n#ifdef PER_INSTANCE_COLOR\nv_color = czm_batchTable_color(batchId);\n#else // PER_INSTANCE_COLOR\nv_alignedPlaneDistances.x = -dot(v_forwardDirectionEC, startEC);\nv_alignedPlaneDistances.y = -dot(-v_forwardDirectionEC, endEC);\n#endif // PER_INSTANCE_COLOR\n#ifdef WIDTH_VARYING\nfloat width = czm_batchTable_width(batchId);\nfloat halfWidth = width * 0.5;\nv_width = width;\nv_texcoordNormalizationAndHalfWidth.z = halfWidth;\n#else\nfloat halfWidth = 0.5 * czm_batchTable_width(batchId);\nv_texcoordNormalizationAndHalfWidth.z = halfWidth;\n#endif\nvec4 positionEc3D = czm_modelViewRelativeToEye * czm_translateRelativeToEye(position3DHigh, position3DLow);\nfloat absStartPlaneDistance = abs(czm_planeDistance(startPlane3D, positionEc3D.xyz));\nfloat absEndPlaneDistance = abs(czm_planeDistance(endPlane3D, positionEc3D.xyz));\nvec3 planeDirection = czm_branchFreeTernary(absStartPlaneDistance < absEndPlaneDistance, startPlane3D.xyz, endPlane3D.xyz);\nvec3 upOrDown = normalize(cross(rightPlane3D.xyz, planeDirection));\nvec3 normalEC = normalize(cross(planeDirection, upOrDown));\nvec3 geodeticSurfaceNormal = normalize(cross(normalEC, forwardEc3D));\ngeodeticSurfaceNormal *= float(0.0 <= rightNormalAndTextureCoordinateNormalizationY.w && rightNormalAndTextureCoordinateNormalizationY.w <= 1.0);\ngeodeticSurfaceNormal *= MAX_TERRAIN_HEIGHT;\npositionEc3D.xyz += geodeticSurfaceNormal;\nnormalEC *= sign(endNormalAndTextureCoordinateNormalizationX.w);\npositionEc3D.xyz += halfWidth * max(0.0, czm_metersPerPixel(positionEc3D)) * normalEC;\nvec4 positionEc2D = czm_modelViewRelativeToEye * czm_translateRelativeToEye(position2DHigh.zxy, position2DLow.zxy);\nabsStartPlaneDistance = abs(czm_planeDistance(startPlane2D, positionEc2D.xyz));\nabsEndPlaneDistance = abs(czm_planeDistance(endPlane2D, positionEc2D.xyz));\nplaneDirection = czm_branchFreeTernary(absStartPlaneDistance < absEndPlaneDistance, startPlane2D.xyz, endPlane2D.xyz);\nupOrDown = normalize(cross(rightPlane2D.xyz, planeDirection));\nnormalEC = normalize(cross(planeDirection, upOrDown));\ngeodeticSurfaceNormal = normalize(cross(normalEC, forwardEc2D));\ngeodeticSurfaceNormal *= float(0.0 <= texcoordNormalization2D.y && texcoordNormalization2D.y <= 1.0);\ngeodeticSurfaceNormal *= MAX_TERRAIN_HEIGHT;\npositionEc2D.xyz += geodeticSurfaceNormal;\nnormalEC *= sign(texcoordNormalization2D.x);\n#ifndef PER_INSTANCE_COLOR\nv_texcoordT = clamp(sign(texcoordNormalization2D.x), 0.0, 1.0);\n#endif\npositionEc2D.xyz += halfWidth * max(0.0, czm_metersPerPixel(positionEc2D)) * normalEC;\ngl_Position = czm_projection * mix(positionEc2D, positionEc3D, czm_morphTime);\n#ifdef ANGLE_VARYING\nvec2 approxLineDirection = normalize(vec2(v_forwardDirectionEC.x, -v_forwardDirectionEC.y));\napproxLineDirection.y = czm_branchFreeTernary(approxLineDirection.x == 0.0 && approxLineDirection.y == 0.0, -1.0, approxLineDirection.y);\nv_polylineAngle = czm_fastApproximateAtan(approxLineDirection.x, approxLineDirection.y);\n#endif\n}\n";
});