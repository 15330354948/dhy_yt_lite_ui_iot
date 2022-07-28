"use strict";

define(["./ModelUtility", "../Core/defined", "../Core/defaultValue", "../Core/WebGLConstants", "../Core/webGLConstantToGlslType", "../ThirdParty/GltfPipeline/addToArray", "../ThirdParty/GltfPipeline/ForEach", "../ThirdParty/GltfPipeline/hasExtension", "../ThirdParty/GltfPipeline/numberOfComponentsForType"], function (Y, Z, $, ee, ne, te, e, ae, ie) {
  "use strict";

  function oe(e, n) {
    var t = Z(n.value) ? n.value : Z(n.index) ? [n.index] : n;

    switch (e) {
      case "ambient":
      case "diffuse":
      case "emission":
      case "specular":
        return 1 === t.length ? ee.SAMPLER_2D : ee.FLOAT_VEC4;

      case "shininess":
      case "transparency":
        return ee.FLOAT;

      case "transparent":
      case "doubleSided":
        return ee.BOOL;
    }
  }

  return function (c, u) {
    if (u = $(u, {}), Z(c) && ae(c, "KHR_materials_common")) {
      ae(c, "KHR_techniques_webgl") || (Z(c.extensions) || (c.extensions = {}), c.extensions.KHR_techniques_webgl = {
        programs: [],
        shaders: [],
        techniques: []
      }, c.extensionsUsed.push("KHR_techniques_webgl"), c.extensionsRequired.push("KHR_techniques_webgl"));
      var _ = c.extensions.KHR_techniques_webgl;
      !function (e) {
        var n = e.extensions.KHR_materials_common;
        if (!Z(n) || !Z(n.lights)) return;

        for (var t = n.lights, a = t.length, i = 0; i < a; i++) {
          var o,
              r,
              s,
              l,
              c = t[i];
          "ambient" === c.type ? (Z(c.ambient) || (c.ambient = {}), o = c.ambient, Z(o.color) || (o.color = [1, 1, 1])) : "directional" === c.type ? (Z(c.directional) || (c.directional = {}), r = c.directional, Z(r.color) || (r.color = [1, 1, 1])) : "point" === c.type ? (Z(c.point) || (c.point = {}), s = c.point, Z(s.color) || (s.color = [1, 1, 1]), s.constantAttenuation = $(s.constantAttenuation, 1), s.linearAttenuation = $(s.linearAttenuation, 0), s.quadraticAttenuation = $(s.quadraticAttenuation, 0)) : "spot" === c.type && (Z(c.spot) || (c.spot = {}), l = c.spot, Z(l.color) || (l.color = [1, 1, 1]), l.constantAttenuation = $(l.constantAttenuation, 1), l.fallOffAngle = $(l.fallOffAngle, 3.14159265), l.fallOffExponent = $(l.fallOffExponent, 0), l.linearAttenuation = $(l.linearAttenuation, 0), l.quadraticAttenuation = $(l.quadraticAttenuation, 0));
        }
      }(c);

      var v = function (e) {
        var n,
            t = {};
        Z(e.extensions) && Z(e.extensions.KHR_materials_common) && (n = e.extensions.KHR_materials_common.lights);

        if (Z(n)) {
          var a,
              i,
              o = e.nodes;

          for (var r in o) {
            o.hasOwnProperty(r) && (a = o[r], Z(a.extensions) && Z(a.extensions.KHR_materials_common) && (i = a.extensions.KHR_materials_common.light, Z(i) && Z(n[i]) && (n[i].node = r), delete a.extensions.KHR_materials_common));
          }

          var s = 0;

          for (var l in n) {
            if (n.hasOwnProperty(l)) {
              var c = n[l],
                  u = c.type;

              if ("ambient" !== u && !Z(c.node)) {
                delete n[l];
                continue;
              }

              var _ = "light" + s.toString();

              switch (c.baseName = _, u) {
                case "ambient":
                  var v = c.ambient;
                  t[_ + "Color"] = {
                    type: ee.FLOAT_VEC3,
                    value: v.color
                  };
                  break;

                case "directional":
                  var m = c.directional;
                  t[_ + "Color"] = {
                    type: ee.FLOAT_VEC3,
                    value: m.color
                  }, Z(c.node) && (t[_ + "Transform"] = {
                    node: c.node,
                    semantic: "MODELVIEW",
                    type: ee.FLOAT_MAT4
                  });
                  break;

                case "point":
                  var p = c.point;
                  t[_ + "Color"] = {
                    type: ee.FLOAT_VEC3,
                    value: p.color
                  }, Z(c.node) && (t[_ + "Transform"] = {
                    node: c.node,
                    semantic: "MODELVIEW",
                    type: ee.FLOAT_MAT4
                  }), t[_ + "Attenuation"] = {
                    type: ee.FLOAT_VEC3,
                    value: [p.constantAttenuation, p.linearAttenuation, p.quadraticAttenuation]
                  };
                  break;

                case "spot":
                  var f = c.spot;
                  t[_ + "Color"] = {
                    type: ee.FLOAT_VEC3,
                    value: f.color
                  }, Z(c.node) && (t[_ + "Transform"] = {
                    node: c.node,
                    semantic: "MODELVIEW",
                    type: ee.FLOAT_MAT4
                  }, t[_ + "InverseTransform"] = {
                    node: c.node,
                    semantic: "MODELVIEWINVERSE",
                    type: ee.FLOAT_MAT4,
                    useInFragment: !0
                  }), t[_ + "Attenuation"] = {
                    type: ee.FLOAT_VEC3,
                    value: [f.constantAttenuation, f.linearAttenuation, f.quadraticAttenuation]
                  }, t[_ + "FallOff"] = {
                    type: ee.FLOAT_VEC2,
                    value: [f.fallOffAngle, f.fallOffExponent]
                  };
              }

              ++s;
            }
          }
        }

        return t;
      }(c),
          m = Y.splitIncompatibleMaterials(c),
          p = {},
          f = !1;

      return (e.material(c, function (e, n) {
        if (Z(e.extensions) && Z(e.extensions.KHR_materials_common)) {
          var t = e.extensions.KHR_materials_common,
              a = m[n],
              i = function (e, n) {
            var t = "";
            t += "technique:" + e.technique + ";";

            for (var a = e.values, i = Object.keys(a).sort(), o = i.length, r = 0; r < o; ++r) {
              var s = i[r];
              a.hasOwnProperty(s) && (t += s + ":" + oe(s, a[s]), t += ";");
            }

            var l = $(e.jointCount, 0);
            {
              var c;
              t += l.toString() + ";", Z(n) && (c = n.skinning, 0 < l && (t += c.type + ";"), t += n.hasVertexColors);
            }
            return t;
          }(t, a),
              o = p[i];

          Z(o) || (o = function (e, n, t, a, i, o) {
            Z(a) || (a = {});
            o = $(o, !1);
            var r,
                s = n.techniques,
                l = n.shaders,
                c = n.programs,
                u = a.technique.toUpperCase();
            Z(e.extensions) && Z(e.extensions.KHR_materials_common) && (r = e.extensions.KHR_materials_common.lights);

            var _,
                v = a.values,
                m = $(a.jointCount, 0),
                p = !1,
                f = !1;

            Z(t) && (_ = t.skinning, p = _.skinned, f = t.hasVertexColors);
            var d,
                g = "precision highp float;\n",
                h = "precision highp float;\n",
                y = "CONSTANT" !== u,
                x = {
              u_modelViewMatrix: {
                semantic: ae(e, "PGEARTH_RTC") ? "PGEARTH_RTC_MODELVIEW" : "MODELVIEW",
                type: ee.FLOAT_MAT4
              },
              u_projectionMatrix: {
                semantic: "PROJECTION",
                type: ee.FLOAT_MAT4
              }
            };
            y && (x.u_normalMatrix = {
              semantic: "MODELVIEWINVERSETRANSPOSE",
              type: ee.FLOAT_MAT3
            });
            p && (x.u_jointMatrix = {
              count: m,
              semantic: "JOINTMATRIX",
              type: ee.FLOAT_MAT4
            });
            var A = !1;

            for (var T in v) {
              var O;
              v.hasOwnProperty(T) && "transparent" !== T && "doubleSided" !== T && (O = oe(T, v[T]), d = "u_" + T.toLowerCase(), A || O !== ee.SAMPLER_2D || (A = !0), x[d] = {
                type: O
              });
            }

            Z(x.u_diffuse) && (x.u_diffuse.semantic = "_3DTILESDIFFUSE");
            if (Z(i)) for (var b in i) {
              i.hasOwnProperty(b) && (x[d = "u_" + b] = i[b]);
            }

            for (d in x) {
              var E, L;
              x.hasOwnProperty(d) && (E = x[d], L = Z(E.count) ? "[" + E.count + "]" : "", E.type !== ee.FLOAT_MAT3 && E.type !== ee.FLOAT_MAT4 || E.useInFragment ? (h += "uniform " + ne(E.type) + " " + d + L + ";\n", delete E.useInFragment) : g += "uniform " + ne(E.type) + " " + d + L + ";\n");
            }

            var C,
                M,
                R = "";

            if (p) {
              var D = ie(_.type),
                  w = !1;
              if (0 === _.type.indexOf("MAT") && (w = !0, D = Math.sqrt(D)), w) for (C = 0; C < D; C++) {
                for (M = 0; M < D; M++) {
                  R += 0 === C && 0 === M ? "  mat4 skinMat = " : "  skinMat += ", R += "a_weight[" + C + "][" + M + "] * u_jointMatrix[int(a_joint[" + C + "][" + M + "])];\n";
                }
              } else for (C = 0; C < D; C++) {
                R += 0 === C ? "  mat4 skinMat = " : "  skinMat += ", R += "a_weight[" + C + "] * u_jointMatrix[int(a_joint[" + C + "])];\n";
              }
            }

            var F,
                I = {
              a_position: {
                semantic: "POSITION"
              }
            };
            g += "attribute vec3 a_position;\n", g += "varying vec3 v_positionEC;\n", R += p ? "  vec4 pos = u_modelViewMatrix * skinMat * vec4(a_position,1.0);\n" : "  vec4 pos = u_modelViewMatrix * vec4(a_position,1.0);\n";
            R += "  v_positionEC = pos.xyz;\n", R += "  gl_Position = u_projectionMatrix * pos;\n", h += "varying vec3 v_positionEC;\n", y && (I.a_normal = {
              semantic: "NORMAL"
            }, g += "attribute vec3 a_normal;\n", g += "varying vec3 v_normal;\n", R += p ? "  v_normal = u_normalMatrix * mat3(skinMat) * a_normal;\n" : "  v_normal = u_normalMatrix * a_normal;\n", h += "varying vec3 v_normal;\n");
            A && (I.a_texcoord_0 = {
              semantic: "TEXCOORD_0"
            }, g += "attribute vec2 a_texcoord_0;\n", g += "varying vec2 " + (F = "v_texcoord_0") + ";\n", R += "  " + F + " = a_texcoord_0;\n", h += "varying vec2 " + F + ";\n");
            {
              var P;
              p && (P = Y.getShaderVariable(_.type), I.a_joint = {
                semantic: "JOINT"
              }, I.a_weight = {
                semantic: "WEIGHT"
              }, g += "attribute " + P + " a_joint;\n", g += "attribute " + P + " a_weight;\n");
            }
            f && (I.a_vertexColor = {
              semantic: "COLOR_0"
            }, g += "attribute vec4 a_vertexColor;\n", g += "varying vec4 v_vertexColor;\n", R += "  v_vertexColor = a_vertexColor;\n", h += "varying vec4 v_vertexColor;\n");
            o && (I.a_batchId = {
              semantic: "_BATCHID"
            }, g += "attribute float a_batchId;\n");
            var S,
                V,
                N = y && ("BLINN" === u || "PHONG" === u) && Z(x.u_specular) && Z(x.u_shininess) && 0 < x.u_shininess,
                H = !1,
                q = !1,
                K = "";

            for (var k in r) {
              var G, j, z, W;
              r.hasOwnProperty(k) && (G = r[k], j = G.type.toLowerCase(), z = G.baseName, K += "  {\n", W = "u_" + z + "Color", "ambient" === j ? (q = !0, K += "    ambientLight += " + W + ";\n") : y && (H = !0, S = "v_" + z + "Direction", V = "v_" + z + "Position", "point" !== j && (g += "varying vec3 " + S + ";\n", h += "varying vec3 " + S + ";\n", R += "  " + S + " = mat3(u_" + z + "Transform) * vec3(0.,0.,1.);\n", "directional" === j && (K += "    vec3 l = normalize(" + S + ");\n")), "directional" !== j ? (g += "varying vec3 " + V + ";\n", h += "varying vec3 " + V + ";\n", R += "  " + V + " = u_" + z + "Transform[3].xyz;\n", K += "    vec3 VP = " + V + " - v_positionEC;\n", K += "    vec3 l = normalize(VP);\n", K += "    float range = length(VP);\n", K += "    float attenuation = 1.0 / (u_" + z + "Attenuation.x + ", K += "(u_" + z + "Attenuation.y * range) + ", K += "(u_" + z + "Attenuation.z * range * range));\n") : K += "    float attenuation = 1.0;\n", "spot" === j && (K += "    float spotDot = dot(l, normalize(" + S + "));\n", K += "    if (spotDot < cos(u_" + z + "FallOff.x * 0.5))\n", K += "    {\n", K += "      attenuation = 0.0;\n", K += "    }\n", K += "    else\n", K += "    {\n", K += "        attenuation *= max(0.0, pow(spotDot, u_" + z + "FallOff.y));\n", K += "    }\n"), K += "    diffuseLight += " + W + "* max(dot(normal,l), 0.) * attenuation;\n", N && ("BLINN" === u ? (K += "    vec3 h = normalize(l + viewDir);\n", K += "    float specularIntensity = max(0., pow(max(dot(normal, h), 0.), u_shininess)) * attenuation;\n") : (K += "    vec3 reflectDir = reflect(-l, normal);\n", K += "    float specularIntensity = max(0., pow(max(dot(reflectDir, viewDir), 0.), u_shininess)) * attenuation;\n"), K += "    specularLight += " + W + " * specularIntensity;\n")), K += "  }\n");
            }

            q || (K += "  ambientLight += vec3(0.2, 0.2, 0.2);\n");
            {
              H || "CONSTANT" === u || (K += "  vec3 l = normalize(czm_sunDirectionEC);\n", K += "  diffuseLight += vec3(1.0, 1.0, 1.0) * max(dot(normal,l), 0.2);\n", N && ("BLINN" === u ? (K += "  vec3 h = normalize(l + viewDir);\n", K += "  float specularIntensity = max(0., pow(max(dot(normal, h), 0.), u_shininess));\n") : (K += "  vec3 reflectDir = reflect(-l, normal);\n", K += "  float specularIntensity = max(0., pow(max(dot(reflectDir, viewDir), 0.), u_shininess));\n"), K += "  specularLight += vec3(1.0, 1.0, 1.0) * specularIntensity;\n"));
            }
            g += "void main(void) {\n", g += R, g += "}\n", h += "void main(void) {\n";
            var B,
                U = "  vec3 color = vec3(0.0, 0.0, 0.0);\n";
            y && (h += "  vec3 normal = normalize(v_normal);\n", a.doubleSided && (h += "  if (gl_FrontFacing == false)\n", h += "  {\n", h += "    normal = -normal;\n", h += "  }\n"));
            B = "CONSTANT" !== u ? (Z(x.u_diffuse) && (x.u_diffuse.type === ee.SAMPLER_2D ? h += "  vec4 diffuse = texture2D(u_diffuse, " + F + ");\n" : h += "  vec4 diffuse = u_diffuse;\n", h += "  vec3 diffuseLight = vec3(0.0, 0.0, 0.0);\n", U += "  color += diffuse.rgb * diffuseLight;\n"), N && (x.u_specular.type === ee.SAMPLER_2D ? h += "  vec3 specular = texture2D(u_specular, " + F + ").rgb;\n" : h += "  vec3 specular = u_specular.rgb;\n", h += "  vec3 specularLight = vec3(0.0, 0.0, 0.0);\n", U += "  color += specular * specularLight;\n"), Z(x.u_transparency) ? "  gl_FragColor = vec4(color * diffuse.a * u_transparency, diffuse.a * u_transparency);\n" : "  gl_FragColor = vec4(color * diffuse.a, diffuse.a);\n") : Z(x.u_transparency) ? "  gl_FragColor = vec4(color * u_transparency, u_transparency);\n" : "  gl_FragColor = vec4(color, 1.0);\n";
            f && (U += "  color *= v_vertexColor.rgb;\n");
            Z(x.u_emission) && (x.u_emission.type === ee.SAMPLER_2D ? h += "  vec3 emission = texture2D(u_emission, " + F + ").rgb;\n" : h += "  vec3 emission = u_emission.rgb;\n", U += "  color += emission;\n");
            !Z(x.u_ambient) && "CONSTANT" === u || (Z(x.u_ambient) ? x.u_ambient.type === ee.SAMPLER_2D ? h += "  vec3 ambient = texture2D(u_ambient, " + F + ").rgb;\n" : h += "  vec3 ambient = u_ambient.rgb;\n" : h += "  vec3 ambient = diffuse.rgb;\n", U += "  color += ambient * ambientLight;\n");
            h += "  vec3 viewDir = -normalize(v_positionEC);\n", h += "  vec3 ambientLight = vec3(0.0, 0.0, 0.0);\n", h += K, h += U, h += B, h += "}\n";
            var J = te(l, {
              type: ee.VERTEX_SHADER,
              extras: {
                _pipeline: {
                  source: g,
                  extension: ".glsl"
                }
              }
            }),
                X = te(l, {
              type: ee.FRAGMENT_SHADER,
              extras: {
                _pipeline: {
                  source: h,
                  extension: ".glsl"
                }
              }
            }),
                Q = te(c, {
              fragmentShader: X,
              vertexShader: J
            });
            return te(s, {
              attributes: I,
              program: Q,
              uniforms: x
            });
          }(c, _, a, t, v, u.addBatchIdToGeneratedShaders), p[i] = o, f = !0);
          var r = {},
              s = t.values;

          for (var l in s) {
            s.hasOwnProperty(l) && "transparent" !== l && "doubleSided" !== l && (r["u_" + l.toLowerCase()] = s[l]);
          }

          e.extensions.KHR_techniques_webgl = {
            technique: o,
            values: r
          }, e.alphaMode = "OPAQUE", t.transparent && (e.alphaMode = "BLEND"), t.doubleSided && (e.doubleSided = !0);
        }
      }), f) ? (Y.ensureSemanticExistence(c), c) : c;
    }
  };
});