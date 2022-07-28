"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/clone", "../Core/defined", "../Core/defineProperties", "../Core/Matrix2", "../Core/Matrix3", "../Core/Matrix4", "../Core/Quaternion", "../Core/FeatureDetection", "../Core/RuntimeError", "../Core/WebGLConstants", "../Renderer/ShaderSource", "../ThirdParty/GltfPipeline/addToArray", "../ThirdParty/GltfPipeline/ForEach", "../ThirdParty/GltfPipeline/hasExtension", "./AttributeType", "./Axis"], function (C, t, y, r, E, w, e, g, A, L, i, n, o, a, O, T, b, u, x, R) {
  "use strict";

  var V = {
    updateForwardAxis: function updateForwardAxis(e) {
      var n = e.gltf.extras.sourceVersion;
      (w(n) && "2.0" !== n || "2.0" !== V.getAssetVersion(e.gltf)) && (e._gltfForwardAxis = R.X);
    },
    getAssetVersion: function getAssetVersion(e) {
      return w(e.asset) && w(e.asset.version) ? e.asset.version : "1.0";
    },
    splitIncompatibleMaterials: function splitIncompatibleMaterials(e) {
      var v = e.accessors,
          h = e.materials,
          p = {};
      return b.mesh(e, function (e) {
        b.meshPrimitive(e, function (e) {
          var n,
              t,
              r,
              i = e.material,
              o = h[i],
              a = e.attributes.JOINTS_0;
          w(a) && (t = (n = v[a]).componentType, r = n.type);

          var u,
              s = w(a),
              c = w(e.attributes.COLOR_0),
              f = w(e.targets),
              m = w(e.attributes.NORMAL),
              _ = w(e.attributes.TANGENT),
              l = w(e.attributes.TEXCOORD_0),
              d = p[i];

          w(d) ? d.skinning.skinned === s && d.skinning.type === r && d.hasVertexColors === c && d.hasMorphTargets === f && d.hasNormals === m && d.hasTangents === _ && d.hasTexCoords === l || (u = E(o, !0), i = T(h, u), e.material = i, p[i] = {
            skinning: {
              skinned: s,
              componentType: t,
              type: r
            },
            hasVertexColors: c,
            hasMorphTargets: f,
            hasNormals: m,
            hasTangents: _,
            hasTexCoords: l
          }) : p[i] = {
            skinning: {
              skinned: s,
              componentType: t,
              type: r
            },
            hasVertexColors: c,
            hasMorphTargets: f,
            hasNormals: m,
            hasTangents: _,
            hasTexCoords: l
          };
        });
      }), p;
    },
    getShaderVariable: function getShaderVariable(e) {
      return "SCALAR" === e ? "float" : e.toLowerCase();
    },
    ModelState: {
      NEEDS_LOAD: 0,
      LOADING: 1,
      LOADED: 2,
      FAILED: 3
    },
    getFailedLoadFunction: function getFailedLoadFunction(t, r, i) {
      return function (e) {
        t._state = V.ModelState.FAILED;
        var n = "Failed to load " + r + ": " + i;
        w(e) && (n += "\n" + e.message), t._readyPromise.reject(new o(n));
      };
    },
    parseBuffers: function parseBuffers(r, i) {
      var o = r._loadResources;
      b.buffer(r.gltf, function (e, n) {
        var t;
        w(e.extras._pipeline.source) ? o.buffers[n] = e.extras._pipeline.source : w(i) && (t = r._resource.getDerivedResource({
          url: e.uri
        }), ++o.pendingBufferLoads, t.fetchArrayBuffer().then(i(r, n)).otherwise(V.getFailedLoadFunction(r, "buffer", t.url)));
      });
    }
  },
      M = new y(),
      S = new y();

  function s(e, n) {
    var t = e.accessors,
        r = e.materials,
        i = e.extensions.KHR_techniques_webgl,
        o = i.techniques,
        a = i.programs,
        u = i.shaders,
        s = n.targets,
        c = n.attributes;

    for (var f in s) {
      if (s.hasOwnProperty(f)) {
        var m = s[f];

        for (var _ in m) {
          "extras" !== _ && (c[_ + "_" + f] = m[_]);
        }
      }
    }

    var l,
        d,
        v,
        h,
        p,
        E = o[r[n.material].extensions.KHR_techniques_webgl.technique],
        g = u[a[E.program].vertexShader];

    for (var A in c) {
      c.hasOwnProperty(A) && (w(function (e, t) {
        return b.techniqueAttribute(e, function (e, n) {
          if (e.semantic === t) return n;
        });
      }(E, A)) || (l = t[c[A]], "_" === (d = A.toLowerCase()).charAt(0) && (d = d.slice(1)), v = "a_" + d, E.attributes[v] = {
        semantic: A,
        type: l.componentType
      }, p = (h = g.extras._pipeline).source, p = "attribute " + V.getShaderVariable(l.type) + " " + v + ";\n" + p, h.source = p));
    }
  }

  function c(e, r, i, o) {
    return u(e, "KHR_techniques_webgl") ? function (e, n) {
      if (!(e.semantic !== i || o && w(e.node))) return n;
    } : function (e, n) {
      var t = r.parameters[e];
      if (!(t.semantic !== i || o && w(t.node))) return n;
    };
  }

  V.computeBoundingSphere = function (e) {
    for (var n = e.gltf, t = n.nodes, r = n.meshes, i = n.scenes[n.scene].nodes, o = i.length, a = [], u = new y(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), s = new y(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE), c = 0; c < o; ++c) {
      var f = t[i[c]];

      for (f._transformToRoot = V.getTransform(f), a.push(f); 0 < a.length;) {
        var m = (f = a.pop())._transformToRoot,
            _ = f.mesh;

        if (w(_)) for (var l = r[_].primitives, d = l.length, v = 0; v < d; ++v) {
          var h,
              p,
              E,
              g = l[v].attributes.POSITION;
          w(g) && (h = V.getAccessorMinMax(n, g), p = y.fromArray(h.min, 0, M), E = y.fromArray(h.max, 0, S), w(u) && w(s) && (L.multiplyByPoint(m, p, p), L.multiplyByPoint(m, E, E), y.minimumByComponent(u, p, u), y.maximumByComponent(s, E, s)));
        }
        var A = f.children;
        if (w(A)) for (var O = A.length, T = 0; T < O; ++T) {
          var b = t[A[T]];
          b._transformToRoot = V.getTransform(b), L.multiplyTransformation(m, b._transformToRoot, b._transformToRoot), a.push(b);
        }
        delete f._transformToRoot;
      }
    }

    var x = C.fromCornerPoints(u, s);
    return e._forwardAxis === R.Z && C.transformWithoutScale(x, R.Z_UP_TO_X_UP, x), e._upAxis === R.Y ? C.transformWithoutScale(x, R.Y_UP_TO_Z_UP, x) : e._upAxis === R.X && C.transformWithoutScale(x, R.X_UP_TO_Z_UP, x), x;
  }, V.ensureSemanticExistence = function (n) {
    return b.mesh(n, function (e) {
      b.meshPrimitive(e, function (e) {
        s(n, e);
      });
    }), n;
  }, V.createAttributeLocations = function (e, n) {
    var t = {},
        r = !1,
        i = 1;
    if (b.techniqueAttribute(e, function (e, n) {
      /pos/i.test(n) && !r ? (t[n] = 0, r = !0) : t[n] = i++;
    }), w(n)) for (var o in n) {
      n.hasOwnProperty(o) && (t[o] = i++);
    }
    return t;
  }, V.getAccessorMinMax = function (e, n) {
    var t,
        r = e.accessors[n],
        i = r.extensions,
        o = r.min,
        a = r.max;
    return w(i) && (t = i.WEB3D_quantized_attributes, w(t) && (o = t.decodedMin, a = t.decodedMax)), {
      min: o,
      max: a
    };
  }, V.getAttributeOrUniformBySemantic = function (t, r, i, o) {
    return b.technique(t, function (e) {
      if (!w(i) || e.program === i) {
        var n = b.techniqueAttribute(e, c(t, e, r, o));
        return w(n) ? n : b.techniqueUniform(e, c(t, e, r, o));
      }
    });
  }, V.getDiffuseAttributeOrUniform = function (e, n) {
    var t = V.getAttributeOrUniformBySemantic(e, "COLOR_0", n);
    return w(t) || (t = V.getAttributeOrUniformBySemantic(e, "_3DTILESDIFFUSE", n)), t;
  };

  var f = new y(),
      m = new i(),
      _ = new y();

  function I(e, n, t) {
    n += "(?!\\w)", n = new RegExp(n, "g");
    var r = e.search(n);
    return e.replace(n, function (e, n) {
      return r === n ? e : t;
    });
  }

  function P(e, n, t) {
    var r = n.material,
        i = e.materials[r];

    if (u(e, "KHR_techniques_webgl") && w(i.extensions) && w(i.extensions.KHR_techniques_webgl)) {
      var o = i.extensions.KHR_techniques_webgl.technique,
          a = e.extensions.KHR_techniques_webgl.techniques[o];
      return b.techniqueAttribute(a, function (e, n) {
        if (e.semantic === t) return n;
      });
    }
  }

  function l(e) {
    var n = {
      value: e,
      clone: function clone(e, n) {
        return e;
      },
      func: function func() {
        return n.value;
      }
    };
    return n;
  }

  function d(e) {
    var n = {
      value: t.fromArray(e),
      clone: t.clone,
      func: function func() {
        return n.value;
      }
    };
    return n;
  }

  function v(e) {
    var n = {
      value: y.fromArray(e),
      clone: y.clone,
      func: function func() {
        return n.value;
      }
    };
    return n;
  }

  function D(e) {
    var n = {
      value: r.fromArray(e),
      clone: r.clone,
      func: function func() {
        return n.value;
      }
    };
    return n;
  }

  function N(e) {
    var n = {
      value: g.fromColumnMajorArray(e),
      clone: g.clone,
      func: function func() {
        return n.value;
      }
    };
    return n;
  }

  function U(e) {
    var n = {
      value: A.fromColumnMajorArray(e),
      clone: A.clone,
      func: function func() {
        return n.value;
      }
    };
    return n;
  }

  function q(e) {
    var n = {
      value: L.fromColumnMajorArray(e),
      clone: L.clone,
      func: function func() {
        return n.value;
      }
    };
    return n;
  }

  function h(e, n, t) {
    this._value = void 0, this._textureId = e.index, this._textures = n, this._defaultTexture = t;
  }

  V.getTransform = function (e, n) {
    return w(e.matrix) ? L.fromColumnMajorArray(e.matrix, n) : L.fromTranslationQuaternionRotationScale(y.fromArray(e.translation, 0, f), i.unpack(e.rotation, 0, m), y.fromArray(e.scale, 0, _), n);
  }, V.getUsedExtensions = function (e) {
    var n = e.extensionsUsed,
        t = {};
    if (w(n)) for (var r = n.length, i = 0; i < r; i++) {
      t[n[i]] = !0;
    }
    return t;
  }, V.getRequiredExtensions = function (e) {
    var n = e.extensionsRequired,
        t = {};
    if (w(n)) for (var r = n.length, i = 0; i < r; i++) {
      t[n[i]] = !0;
    }
    return t;
  }, V.supportedExtensions = {
    AGI_articulations: !0,
    PGEARTH_RTC: !0,
    EXT_texture_webp: !0,
    KHR_blend: !0,
    KHR_binary_glTF: !0,
    KHR_draco_mesh_compression: !0,
    KHR_materials_common: !0,
    KHR_techniques_webgl: !0,
    KHR_materials_unlit: !0,
    KHR_materials_pbrSpecularGlossiness: !0,
    KHR_texture_transform: !0,
    WEB3D_quantized_attributes: !0
  }, V.checkSupportedExtensions = function (e, n) {
    for (var t in e) {
      if (e.hasOwnProperty(t)) {
        if (!V.supportedExtensions[t]) throw new o("Unsupported glTF Extension: " + t);
        if ("EXT_texture_webp" === t && !1 === n) throw new o("Loaded model requires WebP but browser does not support it.");
      }
    }
  }, V.checkSupportedGlExtensions = function (e, n) {
    if (w(e)) for (var t = e.length, r = 0; r < t; r++) {
      var i = e[r];
      if ("OES_element_index_uint" !== i) throw new o("Unsupported WebGL Extension: " + i);
      if (!n.elementIndexUint) throw new o("OES_element_index_uint WebGL extension is not enabled.");
    }
  }, V.modifyShaderForDracoQuantizedAttributes = function (e, n, t, r) {
    var i = {};

    for (var o in r) {
      if (r.hasOwnProperty(o)) {
        var a = r[o],
            u = a.quantization;
        if (!w(u)) continue;
        var s = P(e, n, o);
        "_" === o.charAt(0) && (o = o.substring(1));

        var c,
            f,
            m,
            _,
            l,
            d,
            v,
            h,
            p,
            E = "gltf_u_dec_" + o.toLowerCase();

        w(i[E]) || (c = "gltf_decoded_" + o, f = s.replace("a_", "gltf_a_dec_"), m = a.componentsPerAttribute, t = I(t, s, f), t = (_ = u.octEncoded ? "vec3" : 1 < m ? "vec" + m : "float") + " " + f + ";\n" + t, (l = 3 === m && "COLOR_0" === o) && (t = I(t, f, "vec4(" + f + ", 1.0)")), p = "", p = u.octEncoded ? (t = "uniform float " + (d = E + "_rangeConstant") + ";\n" + t, "\nvoid main() {\n    " + f + " = czm_octDecode(" + s + ".xy, " + d + ").zxy;\n    " + c + "();\n}\n") : (t = "uniform float " + (v = E + "_normConstant") + ";\nuniform " + _ + " " + (h = E + "_min") + ";\n" + t, "\nvoid main() {\n    " + f + " = " + h + " + " + s + (l ? ".xyz" : "") + " * " + v + ";\n    " + c + "();\n}\n"), t = O.replaceMain(t, c), t += p);
      }
    }

    return {
      shader: t
    };
  }, V.modifyShaderForQuantizedAttributes = function (e, n, t) {
    var r,
        i,
        o,
        a,
        u,
        s,
        c,
        f,
        m,
        _,
        l,
        d,
        v = {},
        h = n.attributes;

    for (var p in h) {
      h.hasOwnProperty(p) && (r = P(e, n, p), i = n.attributes[p], "_" === p.charAt(0) && (p = p.substring(1)), a = (o = "gltf_u_dec_" + p.toLowerCase()) + "_scale", u = o + "_translate", w(v[o]) || w(v[a]) || (s = function (e, n) {
        var t = e.accessors[n].extensions;
        if (w(t)) return t.WEB3D_quantized_attributes;
      }(e, i), w(s) && (c = s.decodeMatrix, f = "gltf_decoded_" + p, m = r.replace("a_", "gltf_a_dec_"), t = (l = 2 < (_ = Math.floor(Math.sqrt(c.length))) ? "vec" + (_ - 1) : "float") + " " + m + ";\n" + (t = I(t, r, m)), d = "", 5 === _ ? (t = "uniform vec4 " + u + ";\n" + (t = "uniform mat4 " + a + ";\n" + t), d = "\nvoid main() {\n    " + m + " = " + a + " * " + r + " + " + u + ";\n    " + f + "();\n}\n", v[a] = {
        mat: 4
      }, v[u] = {
        vec: 4
      }) : (t = "uniform mat" + _ + " " + o + ";\n" + t, d = "\nvoid main() {\n    " + m + " = " + l + "(" + o + " * vec" + _ + "(" + r + ",1.0));\n    " + f + "();\n}\n", v[o] = {
        mat: _
      }), t = O.replaceMain(t, f), t += d)));
    }

    return {
      shader: t,
      uniforms: v
    };
  }, V.toClipCoordinatesGLSL = function (e, n) {
    var t = V.getAttributeOrUniformBySemantic(e, "POSITION"),
        r = t.replace("a_", "gltf_a_dec_");
    -1 !== n.indexOf(r) && (t = r);
    var i,
        o,
        a = V.getAttributeOrUniformBySemantic(e, "MODELVIEWPROJECTION", void 0, !0);
    return w(a) && -1 !== n.indexOf(a) || (i = V.getAttributeOrUniformBySemantic(e, "PROJECTION", void 0, !0), o = V.getAttributeOrUniformBySemantic(e, "MODELVIEW", void 0, !0), -1 !== n.indexOf("czm_instanced_modelView ") ? o = "czm_instanced_modelView" : w(o) || (o = V.getAttributeOrUniformBySemantic(e, "PGEARTH_RTC_MODELVIEW", void 0, !0)), a = i + " * " + o), a + " * vec4(" + t + ".xyz, 1.0)";
  }, V.modifyFragmentShaderForLogDepth = function (e) {
    return e = O.replaceMain(e, "czm_depth_main"), e += "\nvoid main() \n{ \n    czm_depth_main(); \n    czm_writeLogDepth(); \n} \n";
  }, V.modifyVertexShaderForLogDepth = function (e, n) {
    return e = O.replaceMain(e, "czm_depth_main"), e += "\nvoid main() \n{ \n    czm_depth_main(); \n    czm_vertexLogDepth(" + n + "); \n} \n";
  }, e(h.prototype, {
    value: {
      get: function get() {
        if (!w(this._value)) {
          var e = this._textures[this._textureId];
          if (!w(e)) return this._defaultTexture;
          this._value = e;
        }

        return this._value;
      },
      set: function set(e) {
        this._value = e;
      }
    }
  }), h.prototype.clone = function (e) {
    return e;
  }, h.prototype.func = void 0;
  var p = {};
  p[a.FLOAT] = l, p[a.FLOAT_VEC2] = d, p[a.FLOAT_VEC3] = v, p[a.FLOAT_VEC4] = D, p[a.INT] = l, p[a.INT_VEC2] = d, p[a.INT_VEC3] = v, p[a.INT_VEC4] = D, p[a.BOOL] = l, p[a.BOOL_VEC2] = d, p[a.BOOL_VEC3] = v, p[a.BOOL_VEC4] = D, p[a.FLOAT_MAT2] = N, p[a.FLOAT_MAT3] = U, p[a.FLOAT_MAT4] = q, p[a.SAMPLER_2D] = function (e, n, t) {
    var r = new h(e, n, t);
    return r.func = function () {
      return r.value;
    }, r;
  }, V.createUniformFunction = function (e, n, t, r) {
    return p[e](n, t, r);
  }, V.createUniformsForDracoQuantizedAttributes = function (e) {
    var n = {};

    for (var t in e) {
      if (e.hasOwnProperty(t)) {
        var r = e[t],
            i = r.quantization;
        if (!w(i)) continue;
        "_" === t.charAt(0) && (t = t.substring(1));
        var o = "gltf_u_dec_" + t.toLowerCase();

        if (i.octEncoded) {
          var a = o + "_rangeConstant",
              u = (1 << i.quantizationBits) - 1;
          n[a] = l(u).func;
          continue;
        }

        var s = o + "_normConstant",
            c = i.range / (1 << i.quantizationBits);
        n[s] = l(c).func;
        var f = o + "_min";

        switch (r.componentsPerAttribute) {
          case 1:
            n[f] = l(i.minValues).func;
            break;

          case 2:
            n[f] = d(i.minValues).func;
            break;

          case 3:
            n[f] = v(i.minValues).func;
            break;

          case 4:
            n[f] = D(i.minValues).func;
        }
      }
    }

    return n;
  }, V.createUniformsForQuantizedAttributes = function (e, n, t) {
    var r,
        i,
        o,
        a = e.accessors,
        u = {},
        s = {},
        c = n.attributes;

    for (var f in c) {
      if (c.hasOwnProperty(f)) {
        var m = a[c[f]],
            _ = m.extensions;

        if ("_" === f.charAt(0) && (f = f.substring(1)), w(_)) {
          var l = _.WEB3D_quantized_attributes;

          if (w(l)) {
            var d = l.decodeMatrix,
                v = "gltf_u_dec_" + f.toLowerCase();

            switch (m.type) {
              case x.SCALAR:
                s[v] = N(d).func, u[v] = !0;
                break;

              case x.VEC2:
                s[v] = U(d).func, u[v] = !0;
                break;

              case x.VEC3:
                s[v] = q(d).func, u[v] = !0;
                break;

              case x.VEC4:
                var h = v + "_scale",
                    p = v + "_translate";
                s[h] = q([(i = d)[0], i[1], i[2], i[3], i[5], i[6], i[7], i[8], i[10], i[11], i[12], i[13], i[15], i[16], i[17], i[18]]).func, s[p] = D([(r = d)[20], r[21], r[22], r[23]]).func, u[h] = !0, u[p] = !0;
            }
          }
        }
      }
    }

    for (var E in t) {
      t.hasOwnProperty(E) && (u[E] || (o = t[E], w(o.mat) && (2 === o.mat ? s[E] = N(g.IDENTITY).func : 3 === o.mat ? s[E] = U(A.IDENTITY).func : 4 === o.mat && (s[E] = q(L.IDENTITY).func)), w(o.vec) && 4 === o.vec && (s[E] = D([0, 0, 0, 0]).func)));
    }

    return s;
  };
  var F = new y(),
      B = {
    MODEL: function MODEL(e, n) {
      return function () {
        return e.model;
      };
    },
    VIEW: function VIEW(e, n) {
      return function () {
        return e.view;
      };
    },
    PROJECTION: function PROJECTION(e, n) {
      return function () {
        return e.projection;
      };
    },
    MODELVIEW: function MODELVIEW(e, n) {
      return function () {
        return e.modelView;
      };
    },
    PGEARTH_RTC_MODELVIEW: function PGEARTH_RTC_MODELVIEW(e, n) {
      var t = new L();
      return function () {
        return w(n._rtcCenter) ? (L.getTranslation(e.model, F), y.add(F, n._rtcCenter, F), L.multiplyByPoint(e.view, F, F), L.setTranslation(e.modelView, F, t)) : e.modelView;
      };
    },
    MODELVIEWPROJECTION: function MODELVIEWPROJECTION(e, n) {
      return function () {
        return e.modelViewProjection;
      };
    },
    MODELINVERSE: function MODELINVERSE(e, n) {
      return function () {
        return e.inverseModel;
      };
    },
    VIEWINVERSE: function VIEWINVERSE(e, n) {
      return function () {
        return e.inverseView;
      };
    },
    PROJECTIONINVERSE: function PROJECTIONINVERSE(e, n) {
      return function () {
        return e.inverseProjection;
      };
    },
    MODELVIEWINVERSE: function MODELVIEWINVERSE(e, n) {
      return function () {
        return e.inverseModelView;
      };
    },
    MODELVIEWPROJECTIONINVERSE: function MODELVIEWPROJECTIONINVERSE(e, n) {
      return function () {
        return e.inverseModelViewProjection;
      };
    },
    MODELINVERSETRANSPOSE: function MODELINVERSETRANSPOSE(e, n) {
      return function () {
        return e.inverseTransposeModel;
      };
    },
    MODELVIEWINVERSETRANSPOSE: function MODELVIEWINVERSETRANSPOSE(e, n) {
      return function () {
        return e.normal;
      };
    },
    VIEWPORT: function VIEWPORT(e, n) {
      return function () {
        return e.viewportCartesian4;
      };
    }
  };
  return V.getGltfSemanticUniforms = function () {
    return B;
  }, V;
});