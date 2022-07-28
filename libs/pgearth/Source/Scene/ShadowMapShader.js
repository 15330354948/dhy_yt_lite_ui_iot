define(["../Core/defined","../Renderer/ShaderSource"],function(a,e){"use strict";function n(){}return n.getShadowCastShaderKeyword=function(a,e,n,o){return"castShadow "+a+" "+e+" "+n+" "+o},n.createShadowCastVertexShader=function(n,o,i){var t=n.defines.slice(0),s=n.sources.slice(0);t.push("SHADOW_MAP"),i&&t.push("GENERATE_POSITION");var r=e.findPositionVarying(n),d=a(r);if(o&&!d){for(var h=s.length,c=0;c<h;++c)s[c]=e.replaceMain(s[c],"czm_shadow_cast_main");s.push("varying vec3 v_positionEC; \nvoid main() \n{ \n    czm_shadow_cast_main(); \n    v_positionEC = (czm_inverseProjection * gl_Position).xyz; \n}")}return new e({defines:t,sources:s})},n.createShadowCastFragmentShader=function(n,o,i,t){var s=n.defines.slice(0),r=n.sources.slice(0),d=e.findPositionVarying(n),h=a(d);h||(d="v_positionEC");for(var c=r.length,l=0;l<c;++l)r[l]=e.replaceMain(r[l],"czm_shadow_cast_main");var m="";return o&&(h||(m+="varying vec3 v_positionEC; \n"),m+="uniform vec4 shadowMap_lightPositionEC; \n"),m+=t?"void main() \n{ \n":"void main() \n{ \n    czm_shadow_cast_main(); \n    if (gl_FragColor.a == 0.0) \n    { \n       discard; \n    } \n",m+=o?"    float distance = length("+d+"); \n    if (distance >= shadowMap_lightPositionEC.w) \n    { \n        discard; \n    } \n    distance /= shadowMap_lightPositionEC.w; // radius \n    gl_FragColor = czm_packDepth(distance); \n":i?"    gl_FragColor = vec4(1.0); \n":"    gl_FragColor = czm_packDepth(gl_FragCoord.z); \n",m+="} \n",r.push(m),new e({defines:s,sources:r})},n.getShadowReceiveShaderKeyword=function(a,e,n,o){return"receiveShadow "+a._usesDepthTexture+a._polygonOffsetSupported+a._isPointLight+a._isSpotLight+(a._numberOfCascades>1)+a.debugCascadeColors+a.softShadows+e+n+o},n.createShadowReceiveVertexShader=function(a,n,o){var i=a.defines.slice(0),t=a.sources.slice(0);return i.push("SHADOW_MAP"),n&&(o?i.push("GENERATE_POSITION_AND_NORMAL"):i.push("GENERATE_POSITION")),new e({defines:i,sources:t})},n.createShadowReceiveFragmentShader=function(n,o,i,t,s){for(var r=e.findNormalVarying(n),d=!t&&a(r)||t&&s,h=e.findPositionVarying(n),c=a(h),l=o._usesDepthTexture,m=o._polygonOffsetSupported,p=o._isPointLight,f=o._isSpotLight,w=o._numberOfCascades>1,_=o.debugCascadeColors,u=o.softShadows,C=p?o._pointBias:t?o._terrainBias:o._primitiveBias,g=n.defines.slice(0),E=n.sources.slice(0),v=E.length,S=0;S<v;++S)E[S]=e.replaceMain(E[S],"czm_shadow_receive_main");p?g.push("USE_CUBE_MAP_SHADOW"):l&&g.push("USE_SHADOW_DEPTH_TEXTURE"),u&&!p&&g.push("USE_SOFT_SHADOWS"),w&&i&&t&&(d?g.push("ENABLE_VERTEX_LIGHTING"):g.push("ENABLE_DAYNIGHT_SHADING")),i&&C.normalShading&&d&&(g.push("USE_NORMAL_SHADING"),C.normalShadingSmooth>0&&g.push("USE_NORMAL_SHADING_SMOOTH"));var P="";return P+=p?"uniform samplerCube shadowMap_textureCube; \n":"uniform sampler2D shadowMap_texture; \n",P+="uniform mat4 shadowMap_matrix; \nuniform vec3 shadowMap_lightDirectionEC; \nuniform vec4 shadowMap_lightPositionEC; \nuniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness; \nuniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth; \n#ifdef LOG_DEPTH \nvarying vec3 v_logPositionEC; \n#endif \nvec4 getPositionEC() \n{ \n"+(c?"    return vec4("+h+", 1.0); \n":"#ifndef LOG_DEPTH \n    return czm_windowToEyeCoordinates(gl_FragCoord); \n#else \n    return vec4(v_logPositionEC, 1.0); \n#endif \n")+"} \nvec3 getNormalEC() \n{ \n"+(d?"    return normalize("+r+"); \n":"    return vec3(1.0); \n")+"} \nvoid applyNormalOffset(inout vec4 positionEC, vec3 normalEC, float nDotL) \n{ \n"+(C.normalOffset&&d?"    float normalOffset = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.x; \n    float normalOffsetScale = 1.0 - nDotL; \n    vec3 offset = normalOffset * normalOffsetScale * normalEC; \n    positionEC.xyz += offset; \n":"")+"} \n",P+="void main() \n{ \n    czm_shadow_receive_main(); \n    vec4 positionEC = getPositionEC(); \n    vec3 normalEC = getNormalEC(); \n    float depth = -positionEC.z; \n",P+="    czm_shadowParameters shadowParameters; \n    shadowParameters.texelStepSize = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy; \n    shadowParameters.depthBias = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z; \n    shadowParameters.normalShadingSmooth = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w; \n    shadowParameters.darkness = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w; \n",t?P+="    shadowParameters.depthBias *= max(depth * 0.01, 1.0); \n":m||(P+="    shadowParameters.depthBias *= mix(1.0, 100.0, depth * 0.0015); \n"),P+=p?"    vec3 directionEC = positionEC.xyz - shadowMap_lightPositionEC.xyz; \n    float distance = length(directionEC); \n    directionEC = normalize(directionEC); \n    float radius = shadowMap_lightPositionEC.w; \n    // Stop early if the fragment is beyond the point light radius \n    if (distance > radius) \n    { \n        return; \n    } \n    vec3 directionWC  = czm_inverseViewRotation * directionEC; \n    shadowParameters.depth = distance / radius; \n    shadowParameters.nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0); \n    shadowParameters.texCoords = directionWC; \n    float visibility = czm_shadowVisibility(shadowMap_textureCube, shadowParameters); \n":f?"    vec3 directionEC = normalize(positionEC.xyz - shadowMap_lightPositionEC.xyz); \n    float nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0); \n    applyNormalOffset(positionEC, normalEC, nDotL); \n    vec4 shadowPosition = shadowMap_matrix * positionEC; \n    // Spot light uses a perspective projection, so perform the perspective divide \n    shadowPosition /= shadowPosition.w; \n    // Stop early if the fragment is not in the shadow bounds \n    if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))) \n    { \n        return; \n    } \n    shadowParameters.texCoords = shadowPosition.xy; \n    shadowParameters.depth = shadowPosition.z; \n    shadowParameters.nDotL = nDotL; \n    float visibility = czm_shadowVisibility(shadowMap_texture, shadowParameters); \n":w?"    float maxDepth = shadowMap_cascadeSplits[1].w; \n    // Stop early if the eye depth exceeds the last cascade \n    if (depth > maxDepth) \n    { \n        return; \n    } \n    // Get the cascade based on the eye-space depth \n    vec4 weights = czm_cascadeWeights(depth); \n    // Apply normal offset \n    float nDotL = clamp(dot(normalEC, shadowMap_lightDirectionEC), 0.0, 1.0); \n    applyNormalOffset(positionEC, normalEC, nDotL); \n    // Transform position into the cascade \n    vec4 shadowPosition = czm_cascadeMatrix(weights) * positionEC; \n    // Get visibility \n    shadowParameters.texCoords = shadowPosition.xy; \n    shadowParameters.depth = shadowPosition.z; \n    shadowParameters.nDotL = nDotL; \n    float visibility = czm_shadowVisibility(shadowMap_texture, shadowParameters); \n    // Fade out shadows that are far away \n    float shadowMapMaximumDistance = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.z; \n    float fade = max((depth - shadowMapMaximumDistance * 0.8) / (shadowMapMaximumDistance * 0.2), 0.0); \n    visibility = mix(visibility, 1.0, fade); \n"+(_?"    // Draw cascade colors for debugging \n    gl_FragColor *= czm_cascadeColor(weights); \n":""):"    float nDotL = clamp(dot(normalEC, shadowMap_lightDirectionEC), 0.0, 1.0); \n    applyNormalOffset(positionEC, normalEC, nDotL); \n    vec4 shadowPosition = shadowMap_matrix * positionEC; \n    // Stop early if the fragment is not in the shadow bounds \n    if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))) \n    { \n        return; \n    } \n    shadowParameters.texCoords = shadowPosition.xy; \n    shadowParameters.depth = shadowPosition.z; \n    shadowParameters.nDotL = nDotL; \n    float visibility = czm_shadowVisibility(shadowMap_texture, shadowParameters); \n",P+="    gl_FragColor.rgb *= visibility; \n} \n",E.push(P),new e({defines:g,sources:E})},n});