"use strict";

define(["./ModelUtility", "../Core/defined", "../Core/defaultValue", "../Core/WebGLConstants", "../Core/webGLConstantToGlslType", "../ThirdParty/GltfPipeline/addToArray", "../ThirdParty/GltfPipeline/ForEach", "../ThirdParty/GltfPipeline/hasExtension", "../ThirdParty/GltfPipeline/numberOfComponentsForType"], function (le, ce, ue, fe, de, _e, me, ve, pe) {
  "use strict";

  function ge(e, n, o, t, r) {
    var i, a, s, l, c;
    return ce(o[n + "Offset"]) ? (i = o[n].index, s = (a = e.samplers[e.textures[i].sampler]).wrapS === fe.REPEAT ? "true" : "false", l = a.wrapT === fe.REPEAT ? "true" : "false", c = n + "Coord", r.fragmentShaderMain += "    vec2 " + c + " = computeTexCoord(" + t + ", " + n + "Offset, " + n + "Rotation, " + n + "Scale, " + s + ", " + l + ");\n") : c = t, c;
  }

  var i = [0, 0],
      a = [0],
      s = [1, 1];

  function he(e, n, o) {
    var t, r;
    -1 !== e.indexOf("Texture") && ce(n.extensions) && ce(n.extensions.KHR_texture_transform) && (t = "u_" + e, r = n.extensions.KHR_texture_transform, o[t + "Offset"] = ue(r.offset, i), o[t + "Rotation"] = ue(r.rotation, a), o[t + "Scale"] = ue(r.scale, s), ce(n.texCoord) && ce(r.texCoord) && (o[t].texCoord = r.texCoord));
  }

  return function (r, i) {
    if (i = ue(i, {}), ve(r, "KHR_techniques_webgl")) return r;
    if (!ce(r.materials) || 0 === r.materials.length) return r;
    ce(r.extensions) || (r.extensions = {}), ce(r.extensionsUsed) || (r.extensionsUsed = []), ce(r.extensionsRequired) || (r.extensionsRequired = []), r.extensions.KHR_techniques_webgl = {
      programs: [],
      shaders: [],
      techniques: []
    }, r.extensionsUsed.push("KHR_techniques_webgl"), r.extensionsRequired.push("KHR_techniques_webgl");
    var a = le.splitIncompatibleMaterials(r);
    return me.material(r, function (e, n) {
      var o = {},
          t = function (e, n, o, t, r, i) {
        var a,
            s,
            l,
            c = ue(i.addBatchIdToGeneratedShaders, !1),
            u = e.extensions.KHR_techniques_webgl,
            f = u.techniques,
            d = u.shaders,
            _ = u.programs,
            m = function (e) {
          return ce(e.extensions) && ce(e.extensions.KHR_materials_pbrSpecularGlossiness);
        }(n),
            v = n.pbrMetallicRoughness;

        if (ce(v) && !m) for (s in v) {
          v.hasOwnProperty(s) && (l = v[s], t[a = "u_" + s] = l, he(s, l, t));
        }

        if (m) {
          var p = n.extensions.KHR_materials_pbrSpecularGlossiness;

          for (s in p) {
            p.hasOwnProperty(s) && (l = p[s], t[a = "u_" + s] = l, he(s, l, t));
          }
        }

        for (var g in n) {
          n.hasOwnProperty(g) && (0 <= g.indexOf("Texture") || 0 <= g.indexOf("Factor")) && (l = n[g], t[a = "u_" + g] = l, he(g, l, t));
        }

        var h,
            x = "precision highp float;\n",
            C = "precision highp float;\n";
        ce(e.skins) && (h = e.skins[0]);
        var b,
            T,
            L = ce(h) ? h.joints : [],
            R = L.length,
            S = r[o],
            F = !1,
            I = !1,
            E = !1,
            N = !1,
            z = !1,
            y = !1,
            O = !1;
        ce(S) && (b = S.skinning, F = b.skinned && 0 < L.length, I = S.hasVertexColors, E = S.hasMorphTargets, N = S.hasNormals, z = S.hasTangents, y = S.hasTexCoords);
        E && me.mesh(e, function (e) {
          me.meshPrimitive(e, function (e) {
            var n;
            e.material === o && (n = e.targets, ce(n) && (T = n));
          });
        });
        var A = {
          u_modelViewMatrix: {
            semantic: ve(e, "PGEARTH_RTC") ? "PGEARTH_RTC_MODELVIEW" : "MODELVIEW",
            type: fe.FLOAT_MAT4
          },
          u_projectionMatrix: {
            semantic: "PROJECTION",
            type: fe.FLOAT_MAT4
          }
        };
        ce(n.extensions) && ce(n.extensions.KHR_materials_unlit) && (z = N = !(O = !0));
        N && (A.u_normalMatrix = {
          semantic: "MODELVIEWINVERSETRANSPOSE",
          type: fe.FLOAT_MAT3
        });
        F && (A.u_jointMatrix = {
          count: R,
          semantic: "JOINTMATRIX",
          type: fe.FLOAT_MAT4
        });
        E && (A.u_morphWeights = {
          count: T.length,
          semantic: "MORPHWEIGHTS",
          type: fe.FLOAT
        });
        var M = n.alphaMode;
        ce(M) && "MASK" === M && (A.u_alphaCutoff = {
          semantic: "ALPHACUTOFF",
          type: fe.FLOAT
        });

        for (a in t) {
          t.hasOwnProperty(a) && (A[a] = {
            type: function (e) {
              {
                if (-1 !== e.indexOf("Offset")) return fe.FLOAT_VEC2;
                if (-1 !== e.indexOf("Rotation")) return fe.FLOAT;
                if (-1 !== e.indexOf("Scale")) return fe.FLOAT_VEC2;
                if (-1 !== e.indexOf("Texture")) return fe.SAMPLER_2D;
              }

              switch (e) {
                case "u_baseColorFactor":
                  return fe.FLOAT_VEC4;

                case "u_metallicFactor":
                case "u_roughnessFactor":
                  return fe.FLOAT;

                case "u_emissiveFactor":
                  return fe.FLOAT_VEC3;

                case "u_diffuseFactor":
                  return fe.FLOAT_VEC4;

                case "u_specularFactor":
                  return fe.FLOAT_VEC3;

                case "u_glossinessFactor":
                  return fe.FLOAT;
              }
            }(a)
          });
        }

        var H = ue(A.u_baseColorTexture, A.u_baseColorFactor);
        ce(H) && (H.semantic = "_3DTILESDIFFUSE");

        for (a in A) {
          var D, w;
          A.hasOwnProperty(a) && (D = A[a], w = ce(D.count) ? "[" + D.count + "]" : "", D.type !== fe.FLOAT_MAT3 && D.type !== fe.FLOAT_MAT4 && "u_morphWeights" !== a || D.useInFragment ? (C += "uniform " + de(D.type) + " " + a + w + ";\n", delete D.useInFragment) : x += "uniform " + de(D.type) + " " + a + w + ";\n");
        }

        var G,
            P,
            V = "";

        if (F) {
          var B = pe(b.type),
              U = !1;
          if (0 === b.type.indexOf("MAT") && (U = !0, B = Math.sqrt(B)), U) for (G = 0; G < B; G++) {
            for (P = 0; P < B; P++) {
              V += 0 === G && 0 === P ? "    mat4 skinMatrix = " : "    skinMatrix += ", V += "a_weight[" + G + "][" + P + "] * u_jointMatrix[int(a_joint[" + G + "][" + P + "])];\n";
            }
          } else for (G = 0; G < B; G++) {
            V += 0 === G ? "    mat4 skinMatrix = " : "    skinMatrix += ", V += "a_weight[" + G + "] * u_jointMatrix[int(a_joint[" + G + "])];\n";
          }
        }

        var W = {
          a_position: {
            semantic: "POSITION"
          }
        };
        x += "attribute vec3 a_position;\n", N && (x += "varying vec3 v_positionEC;\n");
        V += "    vec3 weightedPosition = a_position;\n", N && (V += "    vec3 weightedNormal = a_normal;\n");
        z && (V += "    vec4 weightedTangent = a_tangent;\n");
        if (E) for (var k = 0; k < T.length; k++) {
          var q,
              K = T[k];

          for (var j in K) {
            K.hasOwnProperty(j) && "extras" !== j && (W[q = "a_" + j + "_" + k] = {
              semantic: j + "_" + k
            }, x += "attribute vec3 " + q + ";\n", "POSITION" === j ? V += "    weightedPosition += u_morphWeights[" + k + "] * " + q + ";\n" : "NORMAL" === j ? V += "    weightedNormal += u_morphWeights[" + k + "] * " + q + ";\n" : z && "TANGENT" === j && (V += "    weightedTangent.xyz += u_morphWeights[" + k + "] * " + q + ";\n"));
          }
        }
        V += F ? "    vec4 position = skinMatrix * vec4(weightedPosition, 1.0);\n" : "    vec4 position = vec4(weightedPosition, 1.0);\n";
        V += "    position = u_modelViewMatrix * position;\n", N && (V += "    v_positionEC = position.xyz;\n");
        V += "    gl_Position = u_projectionMatrix * position;\n", N && (W.a_normal = {
          semantic: "NORMAL"
        }, x += "attribute vec3 a_normal;\n", x += "varying vec3 v_normal;\n", V += F ? "    v_normal = u_normalMatrix * mat3(skinMatrix) * weightedNormal;\n" : "    v_normal = u_normalMatrix * weightedNormal;\n", C += "varying vec3 v_normal;\n", C += "varying vec3 v_positionEC;\n");
        z && (W.a_tangent = {
          semantic: "TANGENT"
        }, x += "attribute vec4 a_tangent;\n", x += "varying vec4 v_tangent;\n", V += "    v_tangent.xyz = u_normalMatrix * weightedTangent.xyz;\n", V += "    v_tangent.w = weightedTangent.w;\n", C += "varying vec4 v_tangent;\n");
        var Z,
            X,
            J,
            Q,
            Y,
            $,
            ee,
            ne,
            oe = "";
        {
          var te;
          y && (W.a_texcoord_0 = {
            semantic: "TEXCOORD_0"
          }, x += "attribute vec2 a_texcoord_0;\n", x += "varying vec2 " + (Z = "v_texcoord_0") + ";\n", V += "    " + Z + " = a_texcoord_0;\n", C += "varying vec2 " + Z + ";\n", X = ge(e, "u_normalTexture", t, Z, te = {
            fragmentShaderMain: oe
          }), J = ge(e, "u_baseColorTexture", t, Z, te), Q = ge(e, "u_specularGlossinessTexture", t, Z, te), Y = ge(e, "u_diffuseTexture", t, Z, te), $ = ge(e, "u_metallicRoughnessTexture", t, Z, te), ee = ge(e, "u_occlusionTexture", t, Z, te), ne = ge(e, "u_emmissiveTexture", t, Z, te), oe = te.fragmentShaderMain);
        }
        {
          var re;
          F && (re = le.getShaderVariable(b.type), W.a_joint = {
            semantic: "JOINTS_0"
          }, W.a_weight = {
            semantic: "WEIGHTS_0"
          }, x += "attribute " + re + " a_joint;\n", x += "attribute " + re + " a_weight;\n");
        }
        I && (W.a_vertexColor = {
          semantic: "COLOR_0"
        }, x += "attribute vec4 a_vertexColor;\n", x += "varying vec4 v_vertexColor;\n", V += "  v_vertexColor = a_vertexColor;\n", C += "varying vec4 v_vertexColor;\n");
        c && (W.a_batchId = {
          semantic: "_BATCHID"
        }, x += "attribute float a_batchId;\n");
        x += "void main(void) \n{\n", x += V, x += "}\n", N && (C += "const float M_PI = 3.141592653589793;\n", C += "vec3 lambertianDiffuse(vec3 diffuseColor) \n{\n    return diffuseColor / M_PI;\n}\n\n", C += "vec3 fresnelSchlick2(vec3 f0, vec3 f90, float VdotH) \n{\n    return f0 + (f90 - f0) * pow(clamp(1.0 - VdotH, 0.0, 1.0), 5.0);\n}\n\n", C += "vec3 fresnelSchlick(float metalness, float VdotH) \n{\n    return metalness + (vec3(1.0) - metalness) * pow(1.0 - VdotH, 5.0);\n}\n\n", C += "float smithVisibilityG1(float NdotV, float roughness) \n{\n    float k = (roughness + 1.0) * (roughness + 1.0) / 8.0;\n    return NdotV / (NdotV * (1.0 - k) + k);\n}\n\n", C += "float smithVisibilityGGX(float roughness, float NdotL, float NdotV) \n{\n    return smithVisibilityG1(NdotL, roughness) * smithVisibilityG1(NdotV, roughness);\n}\n\n", C += "float GGX(float roughness, float NdotH) \n{\n    float roughnessSquared = roughness * roughness;\n    float f = (NdotH * roughnessSquared - NdotH) * NdotH + 1.0;\n    return roughnessSquared / (M_PI * f * f);\n}\n\n");
        C += "vec3 SRGBtoLINEAR3(vec3 srgbIn) \n{\n    return pow(srgbIn, vec3(2.2));\n}\n\n", C += "vec4 SRGBtoLINEAR4(vec4 srgbIn) \n{\n    vec3 linearOut = pow(srgbIn.rgb, vec3(2.2));\n    return vec4(linearOut, srgbIn.a);\n}\n\n", C += "vec3 LINEARtoSRGB(vec3 linearIn) \n{\n#ifndef HDR \n    return pow(linearIn, vec3(1.0/2.2));\n#else \n    return linearIn;\n#endif \n}\n\n", C += "vec2 computeTexCoord(vec2 texCoords, vec2 offset, float rotation, vec2 scale, bool repeatS, bool repeatT) \n{\n    rotation = -rotation; \n    mat3 transform = mat3(\n        cos(rotation) * scale.x, sin(rotation) * scale.x, 0.0, \n       -sin(rotation) * scale.y, cos(rotation) * scale.y, 0.0, \n        offset.x, offset.y, 1.0); \n    vec2 transformedTexCoords = (transform * vec3(fract(texCoords), 1.0)).xy; \n    transformedTexCoords.x = repeatS ? fract(transformedTexCoords.x) : clamp(transformedTexCoords.x, 0.0, 1.0); \n    transformedTexCoords.y = repeatT ? fract(transformedTexCoords.y) : clamp(transformedTexCoords.y, 0.0, 1.0); \n    return transformedTexCoords; \n}\n\n", C += "#ifdef USE_IBL_LIGHTING \n", C += "uniform vec2 gltf_iblFactor; \n", C += "#endif \n", C += "#ifdef USE_CUSTOM_LIGHT_COLOR \n", C += "uniform vec3 gltf_lightColor; \n", C += "#endif \n", C += "void main(void) \n{\n", C += oe, N && (C += "    vec3 ng = normalize(v_normal);\n", C += "    vec3 positionWC = vec3(czm_inverseView * vec4(v_positionEC, 1.0));\n", ce(t.u_normalTexture) ? z ? (C += "    vec3 t = normalize(v_tangent.xyz);\n", C += "    vec3 b = normalize(cross(ng, t) * v_tangent.w);\n", C += "    mat3 tbn = mat3(t, b, ng);\n", C += "    vec3 n = texture2D(u_normalTexture, " + X + ").rgb;\n", C += "    n = normalize(tbn * (2.0 * n - 1.0));\n") : (C = "#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\n" + C, C += "#ifdef GL_OES_standard_derivatives\n", C += "    vec3 pos_dx = dFdx(v_positionEC);\n", C += "    vec3 pos_dy = dFdy(v_positionEC);\n", C += "    vec3 tex_dx = dFdx(vec3(" + X + ",0.0));\n", C += "    vec3 tex_dy = dFdy(vec3(" + X + ",0.0));\n", C += "    vec3 t = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);\n", C += "    t = normalize(t - ng * dot(ng, t));\n", C += "    vec3 b = normalize(cross(ng, t));\n", C += "    mat3 tbn = mat3(t, b, ng);\n", C += "    vec3 n = texture2D(u_normalTexture, " + X + ").rgb;\n", C += "    n = normalize(tbn * (2.0 * n - 1.0));\n", C += "#else\n", C += "    vec3 n = ng;\n", C += "#endif\n") : C += "    vec3 n = ng;\n", n.doubleSided && (C += "    if (!gl_FrontFacing)\n", C += "    {\n", C += "        n = -n;\n", C += "    }\n"));
        ce(t.u_baseColorTexture) ? (C += "    vec4 baseColorWithAlpha = SRGBtoLINEAR4(texture2D(u_baseColorTexture, " + J + "));\n", ce(t.u_baseColorFactor) && (C += "    baseColorWithAlpha *= u_baseColorFactor;\n")) : ce(t.u_baseColorFactor) ? C += "    vec4 baseColorWithAlpha = u_baseColorFactor;\n" : C += "    vec4 baseColorWithAlpha = vec4(1.0);\n";
        I && (C += "    baseColorWithAlpha *= v_vertexColor;\n");
        C += "    vec3 baseColor = baseColorWithAlpha.rgb;\n", N ? (m ? (ce(t.u_specularGlossinessTexture) ? (C += "    vec4 specularGlossiness = SRGBtoLINEAR4(texture2D(u_specularGlossinessTexture, " + Q + "));\n", C += "    vec3 specular = specularGlossiness.rgb;\n", C += "    float glossiness = specularGlossiness.a;\n", ce(t.u_specularFactor) && (C += "    specular *= u_specularFactor;\n"), ce(t.u_glossinessFactor) && (C += "    glossiness *= u_glossinessFactor;\n")) : (ce(t.u_specularFactor) ? C += "    vec3 specular = clamp(u_specularFactor, vec3(0.0), vec3(1.0));\n" : C += "    vec3 specular = vec3(1.0);\n", ce(t.u_glossinessFactor) ? C += "    float glossiness = clamp(u_glossinessFactor, 0.0, 1.0);\n" : C += "    float glossiness = 1.0;\n"), ce(t.u_diffuseTexture) ? (C += "    vec4 diffuse = SRGBtoLINEAR4(texture2D(u_diffuseTexture, " + Y + "));\n", ce(t.u_diffuseFactor) && (C += "    diffuse *= u_diffuseFactor;\n")) : ce(t.u_diffuseFactor) ? C += "    vec4 diffuse = clamp(u_diffuseFactor, vec4(0.0), vec4(1.0));\n" : C += "    vec4 diffuse = vec4(1.0);\n") : ce(t.u_metallicRoughnessTexture) ? (C += "    vec3 metallicRoughness = texture2D(u_metallicRoughnessTexture, " + $ + ").rgb;\n", C += "    float metalness = clamp(metallicRoughness.b, 0.0, 1.0);\n", C += "    float roughness = clamp(metallicRoughness.g, 0.04, 1.0);\n", ce(t.u_metallicFactor) && (C += "    metalness *= u_metallicFactor;\n"), ce(t.u_roughnessFactor) && (C += "    roughness *= u_roughnessFactor;\n")) : (ce(t.u_metallicFactor) ? C += "    float metalness = clamp(u_metallicFactor, 0.0, 1.0);\n" : C += "    float metalness = 1.0;\n", ce(t.u_roughnessFactor) ? C += "    float roughness = clamp(u_roughnessFactor, 0.04, 1.0);\n" : C += "    float roughness = 1.0;\n"), C += "    vec3 v = -normalize(v_positionEC);\n", C += "#ifndef USE_CUSTOM_LIGHT_COLOR \n", C += "    vec3 lightColor = vec3(1.5, 1.4, 1.2);\n", C += "#else \n", C += "    vec3 lightColor = gltf_lightColor;\n", C += "#endif \n", C += "    vec3 l = normalize(czm_sunDirectionEC);\n", C += "    vec3 h = normalize(v + l);\n", C += "    float NdotL = clamp(dot(n, l), 0.001, 1.0);\n", C += "    float NdotV = abs(dot(n, v)) + 0.001;\n", C += "    float NdotH = clamp(dot(n, h), 0.0, 1.0);\n", C += "    float LdotH = clamp(dot(l, h), 0.0, 1.0);\n", C += "    float VdotH = clamp(dot(v, h), 0.0, 1.0);\n", C += "    vec3 f0 = vec3(0.04);\n", m ? (C += "    float roughness = 1.0 - glossiness;\n", C += "    vec3 diffuseColor = diffuse.rgb * (1.0 - max(max(specular.r, specular.g), specular.b));\n", C += "    vec3 specularColor = specular;\n") : (C += "    vec3 diffuseColor = baseColor * (1.0 - metalness) * (1.0 - f0);\n", C += "    vec3 specularColor = mix(f0, baseColor, metalness);\n"), C += "    float alpha = roughness * roughness;\n", C += "    float reflectance = max(max(specularColor.r, specularColor.g), specularColor.b);\n", C += "    vec3 r90 = vec3(clamp(reflectance * 25.0, 0.0, 1.0));\n", C += "    vec3 r0 = specularColor.rgb;\n", C += "    vec3 F = fresnelSchlick2(r0, r90, VdotH);\n", C += "    float G = smithVisibilityGGX(alpha, NdotL, NdotV);\n", C += "    float D = GGX(alpha, NdotH);\n", C += "    vec3 diffuseContribution = (1.0 - F) * lambertianDiffuse(diffuseColor);\n", C += "    vec3 specularContribution = F * G * D / (4.0 * NdotL * NdotV);\n", C += "    vec3 color = NdotL * lightColor * (diffuseContribution + specularContribution);\n", C += "#if defined(USE_IBL_LIGHTING) && !defined(DIFFUSE_IBL) && !defined(SPECULAR_IBL) \n", C += "    vec3 r = normalize(czm_inverseViewRotation * normalize(reflect(v, n)));\n", C += "    czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\n", C += "    float vertexRadius = length(positionWC);\n", C += "    float horizonDotNadir = 1.0 - min(1.0, ellipsoid.radii.x / vertexRadius);\n", C += "    float reflectionDotNadir = dot(r, normalize(positionWC));\n", C += "    r.x = -r.x;\n", C += "    r = -normalize(czm_temeToPseudoFixed * r);\n", C += "    r.x = -r.x;\n", C += "    float inverseRoughness = 1.04 - roughness;\n", C += "    inverseRoughness *= inverseRoughness;\n", C += "    vec3 sceneSkyBox = textureCube(czm_environmentMap, r).rgb * inverseRoughness;\n", C += "    float atmosphereHeight = 0.05;\n", C += "    float blendRegionSize = 0.1 * ((1.0 - inverseRoughness) * 8.0 + 1.1 - horizonDotNadir);\n", C += "    float blendRegionOffset = roughness * -1.0;\n", C += "    float farAboveHorizon = clamp(horizonDotNadir - blendRegionSize * 0.5 + blendRegionOffset, 1.0e-10 - blendRegionSize, 0.99999);\n", C += "    float aroundHorizon = clamp(horizonDotNadir + blendRegionSize * 0.5, 1.0e-10 - blendRegionSize, 0.99999);\n", C += "    float farBelowHorizon = clamp(horizonDotNadir + blendRegionSize * 1.5, 1.0e-10 - blendRegionSize, 0.99999);\n", C += "    float smoothstepHeight = smoothstep(0.0, atmosphereHeight, horizonDotNadir);\n", C += "    vec3 belowHorizonColor = mix(vec3(0.1, 0.15, 0.25), vec3(0.4, 0.7, 0.9), smoothstepHeight);\n", C += "    vec3 nadirColor = belowHorizonColor * 0.5;\n", C += "    vec3 aboveHorizonColor = mix(vec3(0.9, 1.0, 1.2), belowHorizonColor, roughness * 0.5);\n", C += "    vec3 blueSkyColor = mix(vec3(0.18, 0.26, 0.48), aboveHorizonColor, reflectionDotNadir * inverseRoughness * 0.5 + 0.75);\n", C += "    vec3 zenithColor = mix(blueSkyColor, sceneSkyBox, smoothstepHeight);\n", C += "    vec3 blueSkyDiffuseColor = vec3(0.7, 0.85, 0.9);\n", C += "    float diffuseIrradianceFromEarth = (1.0 - horizonDotNadir) * (reflectionDotNadir * 0.25 + 0.75) * smoothstepHeight;\n", C += "    float diffuseIrradianceFromSky = (1.0 - smoothstepHeight) * (1.0 - (reflectionDotNadir * 0.25 + 0.25));\n", C += "    vec3 diffuseIrradiance = blueSkyDiffuseColor * clamp(diffuseIrradianceFromEarth + diffuseIrradianceFromSky, 0.0, 1.0);\n", C += "    float notDistantRough = (1.0 - horizonDotNadir * roughness * 0.8);\n", C += "    vec3 specularIrradiance = mix(zenithColor, aboveHorizonColor, smoothstep(farAboveHorizon, aroundHorizon, reflectionDotNadir) * notDistantRough);\n", C += "    specularIrradiance = mix(specularIrradiance, belowHorizonColor, smoothstep(aroundHorizon, farBelowHorizon, reflectionDotNadir) * inverseRoughness);\n", C += "    specularIrradiance = mix(specularIrradiance, nadirColor, smoothstep(farBelowHorizon, 1.0, reflectionDotNadir) * inverseRoughness);\n", C += "#ifdef USE_SUN_LUMINANCE \n", C += "    float LdotZenith = clamp(dot(normalize(czm_inverseViewRotation * l), normalize(positionWC * -1.0)), 0.001, 1.0);\n", C += "    float S = acos(LdotZenith);\n", C += "    float NdotZenith = clamp(dot(normalize(czm_inverseViewRotation * n), normalize(positionWC * -1.0)), 0.001, 1.0);\n", C += "    float gamma = acos(NdotL);\n", C += "    float numerator = ((0.91 + 10.0 * exp(-3.0 * gamma) + 0.45 * pow(NdotL, 2.0)) * (1.0 - exp(-0.32 / NdotZenith)));\n", C += "    float denominator = (0.91 + 10.0 * exp(-3.0 * S) + 0.45 * pow(LdotZenith,2.0)) * (1.0 - exp(-0.32));\n", C += "    float luminance = gltf_luminanceAtZenith * (numerator / denominator);\n", C += "#endif \n", C += "    vec2 brdfLut = texture2D(czm_brdfLut, vec2(NdotV, 1.0 - roughness)).rg;\n", C += "    vec3 IBLColor = (diffuseIrradiance * diffuseColor * gltf_iblFactor.x) + (specularIrradiance * SRGBtoLINEAR3(specularColor * brdfLut.x + brdfLut.y) * gltf_iblFactor.y);\n", C += "#ifdef USE_SUN_LUMINANCE \n", C += "    color += IBLColor * luminance;\n", C += "#else \n", C += "    color += IBLColor; \n", C += "#endif \n", C += "#elif defined(DIFFUSE_IBL) || defined(SPECULAR_IBL) \n", C += "    mat3 fixedToENU = mat3(gltf_clippingPlanesMatrix[0][0], gltf_clippingPlanesMatrix[1][0], gltf_clippingPlanesMatrix[2][0], \n", C += "                           gltf_clippingPlanesMatrix[0][1], gltf_clippingPlanesMatrix[1][1], gltf_clippingPlanesMatrix[2][1], \n", C += "                           gltf_clippingPlanesMatrix[0][2], gltf_clippingPlanesMatrix[1][2], gltf_clippingPlanesMatrix[2][2]); \n", C += "    const mat3 yUpToZUp = mat3(-1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0); \n", C += "    vec3 cubeDir = normalize(yUpToZUp * fixedToENU * normalize(reflect(-v, n))); \n", C += "#ifdef DIFFUSE_IBL \n", C += "#ifdef CUSTOM_SPHERICAL_HARMONICS \n", C += "    vec3 diffuseIrradiance = czm_sphericalHarmonics(cubeDir, gltf_sphericalHarmonicCoefficients); \n", C += "#else \n", C += "    vec3 diffuseIrradiance = czm_sphericalHarmonics(cubeDir, czm_sphericalHarmonicCoefficients); \n", C += "#endif \n", C += "#else \n", C += "    vec3 diffuseIrradiance = vec3(0.0); \n", C += "#endif \n", C += "#ifdef SPECULAR_IBL \n", C += "    vec2 brdfLut = texture2D(czm_brdfLut, vec2(NdotV, roughness)).rg;\n", C += "#ifdef CUSTOM_SPECULAR_IBL \n", C += "    vec3 specularIBL = czm_sampleOctahedralProjection(gltf_specularMap, gltf_specularMapSize, cubeDir,  roughness * gltf_maxSpecularLOD, gltf_maxSpecularLOD);\n", C += "#else \n", C += "    vec3 specularIBL = czm_sampleOctahedralProjection(czm_specularEnvironmentMaps, czm_specularEnvironmentMapSize, cubeDir,  roughness * czm_specularEnvironmentMapsMaximumLOD, czm_specularEnvironmentMapsMaximumLOD);\n", C += "#endif \n", C += "    specularIBL *= F * brdfLut.x + brdfLut.y;\n", C += "#else \n", C += "    vec3 specularIBL = vec3(0.0); \n", C += "#endif \n", C += "    color += diffuseIrradiance * diffuseColor + specularColor * specularIBL;\n", C += "#endif \n") : C += "    vec3 color = baseColor;\n";
        O || (ce(t.u_occlusionTexture) && (C += "    color *= texture2D(u_occlusionTexture, " + ee + ").r;\n"), ce(t.u_emissiveTexture) ? (C += "    vec3 emissive = SRGBtoLINEAR3(texture2D(u_emissiveTexture, " + ne + ").rgb);\n", ce(t.u_emissiveFactor) && (C += "    emissive *= u_emissiveFactor;\n"), C += "    color += emissive;\n") : ce(t.u_emissiveFactor) && (C += "    color += u_emissiveFactor;\n"));
        C += "    color = LINEARtoSRGB(color);\n", ce(M) ? "MASK" === M ? (C += "    if (baseColorWithAlpha.a < u_alphaCutoff) {\n", C += "        discard;\n", C += "    }\n", C += "    gl_FragColor = vec4(color, 1.0);\n") : C += "BLEND" === M ? "    gl_FragColor = vec4(color, baseColorWithAlpha.a);\n" : "    gl_FragColor = vec4(color, 1.0);\n" : C += "    gl_FragColor = vec4(color, 1.0);\n";
        C += "}\n";

        var ie = _e(d, {
          type: fe.VERTEX_SHADER,
          extras: {
            _pipeline: {
              source: x,
              extension: ".glsl"
            }
          }
        }),
            ae = _e(d, {
          type: fe.FRAGMENT_SHADER,
          extras: {
            _pipeline: {
              source: C,
              extension: ".glsl"
            }
          }
        }),
            se = _e(_, {
          fragmentShader: ae,
          vertexShader: ie
        });

        return _e(f, {
          attributes: W,
          program: se,
          uniforms: A
        });
      }(r, e, n, o, a, i);

      ce(e.extensions) || (e.extensions = {}), e.extensions.KHR_techniques_webgl = {
        values: o,
        technique: t
      };
    }), le.ensureSemanticExistence(r), r;
  };
});