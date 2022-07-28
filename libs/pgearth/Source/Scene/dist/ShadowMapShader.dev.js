"use strict";

define(["../Core/defined", "../Renderer/ShaderSource"], function (S, P) {
  "use strict";

  function a() {}

  return a.getShadowCastShaderKeyword = function (a, e, n, o) {
    return "castShadow " + a + " " + e + " " + n + " " + o;
  }, a.createShadowCastVertexShader = function (a, e, n) {
    var o = a.defines.slice(0),
        i = a.sources.slice(0);
    o.push("SHADOW_MAP"), n && o.push("GENERATE_POSITION");
    var t = P.findPositionVarying(a),
        s = S(t);

    if (e && !s) {
      for (var r = i.length, d = 0; d < r; ++d) {
        i[d] = P.replaceMain(i[d], "czm_shadow_cast_main");
      }

      i.push("varying vec3 v_positionEC; \nvoid main() \n{ \n    czm_shadow_cast_main(); \n    v_positionEC = (czm_inverseProjection * gl_Position).xyz; \n}");
    }

    return new P({
      defines: o,
      sources: i
    });
  }, a.createShadowCastFragmentShader = function (a, e, n, o) {
    var i = a.defines.slice(0),
        t = a.sources.slice(0),
        s = P.findPositionVarying(a),
        r = S(s);
    r || (s = "v_positionEC");

    for (var d = t.length, h = 0; h < d; ++h) {
      t[h] = P.replaceMain(t[h], "czm_shadow_cast_main");
    }

    var c = "";
    return e && (r || (c += "varying vec3 v_positionEC; \n"), c += "uniform vec4 shadowMap_lightPositionEC; \n"), c += o ? "void main() \n{ \n" : "void main() \n{ \n    czm_shadow_cast_main(); \n    if (gl_FragColor.a == 0.0) \n    { \n       discard; \n    } \n", c += e ? "    float distance = length(" + s + "); \n    if (distance >= shadowMap_lightPositionEC.w) \n    { \n        discard; \n    } \n    distance /= shadowMap_lightPositionEC.w; // radius \n    gl_FragColor = czm_packDepth(distance); \n" : n ? "    gl_FragColor = vec4(1.0); \n" : "    gl_FragColor = czm_packDepth(gl_FragCoord.z); \n", c += "} \n", t.push(c), new P({
      defines: i,
      sources: t
    });
  }, a.getShadowReceiveShaderKeyword = function (a, e, n, o) {
    return "receiveShadow " + a._usesDepthTexture + a._polygonOffsetSupported + a._isPointLight + a._isSpotLight + (1 < a._numberOfCascades) + a.debugCascadeColors + a.softShadows + e + n + o;
  }, a.createShadowReceiveVertexShader = function (a, e, n) {
    var o = a.defines.slice(0),
        i = a.sources.slice(0);
    return o.push("SHADOW_MAP"), e && (n ? o.push("GENERATE_POSITION_AND_NORMAL") : o.push("GENERATE_POSITION")), new P({
      defines: o,
      sources: i
    });
  }, a.createShadowReceiveFragmentShader = function (a, e, n, o, i) {
    for (var t = P.findNormalVarying(a), s = !o && S(t) || o && i, r = P.findPositionVarying(a), d = S(r), h = e._usesDepthTexture, c = e._polygonOffsetSupported, l = e._isPointLight, m = e._isSpotLight, p = 1 < e._numberOfCascades, f = e.debugCascadeColors, w = e.softShadows, _ = l ? e._pointBias : o ? e._terrainBias : e._primitiveBias, u = a.defines.slice(0), C = a.sources.slice(0), g = C.length, E = 0; E < g; ++E) {
      C[E] = P.replaceMain(C[E], "czm_shadow_receive_main");
    }

    l ? u.push("USE_CUBE_MAP_SHADOW") : h && u.push("USE_SHADOW_DEPTH_TEXTURE"), w && !l && u.push("USE_SOFT_SHADOWS"), p && n && o && (s ? u.push("ENABLE_VERTEX_LIGHTING") : u.push("ENABLE_DAYNIGHT_SHADING")), n && _.normalShading && s && (u.push("USE_NORMAL_SHADING"), 0 < _.normalShadingSmooth && u.push("USE_NORMAL_SHADING_SMOOTH"));
    var v = "";
    return v += l ? "uniform samplerCube shadowMap_textureCube; \n" : "uniform sampler2D shadowMap_texture; \n", v += "uniform mat4 shadowMap_matrix; \nuniform vec3 shadowMap_lightDirectionEC; \nuniform vec4 shadowMap_lightPositionEC; \nuniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness; \nuniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth; \n#ifdef LOG_DEPTH \nvarying vec3 v_logPositionEC; \n#endif \nvec4 getPositionEC() \n{ \n" + (d ? "    return vec4(" + r + ", 1.0); \n" : "#ifndef LOG_DEPTH \n    return czm_windowToEyeCoordinates(gl_FragCoord); \n#else \n    return vec4(v_logPositionEC, 1.0); \n#endif \n") + "} \nvec3 getNormalEC() \n{ \n" + (s ? "    return normalize(" + t + "); \n" : "    return vec3(1.0); \n") + "} \nvoid applyNormalOffset(inout vec4 positionEC, vec3 normalEC, float nDotL) \n{ \n" + (_.normalOffset && s ? "    float normalOffset = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.x; \n    float normalOffsetScale = 1.0 - nDotL; \n    vec3 offset = normalOffset * normalOffsetScale * normalEC; \n    positionEC.xyz += offset; \n" : "") + "} \n", v += "void main() \n{ \n    czm_shadow_receive_main(); \n    vec4 positionEC = getPositionEC(); \n    vec3 normalEC = getNormalEC(); \n    float depth = -positionEC.z; \n", v += "    czm_shadowParameters shadowParameters; \n    shadowParameters.texelStepSize = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy; \n    shadowParameters.depthBias = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z; \n    shadowParameters.normalShadingSmooth = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w; \n    shadowParameters.darkness = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w; \n", o ? v += "    shadowParameters.depthBias *= max(depth * 0.01, 1.0); \n" : c || (v += "    shadowParameters.depthBias *= mix(1.0, 100.0, depth * 0.0015); \n"), v += l ? "    vec3 directionEC = positionEC.xyz - shadowMap_lightPositionEC.xyz; \n    float distance = length(directionEC); \n    directionEC = normalize(directionEC); \n    float radius = shadowMap_lightPositionEC.w; \n    // Stop early if the fragment is beyond the point light radius \n    if (distance > radius) \n    { \n        return; \n    } \n    vec3 directionWC  = czm_inverseViewRotation * directionEC; \n    shadowParameters.depth = distance / radius; \n    shadowParameters.nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0); \n    shadowParameters.texCoords = directionWC; \n    float visibility = czm_shadowVisibility(shadowMap_textureCube, shadowParameters); \n" : m ? "    vec3 directionEC = normalize(positionEC.xyz - shadowMap_lightPositionEC.xyz); \n    float nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0); \n    applyNormalOffset(positionEC, normalEC, nDotL); \n    vec4 shadowPosition = shadowMap_matrix * positionEC; \n    // Spot light uses a perspective projection, so perform the perspective divide \n    shadowPosition /= shadowPosition.w; \n    // Stop early if the fragment is not in the shadow bounds \n    if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))) \n    { \n        return; \n    } \n    shadowParameters.texCoords = shadowPosition.xy; \n    shadowParameters.depth = shadowPosition.z; \n    shadowParameters.nDotL = nDotL; \n    float visibility = czm_shadowVisibility(shadowMap_texture, shadowParameters); \n" : p ? "    float maxDepth = shadowMap_cascadeSplits[1].w; \n    // Stop early if the eye depth exceeds the last cascade \n    if (depth > maxDepth) \n    { \n        return; \n    } \n    // Get the cascade based on the eye-space depth \n    vec4 weights = czm_cascadeWeights(depth); \n    // Apply normal offset \n    float nDotL = clamp(dot(normalEC, shadowMap_lightDirectionEC), 0.0, 1.0); \n    applyNormalOffset(positionEC, normalEC, nDotL); \n    // Transform position into the cascade \n    vec4 shadowPosition = czm_cascadeMatrix(weights) * positionEC; \n    // Get visibility \n    shadowParameters.texCoords = shadowPosition.xy; \n    shadowParameters.depth = shadowPosition.z; \n    shadowParameters.nDotL = nDotL; \n    float visibility = czm_shadowVisibility(shadowMap_texture, shadowParameters); \n    // Fade out shadows that are far away \n    float shadowMapMaximumDistance = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.z; \n    float fade = max((depth - shadowMapMaximumDistance * 0.8) / (shadowMapMaximumDistance * 0.2), 0.0); \n    visibility = mix(visibility, 1.0, fade); \n" + (f ? "    // Draw cascade colors for debugging \n    gl_FragColor *= czm_cascadeColor(weights); \n" : "") : "    float nDotL = clamp(dot(normalEC, shadowMap_lightDirectionEC), 0.0, 1.0); \n    applyNormalOffset(positionEC, normalEC, nDotL); \n    vec4 shadowPosition = shadowMap_matrix * positionEC; \n    // Stop early if the fragment is not in the shadow bounds \n    if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))) \n    { \n        return; \n    } \n    shadowParameters.texCoords = shadowPosition.xy; \n    shadowParameters.depth = shadowPosition.z; \n    shadowParameters.nDotL = nDotL; \n    float visibility = czm_shadowVisibility(shadowMap_texture, shadowParameters); \n", v += "    gl_FragColor.rgb *= visibility; \n} \n", C.push(v), new P({
      defines: u,
      sources: C
    });
  }, a;
});