"use strict";

define(function () {
  "use strict";

  return "#ifdef INSTANCED\nattribute vec2 direction;\n#endif\nattribute vec4 positionHighAndScale;\nattribute vec4 positionLowAndRotation;\nattribute vec4 compressedAttribute0;\nattribute vec4 compressedAttribute1;\nattribute vec4 compressedAttribute2;\nattribute vec4 eyeOffset;\nattribute vec4 scaleByDistance;\nattribute vec4 pixelOffsetScaleByDistance;\nattribute vec4 compressedAttribute3;\n#if defined(VERTEX_DEPTH_CHECK) || defined(FRAGMENT_DEPTH_CHECK)\nattribute vec4 textureCoordinateBoundsOrLabelTranslate;\n#endif\n#ifdef VECTOR_TILE\nattribute float a_batchId;\n#endif\nvarying vec2 v_textureCoordinates;\n#ifdef FRAGMENT_DEPTH_CHECK\nvarying vec4 v_textureCoordinateBounds;\nvarying vec4 v_originTextureCoordinateAndTranslate;\nvarying vec4 v_compressed;\nvarying mat2 v_rotationMatrix;\n#endif\nvarying vec4 v_pickColor;\nvarying vec4 v_color;\nconst float UPPER_BOUND = 32768.0;\nconst float SHIFT_LEFT16 = 65536.0;\nconst float SHIFT_LEFT12 = 4096.0;\nconst float SHIFT_LEFT8 = 256.0;\nconst float SHIFT_LEFT7 = 128.0;\nconst float SHIFT_LEFT5 = 32.0;\nconst float SHIFT_LEFT3 = 8.0;\nconst float SHIFT_LEFT2 = 4.0;\nconst float SHIFT_LEFT1 = 2.0;\nconst float SHIFT_RIGHT12 = 1.0 / 4096.0;\nconst float SHIFT_RIGHT8 = 1.0 / 256.0;\nconst float SHIFT_RIGHT7 = 1.0 / 128.0;\nconst float SHIFT_RIGHT5 = 1.0 / 32.0;\nconst float SHIFT_RIGHT3 = 1.0 / 8.0;\nconst float SHIFT_RIGHT2 = 1.0 / 4.0;\nconst float SHIFT_RIGHT1 = 1.0 / 2.0;\nvec4 addScreenSpaceOffset(vec4 positionEC, vec2 imageSize, float scale, vec2 direction, vec2 origin, vec2 translate, vec2 pixelOffset, vec3 alignedAxis, bool validAlignedAxis, float rotation, bool sizeInMeters, out mat2 rotationMatrix, out float mpp)\n{\nvec2 halfSize = imageSize * scale * czm_resolutionScale * 0.5;\nhalfSize *= ((direction * 2.0) - 1.0);\nvec2 originTranslate = origin * abs(halfSize);\n#if defined(ROTATION) || defined(ALIGNED_AXIS)\nif (validAlignedAxis || rotation != 0.0)\n{\nfloat angle = rotation;\nif (validAlignedAxis)\n{\nvec4 projectedAlignedAxis = czm_modelViewProjection * vec4(alignedAxis, 0.0);\nangle += sign(-projectedAlignedAxis.x) * acos(sign(projectedAlignedAxis.y) * (projectedAlignedAxis.y * projectedAlignedAxis.y) /\n(projectedAlignedAxis.x * projectedAlignedAxis.x + projectedAlignedAxis.y * projectedAlignedAxis.y));\n}\nfloat cosTheta = cos(angle);\nfloat sinTheta = sin(angle);\nrotationMatrix = mat2(cosTheta, sinTheta, -sinTheta, cosTheta);\nhalfSize = rotationMatrix * halfSize;\n}\nelse\n{\nrotationMatrix = mat2(1.0, 0.0, 0.0, 1.0);\n}\n#endif\nif (sizeInMeters)\n{\npositionEC.xy += halfSize;\n}\nmpp = czm_metersPerPixel(positionEC);\nif (!sizeInMeters)\n{\noriginTranslate *= mpp;\n}\npositionEC.xy += originTranslate;\nif (!sizeInMeters)\n{\npositionEC.xy += halfSize * mpp;\n}\npositionEC.xy += translate * mpp;\npositionEC.xy += (pixelOffset * czm_resolutionScale) * mpp;\nreturn positionEC;\n}\n#ifdef VERTEX_DEPTH_CHECK\nfloat getGlobeDepth(vec4 positionEC)\n{\nvec4 posWC = czm_eyeToWindowCoordinates(positionEC);\nfloat globeDepth = czm_unpackDepth(texture2D(czm_globeDepthTexture, posWC.xy / czm_viewport.zw));\nif (globeDepth == 0.0)\n{\nreturn 0.0;\n}\nvec4 eyeCoordinate = czm_windowToEyeCoordinates(posWC.xy, globeDepth);\nreturn eyeCoordinate.z / eyeCoordinate.w;\n}\n#endif\nvoid main()\n{\nvec3 positionHigh = positionHighAndScale.xyz;\nvec3 positionLow = positionLowAndRotation.xyz;\nfloat scale = positionHighAndScale.w;\n#if defined(ROTATION) || defined(ALIGNED_AXIS)\nfloat rotation = positionLowAndRotation.w;\n#else\nfloat rotation = 0.0;\n#endif\nfloat compressed = compressedAttribute0.x;\nvec2 pixelOffset;\npixelOffset.x = floor(compressed * SHIFT_RIGHT7);\ncompressed -= pixelOffset.x * SHIFT_LEFT7;\npixelOffset.x -= UPPER_BOUND;\nvec2 origin;\norigin.x = floor(compressed * SHIFT_RIGHT5);\ncompressed -= origin.x * SHIFT_LEFT5;\norigin.y = floor(compressed * SHIFT_RIGHT3);\ncompressed -= origin.y * SHIFT_LEFT3;\n#ifdef FRAGMENT_DEPTH_CHECK\nvec2 depthOrigin = origin.xy;\n#endif\norigin -= vec2(1.0);\nfloat show = floor(compressed * SHIFT_RIGHT2);\ncompressed -= show * SHIFT_LEFT2;\n#ifdef INSTANCED\nvec2 textureCoordinatesBottomLeft = czm_decompressTextureCoordinates(compressedAttribute0.w);\nvec2 textureCoordinatesRange = czm_decompressTextureCoordinates(eyeOffset.w);\nvec2 textureCoordinates = textureCoordinatesBottomLeft + direction * textureCoordinatesRange;\n#else\nvec2 direction;\ndirection.x = floor(compressed * SHIFT_RIGHT1);\ndirection.y = compressed - direction.x * SHIFT_LEFT1;\nvec2 textureCoordinates = czm_decompressTextureCoordinates(compressedAttribute0.w);\n#endif\nfloat temp = compressedAttribute0.y  * SHIFT_RIGHT8;\npixelOffset.y = -(floor(temp) - UPPER_BOUND);\nvec2 translate;\ntranslate.y = (temp - floor(temp)) * SHIFT_LEFT16;\ntemp = compressedAttribute0.z * SHIFT_RIGHT8;\ntranslate.x = floor(temp) - UPPER_BOUND;\ntranslate.y += (temp - floor(temp)) * SHIFT_LEFT8;\ntranslate.y -= UPPER_BOUND;\ntemp = compressedAttribute1.x * SHIFT_RIGHT8;\nfloat temp2 = floor(compressedAttribute2.w * SHIFT_RIGHT2);\nvec2 imageSize = vec2(floor(temp), temp2);\n#ifdef FRAGMENT_DEPTH_CHECK\nfloat labelHorizontalOrigin = floor(compressedAttribute2.w - (temp2 * SHIFT_LEFT2));\nfloat applyTranslate = 0.0;\nif (labelHorizontalOrigin != 0.0)\n{\napplyTranslate = 1.0;\nlabelHorizontalOrigin -= 2.0;\ndepthOrigin.x = labelHorizontalOrigin + 1.0;\n}\ndepthOrigin = vec2(1.0) - (depthOrigin * 0.5);\n#endif\n#ifdef EYE_DISTANCE_TRANSLUCENCY\nvec4 translucencyByDistance;\ntranslucencyByDistance.x = compressedAttribute1.z;\ntranslucencyByDistance.z = compressedAttribute1.w;\ntranslucencyByDistance.y = ((temp - floor(temp)) * SHIFT_LEFT8) / 255.0;\ntemp = compressedAttribute1.y * SHIFT_RIGHT8;\ntranslucencyByDistance.w = ((temp - floor(temp)) * SHIFT_LEFT8) / 255.0;\n#endif\n#if defined(VERTEX_DEPTH_CHECK) || defined(FRAGMENT_DEPTH_CHECK)\ntemp = compressedAttribute3.w;\ntemp = temp * SHIFT_RIGHT12;\nvec2 dimensions;\ndimensions.y = (temp - floor(temp)) * SHIFT_LEFT12;\ndimensions.x = floor(temp);\n#endif\n#ifdef ALIGNED_AXIS\nvec3 alignedAxis = czm_octDecode(floor(compressedAttribute1.y * SHIFT_RIGHT8));\ntemp = compressedAttribute2.z * SHIFT_RIGHT5;\nbool validAlignedAxis = (temp - floor(temp)) * SHIFT_LEFT1 > 0.0;\n#else\nvec3 alignedAxis = vec3(0.0);\nbool validAlignedAxis = false;\n#endif\nvec4 pickColor;\nvec4 color;\ntemp = compressedAttribute2.y;\ntemp = temp * SHIFT_RIGHT8;\npickColor.b = (temp - floor(temp)) * SHIFT_LEFT8;\ntemp = floor(temp) * SHIFT_RIGHT8;\npickColor.g = (temp - floor(temp)) * SHIFT_LEFT8;\npickColor.r = floor(temp);\ntemp = compressedAttribute2.x;\ntemp = temp * SHIFT_RIGHT8;\ncolor.b = (temp - floor(temp)) * SHIFT_LEFT8;\ntemp = floor(temp) * SHIFT_RIGHT8;\ncolor.g = (temp - floor(temp)) * SHIFT_LEFT8;\ncolor.r = floor(temp);\ntemp = compressedAttribute2.z * SHIFT_RIGHT8;\nbool sizeInMeters = floor((temp - floor(temp)) * SHIFT_LEFT7) > 0.0;\ntemp = floor(temp) * SHIFT_RIGHT8;\npickColor.a = (temp - floor(temp)) * SHIFT_LEFT8;\npickColor /= 255.0;\ncolor.a = floor(temp);\ncolor /= 255.0;\nvec4 p = czm_translateRelativeToEye(positionHigh, positionLow);\nvec4 positionEC = czm_modelViewRelativeToEye * p;\n#if defined(FRAGMENT_DEPTH_CHECK) || defined(VERTEX_DEPTH_CHECK)\nfloat eyeDepth = positionEC.z;\n#endif\npositionEC = czm_eyeOffset(positionEC, eyeOffset.xyz);\npositionEC.xyz *= show;\n#if defined(EYE_DISTANCE_SCALING) || defined(EYE_DISTANCE_TRANSLUCENCY) || defined(EYE_DISTANCE_PIXEL_OFFSET) || defined(DISTANCE_DISPLAY_CONDITION) || defined(DISABLE_DEPTH_DISTANCE)\nfloat lengthSq;\nif (czm_sceneMode == czm_sceneMode2D)\n{\nlengthSq = czm_eyeHeight2D.y;\n}\nelse\n{\nlengthSq = dot(positionEC.xyz, positionEC.xyz);\n}\n#endif\n#ifdef EYE_DISTANCE_SCALING\nfloat distanceScale = czm_nearFarScalar(scaleByDistance, lengthSq);\nscale *= distanceScale;\ntranslate *= distanceScale;\nif (scale == 0.0)\n{\npositionEC.xyz = vec3(0.0);\n}\n#endif\nfloat translucency = 1.0;\n#ifdef EYE_DISTANCE_TRANSLUCENCY\ntranslucency = czm_nearFarScalar(translucencyByDistance, lengthSq);\nif (translucency == 0.0)\n{\npositionEC.xyz = vec3(0.0);\n}\n#endif\n#ifdef EYE_DISTANCE_PIXEL_OFFSET\nfloat pixelOffsetScale = czm_nearFarScalar(pixelOffsetScaleByDistance, lengthSq);\npixelOffset *= pixelOffsetScale;\n#endif\n#ifdef DISTANCE_DISPLAY_CONDITION\nfloat nearSq = compressedAttribute3.x;\nfloat farSq = compressedAttribute3.y;\nif (lengthSq < nearSq || lengthSq > farSq)\n{\npositionEC.xyz = vec3(0.0);\n}\n#endif\nmat2 rotationMatrix;\nfloat mpp;\n#ifdef DISABLE_DEPTH_DISTANCE\nfloat disableDepthTestDistance = compressedAttribute3.z;\n#endif\n#ifdef VERTEX_DEPTH_CHECK\nif (lengthSq < disableDepthTestDistance) {\nfloat depthsilon = 10.0;\nvec2 labelTranslate = textureCoordinateBoundsOrLabelTranslate.xy;\nvec4 pEC1 = addScreenSpaceOffset(positionEC, dimensions, scale, vec2(0.0), origin, labelTranslate, pixelOffset, alignedAxis, validAlignedAxis, rotation, sizeInMeters, rotationMatrix, mpp);\nfloat globeDepth1 = getGlobeDepth(pEC1);\nif (globeDepth1 != 0.0 && pEC1.z + depthsilon < globeDepth1)\n{\nvec4 pEC2 = addScreenSpaceOffset(positionEC, dimensions, scale, vec2(0.0, 1.0), origin, labelTranslate, pixelOffset, alignedAxis, validAlignedAxis, rotation, sizeInMeters, rotationMatrix, mpp);\nfloat globeDepth2 = getGlobeDepth(pEC2);\nif (globeDepth2 != 0.0 && pEC2.z + depthsilon < globeDepth2)\n{\nvec4 pEC3 = addScreenSpaceOffset(positionEC, dimensions, scale, vec2(1.0), origin, labelTranslate, pixelOffset, alignedAxis, validAlignedAxis, rotation, sizeInMeters, rotationMatrix, mpp);\nfloat globeDepth3 = getGlobeDepth(pEC3);\nif (globeDepth3 != 0.0 && pEC3.z + depthsilon < globeDepth3)\n{\npositionEC.xyz = vec3(0.0);\n}\n}\n}\n}\n#endif\npositionEC = addScreenSpaceOffset(positionEC, imageSize, scale, direction, origin, translate, pixelOffset, alignedAxis, validAlignedAxis, rotation, sizeInMeters, rotationMatrix, mpp);\ngl_Position = czm_projection * positionEC;\nv_textureCoordinates = textureCoordinates;\n#ifdef LOG_DEPTH\nczm_vertexLogDepth();\n#endif\n#ifdef DISABLE_DEPTH_DISTANCE\nif (disableDepthTestDistance == 0.0 && czm_minimumDisableDepthTestDistance != 0.0)\n{\ndisableDepthTestDistance = czm_minimumDisableDepthTestDistance;\n}\nif (disableDepthTestDistance != 0.0)\n{\nfloat zclip = gl_Position.z / gl_Position.w;\nbool clipped = (zclip < -1.0 || zclip > 1.0);\nif (!clipped && (disableDepthTestDistance < 0.0 || (lengthSq > 0.0 && lengthSq < disableDepthTestDistance)))\n{\ngl_Position.z = -gl_Position.w;\n#ifdef LOG_DEPTH\nczm_vertexLogDepth(vec4(czm_currentFrustum.x));\n#endif\n}\n}\n#endif\n#ifdef FRAGMENT_DEPTH_CHECK\nif (sizeInMeters) {\ntranslate /= mpp;\ndimensions /= mpp;\nimageSize /= mpp;\n}\n#if defined(ROTATION) || defined(ALIGNED_AXIS)\nv_rotationMatrix = rotationMatrix;\n#else\nv_rotationMatrix = mat2(1.0, 0.0, 0.0, 1.0);\n#endif\nfloat enableDepthCheck = 0.0;\nif (lengthSq < disableDepthTestDistance)\n{\nenableDepthCheck = 1.0;\n}\nfloat dw = floor(clamp(dimensions.x, 0.0, SHIFT_LEFT12));\nfloat dh = floor(clamp(dimensions.y, 0.0, SHIFT_LEFT12));\nfloat iw = floor(clamp(imageSize.x, 0.0, SHIFT_LEFT12));\nfloat ih = floor(clamp(imageSize.y, 0.0, SHIFT_LEFT12));\nv_compressed.x = eyeDepth;\nv_compressed.y = applyTranslate * SHIFT_LEFT1 + enableDepthCheck;\nv_compressed.z = dw * SHIFT_LEFT12 + dh;\nv_compressed.w = iw * SHIFT_LEFT12 + ih;\nv_originTextureCoordinateAndTranslate.xy = depthOrigin;\nv_originTextureCoordinateAndTranslate.zw = translate;\nv_textureCoordinateBounds = textureCoordinateBoundsOrLabelTranslate;\n#endif\nv_pickColor = pickColor;\nv_color = color;\nv_color.a *= translucency;\n}\n";
});