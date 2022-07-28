"use strict";

define(function () {
  "use strict";

  return "void clipLineSegmentToNearPlane(\nvec3 p0,\nvec3 p1,\nout vec4 positionWC,\nout bool clipped,\nout bool culledByNearPlane)\n{\nculledByNearPlane = false;\nclipped = false;\nvec3 p1ToP0 = p1 - p0;\nfloat magnitude = length(p1ToP0);\nvec3 direction = normalize(p1ToP0);\nfloat endPoint0Distance =  -(czm_currentFrustum.x + p0.z);\nfloat denominator = -direction.z;\nif (endPoint0Distance < 0.0 && abs(denominator) < czm_epsilon7)\n{\nculledByNearPlane = true;\n}\nelse if (endPoint0Distance < 0.0 && abs(denominator) > czm_epsilon7)\n{\nfloat t = (czm_currentFrustum.x + p0.z) / denominator;\nif (t < 0.0 || t > magnitude)\n{\nculledByNearPlane = true;\n}\nelse\n{\np0 = p0 + t * direction;\nclipped = true;\n}\n}\npositionWC = czm_eyeToWindowCoordinates(vec4(p0, 1.0));\n}\nvec4 getPolylineWindowCoordinatesEC(vec4 positionEC, vec4 prevEC, vec4 nextEC, float expandDirection, float width, bool usePrevious, out float angle)\n{\nvec4 endPointWC, p0, p1;\nbool culledByNearPlane, clipped;\n#ifdef POLYLINE_DASH\nvec4 positionWindow = czm_eyeToWindowCoordinates(positionEC);\nvec4 previousWindow = czm_eyeToWindowCoordinates(prevEC);\nvec4 nextWindow = czm_eyeToWindowCoordinates(nextEC);\nvec2 lineDir;\nif (usePrevious) {\nlineDir = normalize(positionWindow.xy - previousWindow.xy);\n}\nelse {\nlineDir = normalize(nextWindow.xy - positionWindow.xy);\n}\nangle = atan(lineDir.x, lineDir.y) - 1.570796327;\nangle = floor(angle / czm_piOverFour + 0.5) * czm_piOverFour;\n#endif\nclipLineSegmentToNearPlane(prevEC.xyz, positionEC.xyz, p0, clipped, culledByNearPlane);\nclipLineSegmentToNearPlane(nextEC.xyz, positionEC.xyz, p1, clipped, culledByNearPlane);\nclipLineSegmentToNearPlane(positionEC.xyz, usePrevious ? prevEC.xyz : nextEC.xyz, endPointWC, clipped, culledByNearPlane);\nif (culledByNearPlane)\n{\nreturn vec4(0.0, 0.0, 0.0, 1.0);\n}\nvec2 prevWC = normalize(p0.xy - endPointWC.xy);\nvec2 nextWC = normalize(p1.xy - endPointWC.xy);\nfloat expandWidth = width * 0.5;\nvec2 direction;\n#ifdef CLIP_POLYLINE\nif (clipped)\n{\nif (prevEC.z - positionEC.z < 0.0)\n{\ndirection = vec2(prevWC.y, -prevWC.x);\n}\nelse\n{\ndirection = vec2(-prevWC.y, prevWC.x);\n}\n}\nelse\n#endif\nif (czm_equalsEpsilon(prevEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1) || czm_equalsEpsilon(prevWC, -nextWC, czm_epsilon1))\n{\ndirection = vec2(-nextWC.y, nextWC.x);\n}\nelse if (czm_equalsEpsilon(nextEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1))\n{\ndirection = vec2(prevWC.y, -prevWC.x);\n}\nelse\n{\nvec2 normal = vec2(-nextWC.y, nextWC.x);\ndirection = normalize((nextWC + prevWC) * 0.5);\nif (dot(direction, normal) < 0.0)\n{\ndirection = -direction;\n}\nfloat sinAngle = abs(direction.x * nextWC.y - direction.y * nextWC.x);\nexpandWidth = clamp(expandWidth / sinAngle, 0.0, width * 2.0);\n}\nvec2 offset = direction * expandDirection * expandWidth * czm_resolutionScale;\nreturn vec4(endPointWC.xy + offset, -endPointWC.z, 1.0);\n}\nvec4 getPolylineWindowCoordinates(vec4 position, vec4 previous, vec4 next, float expandDirection, float width, bool usePrevious, out float angle)\n{\nvec4 positionEC = czm_modelViewRelativeToEye * position;\nvec4 prevEC = czm_modelViewRelativeToEye * previous;\nvec4 nextEC = czm_modelViewRelativeToEye * next;\nreturn getPolylineWindowCoordinatesEC(positionEC, prevEC, nextEC, expandDirection, width, usePrevious, angle);\n}\n";
});