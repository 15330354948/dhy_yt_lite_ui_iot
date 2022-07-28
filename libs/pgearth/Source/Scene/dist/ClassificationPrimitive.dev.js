"use strict";

define(["../Core/ColorGeometryInstanceAttribute", "../Core/combine", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/GeometryInstance", "../Core/isArray", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Shaders/ShadowVolumeFS", "../Shaders/ShadowVolumeAppearanceVS", "../ThirdParty/when", "./BlendingState", "./ClassificationType", "./DepthFunction", "./PerInstanceColorAppearance", "./Primitive", "./SceneMode", "./ShadowVolumeAppearance", "./StencilConstants", "./StencilFunction", "./StencilOperation"], function (S, C, P, I, e, t, v, f, A, E, g, T, b, w, D, y, i, r, k, a, O, F, x, R, s, o, n) {
  "use strict";

  var c = ["color"];

  function d(e) {
    var t,
        r = (e = P(e, P.EMPTY_OBJECT)).geometryInstances;
    this.geometryInstances = r, this.show = P(e.show, !0), this.classificationType = P(e.classificationType, k.BOTH), this.debugShowBoundingVolume = P(e.debugShowBoundingVolume, !1), this.debugShowShadowVolume = P(e.debugShowShadowVolume, !1), this._debugShowShadowVolume = !1, this._extruded = P(e._extruded, !1), this._uniformMap = e._uniformMap, this._sp = void 0, this._spStencil = void 0, this._spPick = void 0, this._spColor = void 0, this._spPick2D = void 0, this._spColor2D = void 0, this._rsStencilPreloadPass = void 0, this._rsStencilPreloadPass3DTiles = void 0, this._rsStencilDepthPass = void 0, this._rsStencilDepthPass3DTiles = void 0, this._rsColorPass = void 0, this._rsPickPass = void 0, this._commandsIgnoreShow = [], this._ready = !1, this._readyPromise = i.defer(), this._primitive = void 0, this._pickPrimitive = e._pickPrimitive, this._hasSphericalExtentsAttribute = !1, this._hasPlanarExtentsAttributes = !1, this._hasPerColorAttribute = !1, this.appearance = e.appearance, I(r) && A(r) && 1 < r.length && (t = c), this._createBoundingVolumeFunction = e._createBoundingVolumeFunction, this._updateAndQueueCommandsFunction = e._updateAndQueueCommandsFunction, this._usePickOffsets = !1, this._primitiveOptions = {
      geometryInstances: void 0,
      appearance: void 0,
      vertexCacheOptimize: P(e.vertexCacheOptimize, !1),
      interleave: P(e.interleave, !1),
      releaseGeometryInstances: P(e.releaseGeometryInstances, !0),
      allowPicking: P(e.allowPicking, !0),
      asynchronous: P(e.asynchronous, !0),
      compressVertices: P(e.compressVertices, !0),
      _readOnlyInstanceAttributes: t,
      _createBoundingVolumeFunction: void 0,
      _createRenderStatesFunction: void 0,
      _createShaderProgramFunction: void 0,
      _createCommandsFunction: void 0,
      _updateAndQueueCommandsFunction: void 0,
      _createPickOffsets: !0
    };
  }

  function L(e, t) {
    var r = t ? o.EQUAL : o.ALWAYS;
    return {
      colorMask: {
        red: !1,
        green: !1,
        blue: !1,
        alpha: !1
      },
      stencilTest: {
        enabled: e,
        frontFunction: r,
        frontOperation: {
          fail: n.KEEP,
          zFail: n.DECREMENT_WRAP,
          zPass: n.DECREMENT_WRAP
        },
        backFunction: r,
        backOperation: {
          fail: n.KEEP,
          zFail: n.INCREMENT_WRAP,
          zPass: n.INCREMENT_WRAP
        },
        reference: s.PGEARTH_3D_TILE_MASK,
        mask: s.PGEARTH_3D_TILE_MASK
      },
      stencilMask: s.CLASSIFICATION_MASK,
      depthTest: {
        enabled: !1
      },
      depthMask: !1
    };
  }

  function M(e, t) {
    var r = t ? o.EQUAL : o.ALWAYS;
    return {
      colorMask: {
        red: !1,
        green: !1,
        blue: !1,
        alpha: !1
      },
      stencilTest: {
        enabled: e,
        frontFunction: r,
        frontOperation: {
          fail: n.KEEP,
          zFail: n.KEEP,
          zPass: n.INCREMENT_WRAP
        },
        backFunction: r,
        backOperation: {
          fail: n.KEEP,
          zFail: n.KEEP,
          zPass: n.DECREMENT_WRAP
        },
        reference: s.PGEARTH_3D_TILE_MASK,
        mask: s.PGEARTH_3D_TILE_MASK
      },
      stencilMask: s.CLASSIFICATION_MASK,
      depthTest: {
        enabled: !0,
        func: a.LESS_OR_EQUAL
      },
      depthMask: !1
    };
  }

  function N(e) {
    return {
      stencilTest: {
        enabled: e,
        frontFunction: o.NOT_EQUAL,
        frontOperation: {
          fail: n.KEEP,
          zFail: n.KEEP,
          zPass: n.DECREMENT_WRAP
        },
        backFunction: o.NOT_EQUAL,
        backOperation: {
          fail: n.KEEP,
          zFail: n.KEEP,
          zPass: n.DECREMENT_WRAP
        },
        reference: 0,
        mask: s.CLASSIFICATION_MASK
      },
      stencilMask: s.CLASSIFICATION_MASK,
      depthTest: {
        enabled: !1
      },
      depthMask: !1,
      blending: r.ALPHA_BLEND
    };
  }

  e(d.prototype, {
    vertexCacheOptimize: {
      get: function get() {
        return this._primitiveOptions.vertexCacheOptimize;
      }
    },
    interleave: {
      get: function get() {
        return this._primitiveOptions.interleave;
      }
    },
    releaseGeometryInstances: {
      get: function get() {
        return this._primitiveOptions.releaseGeometryInstances;
      }
    },
    allowPicking: {
      get: function get() {
        return this._primitiveOptions.allowPicking;
      }
    },
    asynchronous: {
      get: function get() {
        return this._primitiveOptions.asynchronous;
      }
    },
    compressVertices: {
      get: function get() {
        return this._primitiveOptions.compressVertices;
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
    _needs2DShader: {
      get: function get() {
        return this._hasPlanarExtentsAttributes || this._hasSphericalExtentsAttribute;
      }
    }
  }), d.isSupported = function (e) {
    return e.context.stencilBuffer;
  };
  var V = {
    stencilTest: {
      enabled: !0,
      frontFunction: o.NOT_EQUAL,
      frontOperation: {
        fail: n.KEEP,
        zFail: n.KEEP,
        zPass: n.DECREMENT_WRAP
      },
      backFunction: o.NOT_EQUAL,
      backOperation: {
        fail: n.KEEP,
        zFail: n.KEEP,
        zPass: n.DECREMENT_WRAP
      },
      reference: 0,
      mask: s.CLASSIFICATION_MASK
    },
    stencilMask: s.CLASSIFICATION_MASK,
    depthTest: {
      enabled: !1
    },
    depthMask: !1
  };

  function G(e, t) {
    var r = t.context,
        i = e._primitive,
        a = y,
        a = e._primitive._batchTable.getVertexShaderCallback()(a);

    a = F._appendDistanceDisplayConditionToShader(i, a), a = F._modifyShaderPosition(e, a, t.scene3DOnly), a = F._updateColorAttribute(i, a);
    var s = e._hasPlanarExtentsAttributes,
        o = s || e._hasSphericalExtentsAttribute;
    e._extruded && (a = function (e, t) {
      if (!e.compressVertices) return t;

      if (-1 !== t.search(/attribute\s+vec3\s+extrudeDirection;/g)) {
        var r = "compressedAttributes",
            i = "attribute vec2 " + r + ";",
            a = (a = t).replace(/attribute\s+vec3\s+extrudeDirection;/g, "");
        return [i, "vec3 extrudeDirection;\n", a = w.replaceMain(a, "czm_non_compressed_main"), "void main() \n{ \n    extrudeDirection = czm_octDecode(compressedAttributes, 65535.0);\n    czm_non_compressed_main(); \n}"].join("\n");
      }
    }(i, a));

    var n,
        c,
        d,
        h,
        l,
        p,
        m = e._extruded ? "EXTRUDED_GEOMETRY" : "",
        u = "ENABLE_GL_POSITION_LOG_DEPTH_AT_HEIGHT",
        _ = new w({
      defines: [m, u],
      sources: [a]
    }),
        S = new w({
      sources: [D]
    }),
        P = e._primitive._attributeLocations,
        C = new R(o, s, e.appearance);

    e._spStencil = b.replaceCache({
      context: r,
      shaderProgram: e._spStencil,
      vertexShaderSource: _,
      fragmentShaderSource: S,
      attributeLocations: P
    }), e._primitive.allowPicking ? (n = w.createPickVertexShaderSource(a), n = F._appendShowToShader(i, n), n = F._updatePickColorAttribute(n), c = C.createPickFragmentShader(!1), d = C.createPickVertexShader([m, u], n, !1, t.mapProjection), e._spPick = b.replaceCache({
      context: r,
      shaderProgram: e._spPick,
      vertexShaderSource: d,
      fragmentShaderSource: c,
      attributeLocations: P
    }), o && (p = r.shaderCache.getDerivedShaderProgram(e._spPick, "2dPick"), I(p) || (h = C.createPickFragmentShader(!0), l = C.createPickVertexShader([m, u], n, !0, t.mapProjection), p = r.shaderCache.createDerivedShaderProgram(e._spPick, "2dPick", {
      vertexShaderSource: l,
      fragmentShaderSource: h,
      attributeLocations: P
    })), e._spPick2D = p)) : e._spPick = b.fromCache({
      context: r,
      vertexShaderSource: _,
      fragmentShaderSource: S,
      attributeLocations: P
    }), a = F._appendShowToShader(i, a), _ = new w({
      defines: [m, u],
      sources: [a]
    }), e._sp = b.replaceCache({
      context: r,
      shaderProgram: e._sp,
      vertexShaderSource: _,
      fragmentShaderSource: S,
      attributeLocations: P
    });
    var v,
        f,
        A,
        E = C.createFragmentShader(!1),
        g = C.createVertexShader([m, u], a, !1, t.mapProjection);
    e._spColor = b.replaceCache({
      context: r,
      shaderProgram: e._spColor,
      vertexShaderSource: g,
      fragmentShaderSource: E,
      attributeLocations: P
    }), o && (A = r.shaderCache.getDerivedShaderProgram(e._spColor, "2dColor"), I(A) || (v = C.createFragmentShader(!0), f = C.createVertexShader([m, u], a, !0, t.mapProjection), A = r.shaderCache.createDerivedShaderProgram(e._spColor, "2dColor", {
      vertexShaderSource: f,
      fragmentShaderSource: v,
      attributeLocations: P
    })), e._spColor2D = A);
  }

  function K(e, t, r, i, a, s, o) {
    !function (e, t) {
      var r,
          i = e._primitive,
          a = 3 * i._va.length;
      t.length = a;

      for (var s = 0, o = i._batchTable.getUniformMapCallback()(e._uniformMap), n = e._needs2DShader, c = 0; c < a; c += 3) {
        var d = i._va[s++],
            h = t[c];
        I(h) || (h = t[c] = new E({
          owner: e,
          primitiveType: i._primitiveType
        })), h.vertexArray = d, h.renderState = e._rsStencilPreloadPass, h.shaderProgram = e._sp, h.uniformMap = o, h.pass = g.TERRAIN_CLASSIFICATION, (r = E.shallowClone(h, h.derivedCommands.tileset)).renderState = e._rsStencilPreloadPass3DTiles, r.pass = g.PGEARTH_3D_TILE_CLASSIFICATION, h.derivedCommands.tileset = r, h = t[c + 1], I(h) || (h = t[c + 1] = new E({
          owner: e,
          primitiveType: i._primitiveType
        })), h.vertexArray = d, h.renderState = e._rsStencilDepthPass, h.shaderProgram = e._sp, h.uniformMap = o, h.pass = g.TERRAIN_CLASSIFICATION, (r = E.shallowClone(h, h.derivedCommands.tileset)).renderState = e._rsStencilDepthPass3DTiles, r.pass = g.PGEARTH_3D_TILE_CLASSIFICATION, h.derivedCommands.tileset = r, h = t[c + 2], I(h) || (h = t[c + 2] = new E({
          owner: e,
          primitiveType: i._primitiveType
        })), h.vertexArray = d, h.renderState = e._rsColorPass, h.shaderProgram = e._spColor, h.pass = g.TERRAIN_CLASSIFICATION;
        var l,
            p = e.appearance.material;
        I(p) && (o = C(o, p._uniforms)), h.uniformMap = o, (r = E.shallowClone(h, h.derivedCommands.tileset)).pass = g.PGEARTH_3D_TILE_CLASSIFICATION, h.derivedCommands.tileset = r, n && ((l = E.shallowClone(h, h.derivedCommands.appearance2D)).shaderProgram = e._spColor2D, h.derivedCommands.appearance2D = l, (l = E.shallowClone(r, r.derivedCommands.appearance2D)).shaderProgram = e._spColor2D, r.derivedCommands.appearance2D = l);
      }

      for (var m = e._commandsIgnoreShow, u = e._spStencil, _ = 0, a = m.length = a / 3 * 2, S = 0; S < a; S += 2) {
        var P = m[S] = E.shallowClone(t[_], m[S]);
        P.shaderProgram = u, P.pass = g.PGEARTH_3D_TILE_CLASSIFICATION_IGNORE_SHOW, (P = m[S + 1] = E.shallowClone(t[_ + 1], m[S + 1])).shaderProgram = u, P.pass = g.PGEARTH_3D_TILE_CLASSIFICATION_IGNORE_SHOW, _ += 3;
      }
    }(e, s), function (e, t) {
      var r,
          i,
          a,
          s,
          o = e._usePickOffsets,
          n = e._primitive,
          c = 3 * n._va.length,
          d = 0;
      o && (c = 3 * (r = n._pickOffsets).length), t.length = c;

      for (var h = 0, l = n._batchTable.getUniformMapCallback()(e._uniformMap), p = e._needs2DShader, m = 0; m < c; m += 3) {
        var u,
            _ = n._va[h++];
        o && (i = r[d++], _ = n._va[i.index]), a = t[m], I(a) || (a = t[m] = new E({
          owner: e,
          primitiveType: n._primitiveType,
          pickOnly: !0
        })), a.vertexArray = _, a.renderState = e._rsStencilPreloadPass, a.shaderProgram = e._sp, a.uniformMap = l, a.pass = g.TERRAIN_CLASSIFICATION, o && (a.offset = i.offset, a.count = i.count), (s = E.shallowClone(a, a.derivedCommands.tileset)).renderState = e._rsStencilPreloadPass3DTiles, s.pass = g.PGEARTH_3D_TILE_CLASSIFICATION, a.derivedCommands.tileset = s, a = t[m + 1], I(a) || (a = t[m + 1] = new E({
          owner: e,
          primitiveType: n._primitiveType,
          pickOnly: !0
        })), a.vertexArray = _, a.renderState = e._rsStencilDepthPass, a.shaderProgram = e._sp, a.uniformMap = l, a.pass = g.TERRAIN_CLASSIFICATION, o && (a.offset = i.offset, a.count = i.count), (s = E.shallowClone(a, a.derivedCommands.tileset)).renderState = e._rsStencilDepthPass3DTiles, s.pass = g.PGEARTH_3D_TILE_CLASSIFICATION, a.derivedCommands.tileset = s, a = t[m + 2], I(a) || (a = t[m + 2] = new E({
          owner: e,
          primitiveType: n._primitiveType,
          pickOnly: !0
        })), a.vertexArray = _, a.renderState = e._rsPickPass, a.shaderProgram = e._spPick, a.uniformMap = l, a.pass = g.TERRAIN_CLASSIFICATION, o && (a.offset = i.offset, a.count = i.count), (s = E.shallowClone(a, a.derivedCommands.tileset)).pass = g.PGEARTH_3D_TILE_CLASSIFICATION, a.derivedCommands.tileset = s, p && ((u = E.shallowClone(a, a.derivedCommands.pick2D)).shaderProgram = e._spPick2D, a.derivedCommands.pick2D = u, (u = E.shallowClone(s, s.derivedCommands.pick2D)).shaderProgram = e._spPick2D, s.derivedCommands.pick2D = u);
      }
    }(e, o);
  }

  function z(e, t) {
    return Math.floor(e % t / 3);
  }

  function H(e, t, r, i, a, s) {
    e.modelMatrix = r, e.boundingVolume = a, e.cull = i, e.debugShowBoundingVolume = s, t.commandList.push(e);
  }

  function B(e, t, r, i, a) {
    e.modelMatrix = r, e.boundingVolume = a, e.cull = i, t.commandList.push(e);
  }

  return d.prototype.update = function (e) {
    if (I(this._primitive) || I(this.geometryInstances)) {
      var t = this.appearance;
      I(t) && I(t.material) && t.material.update(e.context);
      var c = this,
          r = this._primitiveOptions;

      if (!I(this._primitive)) {
        var i,
            a,
            s,
            o = A(this.geometryInstances) ? this.geometryInstances : [this.geometryInstances],
            n = o.length,
            d = !1,
            h = !0,
            l = !1,
            p = !1;

        for (0 < n && (a = o[0].attributes, l = R.hasAttributesForSphericalExtents(a), p = R.hasAttributesForTextureCoordinatePlanes(a), s = a.color), _ = 0; _ < n; _++) {
          var m = (i = o[_]).attributes.color;
          if (I(m)) d = !0;else if (d) throw new v("All GeometryInstances must have color attributes to use per-instance color.");
          h = h && I(m) && S.equals(s, m);
        }

        if (!h && !l && !p) throw new v("All GeometryInstances must have the same color attribute except via GroundPrimitives");
        if (d && !I(t) && (t = new O({
          flat: !0
        }), this.appearance = t), !d && t instanceof O) throw new v("PerInstanceColorAppearance requires color GeometryInstanceAttributes on all GeometryInstances");
        if (I(t.material) && !l && !p) throw new v("Materials on ClassificationPrimitives are not supported except via GroundPrimitives");
        this._usePickOffsets = !l && !p, this._hasSphericalExtentsAttribute = l, this._hasPlanarExtentsAttributes = p, this._hasPerColorAttribute = d;

        for (var u = new Array(n), _ = 0; _ < n; ++_) {
          i = o[_], u[_] = new f({
            geometry: i.geometry,
            attributes: i.attributes,
            modelMatrix: i.modelMatrix,
            id: i.id,
            pickPrimitive: P(this._pickPrimitive, c)
          });
        }

        r.appearance = t, r.geometryInstances = u, I(this._createBoundingVolumeFunction) && (r._createBoundingVolumeFunction = function (e, t) {
          c._createBoundingVolumeFunction(e, t);
        }), r._createRenderStatesFunction = function (e, t, r, i) {
          var a, s;
          I((a = c)._rsStencilPreloadPass) || (s = !a.debugShowShadowVolume, a._rsStencilPreloadPass = T.fromCache(L(s, !1)), a._rsStencilPreloadPass3DTiles = T.fromCache(L(s, !0)), a._rsStencilDepthPass = T.fromCache(M(s, !1)), a._rsStencilDepthPass3DTiles = T.fromCache(M(s, !0)), a._rsColorPass = T.fromCache(N(s)), a._rsPickPass = T.fromCache(V));
        }, r._createShaderProgramFunction = function (e, t, r) {
          G(c, t);
        }, r._createCommandsFunction = function (e, t, r, i, a, s, o) {
          K(c, 0, 0, 0, 0, s, o);
        }, I(this._updateAndQueueCommandsFunction) ? r._updateAndQueueCommandsFunction = function (e, t, r, i, a, s, o, n) {
          c._updateAndQueueCommandsFunction(e, t, r, i, a, s, o, n);
        } : r._updateAndQueueCommandsFunction = function (e, t, r, i, a, s, o, n) {
          !function (e, t, r, i, a, s, o) {
            var n,
                c = e._primitive;
            F._updateBoundingVolumes(c, t, a), t.mode === x.SCENE3D ? n = c._boundingSphereWC : t.mode === x.COLUMBUS_VIEW ? n = c._boundingSphereCV : t.mode === x.SCENE2D && I(c._boundingSphere2D) ? n = c._boundingSphere2D : I(c._boundingSphereMorph) && (n = c._boundingSphereMorph);
            var d = e.classificationType,
                h = d !== k.PGEARTH_3D_TILE,
                l = d !== k.TERRAIN,
                p = t.passes;

            if (p.render) {
              var m = r.length;

              for (S = 0; S < m; ++S) {
                v = n[z(S, m)], h && H(r[S], t, a, s, v, o), l && H(r[S].derivedCommands.tileset, t, a, s, v, o);
              }

              if (t.invertClassification) for (var u = e._commandsIgnoreShow, _ = u.length, S = 0; S < _; ++S) {
                v = n[Math.floor(S / 2)], H(u[S], t, a, s, v, o);
              }
            }

            if (p.pick) {
              var P = i.length,
                  C = c._pickOffsets;

              for (S = 0; S < P; ++S) {
                var v = n[C[z(S, P)].index];
                h && B(i[S], t, a, s, v), l && B(i[S].derivedCommands.tileset, t, a, s, v);
              }
            }
          }(c, t, r, i, a, s, o);
        }, this._primitive = new F(r), this._primitive.readyPromise.then(function (e) {
          c._ready = !0, c.releaseGeometryInstances && (c.geometryInstances = void 0);
          var t = e._error;
          I(t) ? c._readyPromise.reject(t) : c._readyPromise.resolve(c);
        });
      }

      if (this.debugShowShadowVolume && !this._debugShowShadowVolume && this._ready ? (this._debugShowShadowVolume = !0, this._rsStencilPreloadPass = T.fromCache(L(!1, !1)), this._rsStencilPreloadPass3DTiles = T.fromCache(L(!1, !0)), this._rsStencilDepthPass = T.fromCache(M(!1, !1)), this._rsStencilDepthPass3DTiles = T.fromCache(M(!1, !0)), this._rsColorPass = T.fromCache(N(!1))) : !this.debugShowShadowVolume && this._debugShowShadowVolume && (this._debugShowShadowVolume = !1, this._rsStencilPreloadPass = T.fromCache(L(!0, !1)), this._rsStencilPreloadPass3DTiles = T.fromCache(L(!0, !0)), this._rsStencilDepthPass = T.fromCache(M(!0, !1)), this._rsStencilDepthPass3DTiles = T.fromCache(M(!0, !0)), this._rsColorPass = T.fromCache(N(!0))), this._primitive.appearance !== t) {
        if (!this._hasSphericalExtentsAttribute && !this._hasPlanarExtentsAttributes && I(t.material)) throw new v("Materials on ClassificationPrimitives are not supported except via GroundPrimitive");
        if (!this._hasPerColorAttribute && t instanceof O) throw new v("PerInstanceColorAppearance requires color GeometryInstanceAttribute");
        this._primitive.appearance = t;
      }

      this._primitive.show = this.show, this._primitive.debugShowBoundingVolume = this.debugShowBoundingVolume, this._primitive.update(e);
    }
  }, d.prototype.getGeometryInstanceAttributes = function (e) {
    if (!I(this._primitive)) throw new v("must call update before calling getGeometryInstanceAttributes");
    return this._primitive.getGeometryInstanceAttributes(e);
  }, d.prototype.isDestroyed = function () {
    return !1;
  }, d.prototype.destroy = function () {
    return this._primitive = this._primitive && this._primitive.destroy(), this._sp = this._sp && this._sp.destroy(), this._spPick = this._spPick && this._spPick.destroy(), this._spColor = this._spColor && this._spColor.destroy(), this._spPick2D = void 0, this._spColor2D = void 0, t(this);
  }, d;
});