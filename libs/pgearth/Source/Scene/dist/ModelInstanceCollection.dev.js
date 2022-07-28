"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Check", "../Core/clone", "../Core/Color", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Matrix4", "../Core/PrimitiveType", "../Core/Resource", "../Core/RuntimeError", "../Core/Transforms", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/ShaderSource", "../ThirdParty/GltfPipeline/ForEach", "../ThirdParty/when", "./Model", "./ModelInstance", "./ModelUtility", "./SceneMode", "./ShadowMode"], function (g, t, p, r, u, h, _, d, v, e, n, i, y, w, o, m, b, f, x, T, a, E, l, s, C, c, M, I, B) {
  "use strict";

  var S = 0,
      A = 1,
      P = 2,
      L = 3;

  function V(e) {
    if (e = d(e, d.EMPTY_OBJECT), !v(e.gltf) && !v(e.url)) throw new i("Either options.gltf or options.url is required.");
    if (v(e.gltf) && v(e.url)) throw new i("Cannot pass in both options.gltf and options.url.");
    this.show = d(e.show, !0), this._instancingSupported = !1, this._dynamic = d(e.dynamic, !1), this._allowPicking = d(e.allowPicking, !0), this._ready = !1, this._readyPromise = s.defer(), this._state = S, this._dirty = !1, this._cull = d(e.cull, !0), this._opaquePass = d(e.opaquePass, a.OPAQUE), this._instances = function (e, t) {
      for (var r = (t = d(t, [])).length, n = new Array(r), i = 0; i < r; ++i) {
        var o = t[i],
            a = o.modelMatrix,
            s = d(o.batchId, i);
        n[i] = new c(e, a, s);
      }

      return n;
    }(this, e.instances), this._batchTable = e.batchTable, this._model = void 0, this._vertexBufferTypedArray = void 0, this._vertexBuffer = void 0, this._batchIdBuffer = void 0, this._instancedUniformsByProgram = void 0, this._drawCommands = [], this._modelCommands = void 0, this._boundingSphere = function (e) {
      for (var t = e.length, r = new Array(t), n = 0; n < t; ++n) {
        r[n] = y.getTranslation(e._instances[n]._modelMatrix, new p());
      }

      return g.fromPoints(r);
    }(this), this._center = p.clone(this._boundingSphere.center), this._rtcTransform = new y(), this._rtcModelView = new y(), this._mode = void 0, this.modelMatrix = y.clone(y.IDENTITY), this._modelMatrix = y.clone(this.modelMatrix), this._url = o.createIfNeeded(e.url), this._requestType = e.requestType, this._gltf = e.gltf, this._basePath = o.createIfNeeded(e.basePath), this._asynchronous = e.asynchronous, this._incrementallyLoadTextures = e.incrementallyLoadTextures, this._upAxis = e.upAxis, this._forwardAxis = e.forwardAxis, this.shadows = d(e.shadows, B.ENABLED), this._shadows = this.shadows, this._pickIdLoaded = e.pickIdLoaded, this.debugShowBoundingVolume = d(e.debugShowBoundingVolume, !1), this._debugShowBoundingVolume = !1, this.debugWireframe = d(e.debugWireframe, !1), this._debugWireframe = !1, this._imageBasedLightingFactor = new t(1, 1), t.clone(e.imageBasedLightingFactor, this._imageBasedLightingFactor), this.lightColor = e.lightColor, this.luminanceAtZenith = e.luminanceAtZenith, this.sphericalHarmonicCoefficients = e.sphericalHarmonicCoefficients, this.specularEnvironmentMaps = e.specularEnvironmentMaps;
  }

  e(V.prototype, {
    allowPicking: {
      get: function get() {
        return this._allowPicking;
      }
    },
    length: {
      get: function get() {
        return this._instances.length;
      }
    },
    activeAnimations: {
      get: function get() {
        return this._model.activeAnimations;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    },
    imageBasedLightingFactor: {
      get: function get() {
        return this._imageBasedLightingFactor;
      },
      set: function set(e) {
        r.typeOf.object("imageBasedLightingFactor", e), r.typeOf.number.greaterThanOrEquals("imageBasedLightingFactor.x", e.x, 0), r.typeOf.number.lessThanOrEquals("imageBasedLightingFactor.x", e.x, 1), r.typeOf.number.greaterThanOrEquals("imageBasedLightingFactor.y", e.y, 0), r.typeOf.number.lessThanOrEquals("imageBasedLightingFactor.y", e.y, 1), t.clone(e, this._imageBasedLightingFactor);
      }
    }
  });
  var O = new p(),
      R = new y();

  function z(e, t) {
    if (v(e._instancedUniformsByProgram)) return e._instancedUniformsByProgram[t];
    var r = {};
    e._instancedUniformsByProgram = r;
    var n,
        i,
        o,
        a = ["MODEL", "MODELVIEW", "PGEARTH_RTC_MODELVIEW", "MODELVIEWPROJECTION", "MODELINVERSE", "MODELVIEWINVERSE", "MODELVIEWPROJECTIONINVERSE", "MODELINVERSETRANSPOSE", "MODELVIEWINVERSETRANSPOSE"],
        s = ["MODELVIEW", "PGEARTH_RTC_MODELVIEW", "MODELVIEWPROJECTION", "MODELVIEWINVERSETRANSPOSE"],
        d = e._model._sourceTechniques;

    for (var c in d) {
      d.hasOwnProperty(c) && (i = (n = d[c]).program, v(r[i]) || (o = {}, r[i] = o, l.techniqueUniform(n, function (n, i, o, a) {
        return function (e, t) {
          var r = e.semantic;

          if (v(r) && -1 < n.indexOf(r)) {
            if (!(-1 < i.indexOf(r))) throw new m('Shader program cannot be optimized for instancing. Uniform "' + t + '" in program "' + o + '" uses unsupported semantic "' + r + '"');
            a[t] = r;
          }
        };
      }(a, s, t, o))));
    }

    return r[t];
  }

  function D(d, c) {
    return function (e, t, r) {
      var n, i, o;
      (e = u(e)).czm_instanced_modifiedModelView = (n = d, i = c, function () {
        return y.multiply(i.uniformState.view, n._rtcTransform, n._rtcModelView);
      }), e.czm_instanced_nodeTransform = (o = r, function () {
        return o.computedMatrix;
      });
      var a = z(d, t);

      for (var s in a) {
        a.hasOwnProperty(s) && delete e[s];
      }

      return v(d._batchTable) && (e = d._batchTable.getUniformMapCallback()(e)), e;
    };
  }

  function k(e) {
    var t = e._instances,
        r = e.length,
        n = e._center,
        i = e._vertexBufferTypedArray;
    v(i) || (i = new Float32Array(12 * r)), e._dynamic && (e._vertexBufferTypedArray = i);

    for (var o = 0; o < r; ++o) {
      var a = t[o]._modelMatrix,
          s = y.clone(a, R);
      s[12] -= n.x, s[13] -= n.y, s[14] -= n.z;
      var d = 12 * o;
      i[0 + d] = s[0], i[1 + d] = s[4], i[2 + d] = s[8], i[3 + d] = s[12], i[4 + d] = s[1], i[5 + d] = s[5], i[6 + d] = s[9], i[7 + d] = s[13], i[8 + d] = s[2], i[9 + d] = s[6], i[10 + d] = s[10], i[11 + d] = s[14];
    }

    return i;
  }

  function N(e, t) {
    var r,
        n,
        i,
        o,
        a,
        s,
        p,
        d = e._instancingSupported,
        c = v(e._batchTable),
        m = e._allowPicking,
        l = {
      url: e._url,
      requestType: e._requestType,
      gltf: e._gltf,
      basePath: e._basePath,
      shadows: e._shadows,
      cacheKey: void 0,
      asynchronous: e._asynchronous,
      allowPicking: m,
      incrementallyLoadTextures: e._incrementallyLoadTextures,
      upAxis: e._upAxis,
      forwardAxis: e._forwardAxis,
      precreatedAttributes: void 0,
      vertexShaderLoaded: void 0,
      fragmentShaderLoaded: void 0,
      uniformMapLoaded: void 0,
      pickIdLoaded: e._pickIdLoaded,
      ignoreCommands: !0,
      opaquePass: e._opaquePass,
      imageBasedLightingFactor: e.imageBasedLightingFactor,
      lightColor: e.lightColor,
      luminanceAtZenith: e.luminanceAtZenith,
      sphericalHarmonicCoefficients: e.sphericalHarmonicCoefficients,
      specularEnvironmentMaps: e.specularEnvironmentMaps
    };
    c || (e._pickIds = function (e, t) {
      for (var r = e._instances, n = r.length, i = new Array(n), o = 0; o < n; ++o) {
        i[o] = t.createPickId(r[o]);
      }

      return i;
    }(e, t)), d ? (function (e, t) {
      var r = e._instances,
          n = e.length,
          i = e._dynamic,
          o = v(e._batchTable);

      if (o) {
        for (var a = new Uint16Array(n), s = 0; s < n; ++s) {
          a[s] = r[s]._instanceId;
        }

        e._batchIdBuffer = f.createVertexBuffer({
          context: t,
          typedArray: a,
          usage: x.STATIC_DRAW
        });
      }

      if (!o) {
        var d = new Uint8Array(4 * n);

        for (s = 0; s < n; ++s) {
          var c = e._pickIds[s].color,
              m = 4 * s;
          d[m] = h.floatToByte(c.red), d[1 + m] = h.floatToByte(c.green), d[2 + m] = h.floatToByte(c.blue), d[3 + m] = h.floatToByte(c.alpha);
        }

        e._pickIdBuffer = f.createVertexBuffer({
          context: t,
          typedArray: d,
          usage: x.STATIC_DRAW
        });
      }

      var l = k(e);
      e._vertexBuffer = f.createVertexBuffer({
        context: t,
        typedArray: l,
        usage: i ? x.STREAM_DRAW : x.STATIC_DRAW
      });
    }(e, t), r = _.getSizeInBytes(_.FLOAT), n = {
      czm_modelMatrixRow0: {
        index: 0,
        vertexBuffer: e._vertexBuffer,
        componentsPerAttribute: 4,
        componentDatatype: _.FLOAT,
        normalize: !1,
        offsetInBytes: 0,
        strideInBytes: 12 * r,
        instanceDivisor: 1
      },
      czm_modelMatrixRow1: {
        index: 0,
        vertexBuffer: e._vertexBuffer,
        componentsPerAttribute: 4,
        componentDatatype: _.FLOAT,
        normalize: !1,
        offsetInBytes: 4 * r,
        strideInBytes: 12 * r,
        instanceDivisor: 1
      },
      czm_modelMatrixRow2: {
        index: 0,
        vertexBuffer: e._vertexBuffer,
        componentsPerAttribute: 4,
        componentDatatype: _.FLOAT,
        normalize: !1,
        offsetInBytes: 8 * r,
        strideInBytes: 12 * r,
        instanceDivisor: 1
      }
    }, c && (n.a_batchId = {
      index: 0,
      vertexBuffer: e._batchIdBuffer,
      componentsPerAttribute: 1,
      componentDatatype: _.UNSIGNED_SHORT,
      normalize: !1,
      offsetInBytes: 0,
      strideInBytes: 0,
      instanceDivisor: 1
    }), c || (n.pickColor = {
      index: 0,
      vertexBuffer: e._pickIdBuffer,
      componentsPerAttribute: 4,
      componentDatatype: _.UNSIGNED_BYTE,
      normalize: !0,
      offsetInBytes: 0,
      strideInBytes: 0,
      instanceDivisor: 1
    }), l.precreatedAttributes = n, l.vertexShaderLoaded = (p = e, function (e, t) {
      var r,
          n,
          i,
          o = z(p, t),
          a = v(p._batchTable),
          s = E.replaceMain(e, "czm_instancing_main"),
          d = "",
          c = "";

      for (var m in o) {
        o.hasOwnProperty(m) && ("MODELVIEW" === (r = o[m]) || "PGEARTH_RTC_MODELVIEW" === r ? n = "czm_instanced_modelView" : "MODELVIEWPROJECTION" === r ? (n = "czm_instanced_modelViewProjection", d += "mat4 czm_instanced_modelViewProjection;\n", c += "czm_instanced_modelViewProjection = czm_projection * czm_instanced_modelView;\n") : "MODELVIEWINVERSETRANSPOSE" === r && (n = "czm_instanced_modelViewInverseTranspose", d += "mat3 czm_instanced_modelViewInverseTranspose;\n", c += "czm_instanced_modelViewInverseTranspose = mat3(czm_instanced_modelView);\n"), i = new RegExp("uniform.*" + m + ".*"), s = s.replace(i, ""), i = new RegExp(m + "\\b", "g"), s = s.replace(i, n));
      }

      var l,
          u,
          h,
          _,
          f = a ? (l = "attribute float a_batchId;\n", u = "") : (l = "", u = "attribute vec4 pickColor;\nvarying vec4 v_pickColor;\n", "    v_pickColor = pickColor;\n"),
          g = "uniform mat4 czm_instanced_modifiedModelView;\nuniform mat4 czm_instanced_nodeTransform;\n" + d + "mat4 czm_instanced_modelView;\nattribute vec4 czm_modelMatrixRow0;\nattribute vec4 czm_modelMatrixRow1;\nattribute vec4 czm_modelMatrixRow2;\n" + l + u + s + "void main()\n{\n    mat4 czm_instanced_model = mat4(czm_modelMatrixRow0.x, czm_modelMatrixRow1.x, czm_modelMatrixRow2.x, 0.0, czm_modelMatrixRow0.y, czm_modelMatrixRow1.y, czm_modelMatrixRow2.y, 0.0, czm_modelMatrixRow0.z, czm_modelMatrixRow1.z, czm_modelMatrixRow2.z, 0.0, czm_modelMatrixRow0.w, czm_modelMatrixRow1.w, czm_modelMatrixRow2.w, 1.0);\n    czm_instanced_modelView = czm_instanced_modifiedModelView * czm_instanced_model * czm_instanced_nodeTransform;\n" + c + "    czm_instancing_main();\n" + f + "}\n";

      return a && (h = p._model.gltf, _ = M.getDiffuseAttributeOrUniform(h, t), g = p._batchTable.getVertexShaderCallback(!0, "a_batchId", _)(g)), g;
    }), l.fragmentShaderLoaded = (s = e, function (e, t) {
      var r,
          n,
          i = s._batchTable;
      return e = v(i) ? (r = s._model.gltf, n = M.getDiffuseAttributeOrUniform(r, t), i.getFragmentShaderCallback(!0, n)(e)) : "varying vec4 v_pickColor;\n" + e;
    }), l.uniformMapLoaded = D(e, t), v(e._url) && (l.cacheKey = e._url.getUrlComponent() + "#instanced")) : (l.vertexShaderLoaded = (a = e, function (e, t) {
      var r, n;
      return v(a._batchTable) && (r = a._model.gltf, n = M.getDiffuseAttributeOrUniform(r, t), e = "uniform float a_batchId\n;" + a._batchTable.getVertexShaderCallback(!0, "a_batchId", n)(e)), e;
    }), l.fragmentShaderLoaded = (o = e, function (e, t) {
      var r,
          n,
          i = o._batchTable;
      return e = v(i) ? (r = o._model.gltf, n = M.getDiffuseAttributeOrUniform(r, t), i.getFragmentShaderCallback(!0, n)(e)) : "uniform vec4 czm_pickColor;\n" + e;
    }), l.uniformMapLoaded = (i = e, function (e) {
      return v(i._batchTable) && (e = i._batchTable.getUniformMapCallback()(e)), e;
    })), v(e._url) ? e._model = C.fromGltf(l) : e._model = new C(l);
  }

  function W(e, t) {
    for (var r = e._instances, n = t.length, i = e.length, o = e._batchTable, a = v(o), s = e._cull, d = 0; d < n; ++d) {
      for (var c = 0; c < i; ++c) {
        var m,
            l = T.shallowClone(t[d]);
        l.modelMatrix = new y(), l.boundingVolume = new g(), l.cull = s, l.uniformMap = u(l.uniformMap), a ? l.uniformMap.a_batchId = function (e) {
          return function () {
            return e;
          };
        }(r[c]._instanceId) : (m = e._pickIds[c], l.uniformMap.czm_pickColor = function (e) {
          return function () {
            return e;
          };
        }(m.color)), e._drawCommands.push(l);
      }
    }
  }

  function F(e) {
    for (var t = e._modelCommands, r = t.length, n = e.length, i = e._rtcTransform, o = e._center, a = 0; a < r; ++a) {
      for (var s = t[a], d = 0; d < n; ++d) {
        var c = a * n + d,
            m = e._drawCommands[c],
            l = y.clone(e._instances[d]._modelMatrix, R);
        l[12] -= o.x, l[13] -= o.y, l[14] -= o.z, l = y.multiply(i, l, R);
        var u = s.modelMatrix,
            h = m.modelMatrix;
        y.multiply(l, u, h);
        var _ = s.boundingVolume,
            f = m.boundingVolume;
        g.transform(_, l, f);
      }
    }
  }

  function U(e) {
    for (var t = e._nodeCommands, r = t.length, n = [], i = 0; i < r; ++i) {
      var o = t[i];
      o.show && n.push(o.command);
    }

    return n;
  }

  function q(e, t) {
    e._drawCommands = [];
    var r = U(e._model);
    t ? function (e, t) {
      for (var r = t.length, n = e.length, i = e._boundingSphere, o = e._cull, a = 0; a < r; ++a) {
        var s = T.shallowClone(t[a]);
        s.instanceCount = n, s.boundingVolume = i, s.cull = o, v(e._batchTable) ? s.pickId = e._batchTable.getPickId() : s.pickId = "v_pickColor", e._drawCommands.push(s);
      }
    }(e, r) : (W(e, r), F(e));
  }

  return V.prototype.expandBoundingSphere = function (e) {
    var t = y.getTranslation(e, O);
    g.expand(this._boundingSphere, t, this._boundingSphere);
  }, V.prototype.update = function (e) {
    if (e.mode !== I.MORPHING && this.show && 0 !== this.length) {
      var t,
          r = e.context;
      this._state === S && (this._state = A, this._instancingSupported = r.instancedArrays, N(this, r), (t = this)._model.readyPromise.otherwise(function (e) {
        t._state = L, t._readyPromise.reject(e);
      }));
      var n = this._instancingSupported,
          i = this._model;

      if (i.imageBasedLightingFactor = this.imageBasedLightingFactor, i.lightColor = this.lightColor, i.luminanceAtZenith = this.luminanceAtZenith, i.sphericalHarmonicCoefficients = this.sphericalHarmonicCoefficients, i.specularEnvironmentMaps = this.specularEnvironmentMaps, i.update(e), i.ready && this._state === A) {
        this._state = P, this._ready = !0;
        var o = i.boundingSphere.radius + p.magnitude(i.boundingSphere.center);
        return this._boundingSphere.radius += o, this._modelCommands = U(i), q(this, n), void this._readyPromise.resolve(this);
      }

      if (this._state === P) {
        var a,
            s,
            d,
            c = e.mode !== this._mode,
            m = this.modelMatrix,
            l = !y.equals(this._modelMatrix, m);
        (c || l) && (this._mode = e.mode, y.clone(m, this._modelMatrix), a = y.multiplyByTranslation(this._modelMatrix, this._center, this._rtcTransform), this._mode !== I.SCENE3D && (a = b.basisTo2D(e.mapProjection, a, a)), y.getTranslation(a, this._boundingSphere.center)), n && this._dirty && (this._dynamic = !0, this._dirty = !1, d = k(s = this), s._vertexBuffer.copyFromArrayView(d)), function (e) {
          for (var t = e._nodeCommands, r = t.length, n = 0; n < r; n++) {
            if (t[n].command.dirty) return 1;
          }
        }(i) && q(this, n), !n && (i.dirty || this._dirty || c || l) && F(this), function (e) {
          if (e.shadows !== e._shadows) {
            e._shadows = e.shadows;

            for (var t = B.castShadows(e.shadows), r = B.receiveShadows(e.shadows), n = e._drawCommands, i = n.length, o = 0; o < i; ++o) {
              var a = n[o];
              a.castShadows = t, a.receiveShadows = r;
            }
          }
        }(this), function (e) {
          if (e._debugWireframe !== e.debugWireframe) {
            e._debugWireframe = e.debugWireframe;

            for (var t = e.debugWireframe ? w.LINES : w.TRIANGLES, r = e._drawCommands, n = r.length, i = 0; i < n; ++i) {
              r[i].primitiveType = t;
            }
          }
        }(this), function (e) {
          if (e.debugShowBoundingVolume !== e._debugShowBoundingVolume) {
            e._debugShowBoundingVolume = e.debugShowBoundingVolume;

            for (var t = e._drawCommands, r = t.length, n = 0; n < r; ++n) {
              t[n].debugShowBoundingVolume = e.debugShowBoundingVolume;
            }
          }
        }(this);
        var u = e.passes;
        if (u.render || u.pick) for (var h = e.commandList, _ = this._drawCommands, f = _.length, g = 0; g < f; ++g) {
          h.push(_[g]);
        }
      }
    }
  }, V.prototype.isDestroyed = function () {
    return !1;
  }, V.prototype.destroy = function () {
    this._model = this._model && this._model.destroy();
    var e = this._pickIds;
    if (v(e)) for (var t = e.length, r = 0; r < t; ++r) {
      e[r].destroy();
    }
    return n(this);
  }, V;
});