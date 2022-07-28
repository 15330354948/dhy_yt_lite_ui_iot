"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/GeometryInstance", "../Core/GeometryInstanceAttribute", "../Core/GroundPolylineGeometry", "../Core/isArray", "../Shaders/PolylineShadowVolumeVS", "../Shaders/PolylineShadowVolumeFS", "../Shaders/PolylineShadowVolumeMorphVS", "../Shaders/PolylineShadowVolumeMorphFS", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../ThirdParty/when", "./BlendingState", "./ClassificationType", "./CullFace", "./PolylineColorAppearance", "./PolylineMaterialAppearance", "./Primitive", "./SceneMode", "./StencilConstants", "./StencilFunction", "./StencilOperation"], function (f, l, t, C, e, r, p, m, u, _, v, P, w, b, I, S, g, i, T, E, o, n, y, a, D, s, A, M, d, h, c) {
  "use strict";

  function O(e) {
    e = t(e, t.EMPTY_OBJECT), this.geometryInstances = e.geometryInstances, this._hasPerInstanceColors = !0;
    var r = e.appearance;
    C(r) || (r = new s()), this.appearance = r, this.show = t(e.show, !0), this.classificationType = t(e.classificationType, y.BOTH), this.debugShowBoundingVolume = t(e.debugShowBoundingVolume, !1), this._debugShowShadowVolume = t(e.debugShowShadowVolume, !1), this._primitiveOptions = {
      geometryInstances: void 0,
      appearance: void 0,
      vertexCacheOptimize: !1,
      interleave: t(e.interleave, !1),
      releaseGeometryInstances: t(e.releaseGeometryInstances, !0),
      allowPicking: t(e.allowPicking, !0),
      asynchronous: t(e.asynchronous, !0),
      compressVertices: !1,
      _createShaderProgramFunction: void 0,
      _createCommandsFunction: void 0,
      _updateAndQueueCommandsFunction: void 0
    }, this._zIndex = void 0, this._ready = !1, this._readyPromise = o.defer(), this._primitive = void 0, this._sp = void 0, this._sp2D = void 0, this._spMorph = void 0, this._renderState = G(!1), this._renderState3DTiles = G(!0), this._renderStateMorph = i.fromCache({
      cull: {
        enabled: !0,
        face: a.FRONT
      },
      depthTest: {
        enabled: !0
      },
      blending: n.ALPHA_BLEND,
      depthMask: !1
    });
  }

  function G(e) {
    return i.fromCache({
      cull: {
        enabled: !0
      },
      blending: n.ALPHA_BLEND,
      depthMask: !1,
      stencilTest: {
        enabled: e,
        frontFunction: h.EQUAL,
        frontOperation: {
          fail: c.KEEP,
          zFail: c.KEEP,
          zPass: c.KEEP
        },
        backFunction: h.EQUAL,
        backOperation: {
          fail: c.KEEP,
          zFail: c.KEEP,
          zPass: c.KEEP
        },
        reference: d.PGEARTH_3D_TILE_MASK,
        mask: d.PGEARTH_3D_TILE_MASK
      }
    });
  }

  function V(e, r, t, i, o, n, a) {
    t.mode === M.MORPHING ? r = r.derivedCommands.colorMorph : t.mode !== M.SCENE3D && (r = r.derivedCommands.color2D), r.modelMatrix = i, r.boundingVolume = n, r.cull = o, r.debugShowBoundingVolume = a, t.commandList.push(r);
  }

  return e(O.prototype, {
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
    debugShowShadowVolume: {
      get: function get() {
        return this._debugShowShadowVolume;
      }
    }
  }), O.initializeTerrainHeights = function () {
    return f.initialize();
  }, O.prototype.update = function (e) {
    if (C(this._primitive) || C(this.geometryInstances)) if (f.initialized) {
      var d = this,
          r = this._primitiveOptions;

      if (!C(this._primitive)) {
        for (var t = v(this.geometryInstances) ? this.geometryInstances : [this.geometryInstances], i = t.length, o = new Array(i), n = 0; n < i; ++n) {
          if (s = t[n].attributes, !C(s) || !C(s.color)) {
            this._hasPerInstanceColors = !1;
            break;
          }
        }

        for (n = 0; n < i; ++n) {
          var a = t[n],
              s = {},
              h = a.attributes;

          for (var c in h) {
            h.hasOwnProperty(c) && (s[c] = h[c]);
          }

          C(s.width) || (s.width = new u({
            componentDatatype: l.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            value: [a.geometry.width]
          })), a.geometry._scene3DOnly = e.scene3DOnly, _.setProjectionAndEllipsoid(a.geometry, e.mapProjection), o[n] = new m({
            geometry: a.geometry,
            attributes: s,
            id: a.id,
            pickPrimitive: d
          });
        }

        r.geometryInstances = o, r.appearance = this.appearance, r._createShaderProgramFunction = function (e, r, t) {
          !function (e, r, t) {
            var i = r.context,
                o = e._primitive,
                n = o._attributeLocations,
                a = o._batchTable.getVertexShaderCallback()(P),
                a = A._appendShowToShader(o, a);

            a = A._appendDistanceDisplayConditionToShader(o, a), a = A._modifyShaderPosition(e, a, r.scene3DOnly);

            var s = o._batchTable.getVertexShaderCallback()(b),
                s = A._appendShowToShader(o, s);

            s = A._appendDistanceDisplayConditionToShader(o, s), s = A._modifyShaderPosition(e, s, r.scene3DOnly);

            var d = o._batchTable.getVertexShaderCallback()(w),
                h = ["ENABLE_GL_POSITION_LOG_DEPTH_AT_HEIGHT", "GLOBE_MINIMUM_ALTITUDE " + r.mapProjection.ellipsoid.minimumRadius.toFixed(1)],
                c = "",
                l = "";

            C(t.material) ? (-1 !== (l = C(t.material) ? t.material.shaderSource : "").search(/varying\s+float\s+v_polylineAngle;/g) && h.push("ANGLE_VARYING"), -1 !== l.search(/varying\s+float\s+v_width;/g) && h.push("WIDTH_VARYING")) : c = "PER_INSTANCE_COLOR", h.push(c);
            var p = e.debugShowShadowVolume ? ["DEBUG_SHOW_VOLUME", c] : [c],
                m = new E({
              defines: h,
              sources: [a]
            }),
                u = new E({
              defines: p,
              sources: [l, d]
            });
            e._sp = T.replaceCache({
              context: i,
              shaderProgram: o._sp,
              vertexShaderSource: m,
              fragmentShaderSource: u,
              attributeLocations: n
            });

            var _,
                v = i.shaderCache.getDerivedShaderProgram(e._sp, "2dColor");

            C(v) || (_ = new E({
              defines: h.concat(["COLUMBUS_VIEW_2D"]),
              sources: [a]
            }), v = i.shaderCache.createDerivedShaderProgram(e._sp, "2dColor", {
              context: i,
              shaderProgram: e._sp2D,
              vertexShaderSource: _,
              fragmentShaderSource: u,
              attributeLocations: n
            })), e._sp2D = v;
            var S,
                g,
                y = i.shaderCache.getDerivedShaderProgram(e._sp, "MorphColor");
            C(y) || (S = new E({
              defines: h.concat(["MAX_TERRAIN_HEIGHT " + f._defaultMaxTerrainHeight.toFixed(1)]),
              sources: [s]
            }), d = o._batchTable.getVertexShaderCallback()(I), g = new E({
              defines: p,
              sources: [l, d]
            }), y = i.shaderCache.createDerivedShaderProgram(e._sp, "MorphColor", {
              context: i,
              shaderProgram: e._spMorph,
              vertexShaderSource: S,
              fragmentShaderSource: g,
              attributeLocations: n
            })), e._spMorph = y;
          }(d, r, t);
        }, r._createCommandsFunction = function (e, r, t, i, o, n, a) {
          !function (e, r, t, i, o) {
            var n = e._primitive,
                a = n._va.length;
            i.length = a, o.length = a;

            for (var s = r instanceof D ? {} : t._uniforms, d = n._batchTable.getUniformMapCallback()(s), h = 0; h < a; h++) {
              var c = n._va[h],
                  l = i[h];
              C(l) || (l = i[h] = new S({
                owner: e,
                primitiveType: n._primitiveType
              })), l.vertexArray = c, l.renderState = e._renderState, l.shaderProgram = e._sp, l.uniformMap = d, l.pass = g.TERRAIN_CLASSIFICATION, l.pickId = "czm_batchTable_pickColor(v_endPlaneNormalEcAndBatchId.w)";
              var p = S.shallowClone(l, l.derivedCommands.tileset);
              p.renderState = e._renderState3DTiles, p.pass = g.PGEARTH_3D_TILE_CLASSIFICATION, l.derivedCommands.tileset = p;
              var m = S.shallowClone(l, l.derivedCommands.color2D);
              m.shaderProgram = e._sp2D, l.derivedCommands.color2D = m;
              var u = S.shallowClone(p, p.derivedCommands.color2D);
              u.shaderProgram = e._sp2D, p.derivedCommands.color2D = u;

              var _ = S.shallowClone(l, l.derivedCommands.colorMorph);

              _.renderState = e._renderStateMorph, _.shaderProgram = e._spMorph, _.pickId = "czm_batchTable_pickColor(v_batchId)", l.derivedCommands.colorMorph = _;
            }
          }(d, r, t, n, a);
        }, r._updateAndQueueCommandsFunction = function (e, r, t, i, o, n, a, s) {
          !function (e, r, t, i, o, n) {
            var a,
                s = e._primitive;
            A._updateBoundingVolumes(s, r, i), r.mode === M.SCENE3D ? a = s._boundingSphereWC : r.mode === M.COLUMBUS_VIEW ? a = s._boundingSphereCV : r.mode === M.SCENE2D && C(s._boundingSphere2D) ? a = s._boundingSphere2D : C(s._boundingSphereMorph) && (a = s._boundingSphereMorph);
            var d = r.mode === M.MORPHING,
                h = e.classificationType,
                c = h !== y.PGEARTH_3D_TILE,
                l = h !== y.TERRAIN && !d,
                p = r.passes;
            if (p.render || p.pick && s.allowPicking) for (var m = t.length, u = 0; u < m; ++u) {
              var _ = a[u];
              c && V(0, t[u], r, i, o, _, n), l && V(0, t[u].derivedCommands.tileset, r, i, o, _, n);
            }
          }(d, r, t, o, n, a);
        }, this._primitive = new A(r), this._primitive.readyPromise.then(function (e) {
          d._ready = !0, d.releaseGeometryInstances && (d.geometryInstances = void 0);
          var r = e._error;
          C(r) ? d._readyPromise.reject(r) : d._readyPromise.resolve(d);
        });
      }

      if (this.appearance instanceof D && !this._hasPerInstanceColors) throw new p("All GeometryInstances must have color attributes to use PolylineColorAppearance with GroundPolylinePrimitive.");
      this._primitive.appearance = this.appearance, this._primitive.show = this.show, this._primitive.debugShowBoundingVolume = this.debugShowBoundingVolume, this._primitive.update(e);
    } else {
      if (!this.asynchronous) throw new p("For synchronous GroundPolylinePrimitives, you must call GroundPolylinePrimitives.initializeTerrainHeights() and wait for the returned promise to resolve.");
      O.initializeTerrainHeights();
    }
  }, O.prototype.getGeometryInstanceAttributes = function (e) {
    if (!C(this._primitive)) throw new p("must call update before calling getGeometryInstanceAttributes");
    return this._primitive.getGeometryInstanceAttributes(e);
  }, O.isSupported = function (e) {
    return e.frameState.context.depthTexture;
  }, O.prototype.isDestroyed = function () {
    return !1;
  }, O.prototype.destroy = function () {
    return this._primitive = this._primitive && this._primitive.destroy(), this._sp = this._sp && this._sp.destroy(), this._sp2D = void 0, this._spMorph = void 0, r(this);
  }, O;
});