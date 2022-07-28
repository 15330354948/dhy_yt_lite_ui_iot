"use strict";

define(["../Core/BoundingRectangle", "../Core/BoundingSphere", "../Core/BoxOutlineGeometry", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/clone", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/combine", "../Core/CullingVolume", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/FeatureDetection", "../Core/GeometryInstance", "../Core/Intersect", "../Core/Math", "../Core/Matrix4", "../Core/OrthographicOffCenterFrustum", "../Core/PerspectiveFrustum", "../Core/PixelFormat", "../Core/Quaternion", "../Core/SphereOutlineGeometry", "../Core/WebGLConstants", "../Renderer/ClearCommand", "../Renderer/ContextLimits", "../Renderer/CubeMap", "../Renderer/DrawCommand", "../Renderer/Framebuffer", "../Renderer/Pass", "../Renderer/PassState", "../Renderer/PixelDatatype", "../Renderer/Renderbuffer", "../Renderer/RenderbufferFormat", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "./Camera", "./CullFace", "./DebugCameraPrimitive", "./PerInstanceColorAppearance", "./Primitive", "./ShadowMapShader"], function (p, m, _, s, j, X, t, E, f, l, n, o, u, L, e, r, d, h, w, c, G, k, g, C, v, x, S, i, b, y, M, F, O, V, P, A, T, D, z, a, R, W, B, N, U, I, Y, q, H, K) {
  "use strict";

  function Q(e) {
    var t = (e = u(e, u.EMPTY_OBJECT)).context;
    if (!L(t)) throw new d("context is required.");
    if (!L(e.lightCamera)) throw new d("lightCamera is required.");
    if (L(e.numberOfCascades) && 1 !== e.numberOfCascades && 4 !== e.numberOfCascades) throw new d("Only one or four cascades are supported.");
    this._enabled = u(e.enabled, !0), this._softShadows = u(e.softShadows, !1), this._normalOffset = u(e.normalOffset, !0), this.dirty = !0, this.fromLightSource = u(e.fromLightSource, !0), this.darkness = u(e.darkness, .3), this._darkness = this.darkness, this.maximumDistance = u(e.maximumDistance, 5e3), this._outOfView = !1, this._outOfViewPrevious = !1;
    var r,
        a = this._needsUpdate = !0;
    (h.isInternetExplorer() || h.isEdge() || (h.isChrome() || h.isFirefox()) && h.isWindows() && !t.depthTexture) && (a = !1), this._polygonOffsetSupported = a, this._terrainBias = {
      polygonOffset: a,
      polygonOffsetFactor: 1.1,
      polygonOffsetUnits: 4,
      normalOffset: this._normalOffset,
      normalOffsetScale: .5,
      normalShading: !0,
      normalShadingSmooth: .3,
      depthBias: 1e-4
    }, this._primitiveBias = {
      polygonOffset: a,
      polygonOffsetFactor: 1.1,
      polygonOffsetUnits: 4,
      normalOffset: this._normalOffset,
      normalOffsetScale: .1,
      normalShading: !0,
      normalShadingSmooth: .05,
      depthBias: 2e-5
    }, this._pointBias = {
      polygonOffset: !1,
      polygonOffsetFactor: 1.1,
      polygonOffsetUnits: 4,
      normalOffset: this._normalOffset,
      normalOffsetScale: 0,
      normalShading: !0,
      normalShadingSmooth: .1,
      depthBias: 5e-4
    }, this._depthAttachment = void 0, this._colorAttachment = void 0, this._shadowMapMatrix = new k(), this._shadowMapTexture = void 0, this._lightDirectionEC = new j(), this._lightPositionEC = new X(), this._distance = 0, this._lightCamera = e.lightCamera, this._shadowMapCamera = new _e(), this._shadowMapCullingVolume = void 0, this._sceneCamera = void 0, this._boundingSphere = new m(), this._isPointLight = u(e.isPointLight, !1), this._pointLightRadius = u(e.pointLightRadius, 100), this._cascadesEnabled = !this._isPointLight && u(e.cascadesEnabled, !0), this._numberOfCascades = this._cascadesEnabled ? u(e.numberOfCascades, 4) : 0, this._fitNearFar = !0, this._maximumCascadeDistances = [25, 150, 700, Number.MAX_VALUE], this._textureSize = new s(), this._isSpotLight = !1, this._cascadesEnabled ? this._shadowMapCamera.frustum = new g() : L(this._lightCamera.frustum.fov) && (this._isSpotLight = !0), this._cascadeSplits = [new X(), new X()], this._cascadeMatrices = [new k(), new k(), new k(), new k()], this._cascadeDistances = new X(), r = this._isPointLight ? 6 : this._cascadesEnabled ? this._numberOfCascades : 1, this._passes = new Array(r);

    for (var i = 0; i < r; ++i) {
      this._passes[i] = new Z(t);
    }

    this.debugShow = !1, this.debugFreezeFrame = !1, this._debugFreezeFrame = !1, this._debugCascadeColors = !1, this._debugLightFrustum = void 0, this._debugCameraFrustum = void 0, this._debugCascadeFrustums = new Array(this._numberOfCascades), this._debugShadowViewCommand = void 0, this._usesDepthTexture = t.depthTexture, this._isPointLight && (this._usesDepthTexture = !1), this._primitiveRenderState = void 0, this._terrainRenderState = void 0, this._pointRenderState = void 0, $(this), this._clearCommand = new b({
      depth: 1,
      color: new f()
    }), this._clearPassState = new P(t), this._size = u(e.size, 2048), this.size = this._size;
  }

  function Z(e) {
    this.camera = new _e(), this.passState = new P(e), this.framebuffer = void 0, this.textureOffsets = void 0, this.commandList = [], this.cullingVolume = void 0;
  }

  function J(e, t) {
    return z.fromCache({
      cull: {
        enabled: !0,
        face: I.BACK
      },
      depthTest: {
        enabled: !0
      },
      colorMask: {
        red: e,
        green: e,
        blue: e,
        alpha: e
      },
      depthMask: !0,
      polygonOffset: {
        enabled: t.polygonOffset,
        factor: t.polygonOffsetFactor,
        units: t.polygonOffsetUnits
      }
    });
  }

  function $(e) {
    var t = !e._usesDepthTexture;
    e._primitiveRenderState = J(t, e._primitiveBias), e._terrainRenderState = J(t, e._terrainBias), e._pointRenderState = J(t, e._pointBias);
  }

  function ee(e) {
    for (var t = e._passes.length, r = 0; r < t; ++r) {
      var a = e._passes[r],
          i = a.framebuffer;
      L(i) && !i.isDestroyed() && i.destroy(), a.framebuffer = void 0;
    }

    e._depthAttachment = e._depthAttachment && e._depthAttachment.destroy(), e._colorAttachment = e._colorAttachment && e._colorAttachment.destroy();
  }

  function te() {
    return new a({
      wrapS: N.CLAMP_TO_EDGE,
      wrapT: N.CLAMP_TO_EDGE,
      minificationFilter: B.NEAREST,
      magnificationFilter: W.NEAREST
    });
  }

  function re(e, t) {
    (e._isPointLight ? function (e, t) {
      for (var r = new T({
        context: t,
        width: e._textureSize.x,
        height: e._textureSize.y,
        format: D.DEPTH_COMPONENT16
      }), a = new M({
        context: t,
        width: e._textureSize.x,
        height: e._textureSize.y,
        pixelFormat: v.RGBA,
        pixelDatatype: A.UNSIGNED_BYTE,
        sampler: te()
      }), i = [a.negativeX, a.negativeY, a.negativeZ, a.positiveX, a.positiveY, a.positiveZ], s = 0; s < 6; ++s) {
        var n = new O({
          context: t,
          depthRenderbuffer: r,
          colorTextures: [i[s]],
          destroyAttachments: !1
        }),
            o = e._passes[s];
        o.framebuffer = n, o.passState.framebuffer = n;
      }

      e._shadowMapTexture = a, e._depthAttachment = r, e._colorAttachment = a;
    } : e._usesDepthTexture ? function (e, t) {
      for (var r = new R({
        context: t,
        width: e._textureSize.x,
        height: e._textureSize.y,
        pixelFormat: v.DEPTH_STENCIL,
        pixelDatatype: A.UNSIGNED_INT_24_8,
        sampler: te()
      }), a = new O({
        context: t,
        depthStencilTexture: r,
        destroyAttachments: !1
      }), i = e._passes.length, s = 0; s < i; ++s) {
        var n = e._passes[s];
        n.framebuffer = a, n.passState.framebuffer = a;
      }

      e._shadowMapTexture = r, e._depthAttachment = r;
    } : function (e, t) {
      for (var r = new T({
        context: t,
        width: e._textureSize.x,
        height: e._textureSize.y,
        format: D.DEPTH_COMPONENT16
      }), a = new R({
        context: t,
        width: e._textureSize.x,
        height: e._textureSize.y,
        pixelFormat: v.RGBA,
        pixelDatatype: A.UNSIGNED_BYTE,
        sampler: te()
      }), i = new O({
        context: t,
        depthRenderbuffer: r,
        colorTextures: [a],
        destroyAttachments: !1
      }), s = e._passes.length, n = 0; n < s; ++n) {
        var o = e._passes[n];
        o.framebuffer = i, o.passState.framebuffer = i;
      }

      e._shadowMapTexture = a, e._depthAttachment = r, e._colorAttachment = a;
    })(e, t);
  }

  function ae(e, t) {
    var r, a;
    L(e._passes[0].framebuffer) && e._shadowMapTexture.width === e._textureSize.x || (ee(e), re(e, t), a = t, (r = e)._usesDepthTexture && r._passes[0].framebuffer.status !== i.FRAMEBUFFER_COMPLETE && (r._usesDepthTexture = !1, $(r), ee(r), re(r, a)), ie(e, t));
  }

  function ie(e, t, r) {
    r = u(r, 0), !e._isPointLight && 0 !== r || (e._clearCommand.framebuffer = e._passes[r].framebuffer, e._clearCommand.execute(t, e._clearPassState));
  }

  Q.MAXIMUM_DISTANCE = 2e4, Q.prototype.debugCreateRenderStates = function () {
    $(this);
  }, e(Q.prototype, {
    enabled: {
      get: function get() {
        return this._enabled;
      },
      set: function set(e) {
        this.dirty = this._enabled !== e, this._enabled = e;
      }
    },
    normalOffset: {
      get: function get() {
        return this._normalOffset;
      },
      set: function set(e) {
        this.dirty = this._normalOffset !== e, this._normalOffset = e, this._terrainBias.normalOffset = e, this._primitiveBias.normalOffset = e, this._pointBias.normalOffset = e;
      }
    },
    softShadows: {
      get: function get() {
        return this._softShadows;
      },
      set: function set(e) {
        this.dirty = this._softShadows !== e, this._softShadows = e;
      }
    },
    size: {
      get: function get() {
        return this._size;
      },
      set: function set(e) {
        !function (e, t) {
          e._size = t;
          var r = e._passes,
              a = r.length,
              i = e._textureSize;
          {
            var s;
            e._isPointLight ? (t = y.maximumCubeMapSize >= t ? t : y.maximumCubeMapSize, i.x = t, i.y = t, s = new p(0, 0, t, t), r[0].passState.viewport = s, r[1].passState.viewport = s, r[2].passState.viewport = s, r[3].passState.viewport = s, r[4].passState.viewport = s, r[5].passState.viewport = s) : 1 === a ? (t = y.maximumTextureSize >= t ? t : y.maximumTextureSize, i.x = t, i.y = t, r[0].passState.viewport = new p(0, 0, t, t)) : 4 === a && (t = y.maximumTextureSize >= 2 * t ? t : y.maximumTextureSize / 2, i.x = 2 * t, i.y = 2 * t, r[0].passState.viewport = new p(0, 0, t, t), r[1].passState.viewport = new p(t, 0, t, t), r[2].passState.viewport = new p(0, t, t, t), r[3].passState.viewport = new p(t, t, t, t));
          }
          e._clearPassState.viewport = new p(0, 0, i.x, i.y);

          for (var n = 0; n < a; ++n) {
            var o = r[n],
                u = o.passState.viewport,
                d = u.x / i.x,
                h = u.y / i.y,
                m = u.width / i.x,
                c = u.height / i.y;
            o.textureOffsets = new k(m, 0, 0, d, 0, c, 0, h, 0, 0, 1, 0, 0, 0, 0, 1);
          }
        }(this, e);
      }
    },
    outOfView: {
      get: function get() {
        return this._outOfView;
      }
    },
    shadowMapCullingVolume: {
      get: function get() {
        return this._shadowMapCullingVolume;
      }
    },
    passes: {
      get: function get() {
        return this._passes;
      }
    },
    isPointLight: {
      get: function get() {
        return this._isPointLight;
      }
    },
    debugCascadeColors: {
      get: function get() {
        return this._debugCascadeColors;
      },
      set: function set(e) {
        this.dirty = this._debugCascadeColors !== e, this._debugCascadeColors = e;
      }
    }
  });
  var se = new p();

  function ne(e, t) {
    var r = t.context,
        a = t.context.drawingBufferWidth,
        i = t.context.drawingBufferHeight,
        s = .3 * Math.min(a, i),
        n = se;
    n.x = a - s, n.y = 0, n.width = s, n.height = s;
    var o,
        u,
        d,
        h,
        m = e._debugShadowViewCommand;
    L(m) || (u = r, d = (o = e)._isPointLight ? "uniform samplerCube shadowMap_textureCube; \nvarying vec2 v_textureCoordinates; \nvoid main() \n{ \n    vec2 uv = v_textureCoordinates; \n    vec3 dir; \n \n    if (uv.y < 0.5) \n    { \n        if (uv.x < 0.333) \n        { \n            dir.x = -1.0; \n            dir.y = uv.x * 6.0 - 1.0; \n            dir.z = uv.y * 4.0 - 1.0; \n        } \n        else if (uv.x < 0.666) \n        { \n            dir.y = -1.0; \n            dir.x = uv.x * 6.0 - 3.0; \n            dir.z = uv.y * 4.0 - 1.0; \n        } \n        else \n        { \n            dir.z = -1.0; \n            dir.x = uv.x * 6.0 - 5.0; \n            dir.y = uv.y * 4.0 - 1.0; \n        } \n    } \n    else \n    { \n        if (uv.x < 0.333) \n        { \n            dir.x = 1.0; \n            dir.y = uv.x * 6.0 - 1.0; \n            dir.z = uv.y * 4.0 - 3.0; \n        } \n        else if (uv.x < 0.666) \n        { \n            dir.y = 1.0; \n            dir.x = uv.x * 6.0 - 3.0; \n            dir.z = uv.y * 4.0 - 3.0; \n        } \n        else \n        { \n            dir.z = 1.0; \n            dir.x = uv.x * 6.0 - 5.0; \n            dir.y = uv.y * 4.0 - 3.0; \n        } \n    } \n \n    float shadow = czm_unpackDepth(textureCube(shadowMap_textureCube, dir)); \n    gl_FragColor = vec4(vec3(shadow), 1.0); \n} \n" : "uniform sampler2D shadowMap_texture; \nvarying vec2 v_textureCoordinates; \nvoid main() \n{ \n" + (o._usesDepthTexture ? "    float shadow = texture2D(shadowMap_texture, v_textureCoordinates).r; \n" : "    float shadow = czm_unpackDepth(texture2D(shadowMap_texture, v_textureCoordinates)); \n") + "    gl_FragColor = vec4(vec3(shadow), 1.0); \n} \n", (h = u.createViewportQuadCommand(d, {
      uniformMap: {
        shadowMap_texture: function shadowMap_texture() {
          return o._shadowMapTexture;
        },
        shadowMap_textureCube: function shadowMap_textureCube() {
          return o._shadowMapTexture;
        }
      }
    })).pass = V.OVERLAY, m = h, e._debugShadowViewCommand = m), L(m.renderState) && p.equals(m.renderState.viewport, n) || (m.renderState = z.fromCache({
      viewport: p.clone(n)
    })), t.commandList.push(e._debugShadowViewCommand);
  }

  var oe = new Array(8);
  oe[0] = new X(-1, -1, -1, 1), oe[1] = new X(1, -1, -1, 1), oe[2] = new X(1, 1, -1, 1), oe[3] = new X(-1, 1, -1, 1), oe[4] = new X(-1, -1, 1, 1), oe[5] = new X(1, -1, 1, 1), oe[6] = new X(1, 1, 1, 1), oe[7] = new X(-1, 1, 1, 1);

  for (var ue = new k(), de = new Array(8), he = 0; he < 8; ++he) {
    de[he] = new X();
  }

  var me = [f.RED, f.GREEN, f.BLUE, f.MAGENTA],
      ce = new j();

  function pe(e, t) {
    ne(e, t);
    var r,
        a,
        i,
        s,
        n,
        o,
        u,
        d,
        h,
        m = e.debugFreezeFrame && !e._debugFreezeFrame;

    if (e._debugFreezeFrame = e.debugFreezeFrame, e.debugFreezeFrame && (m && (e._debugCameraFrustum = e._debugCameraFrustum && e._debugCameraFrustum.destroy(), e._debugCameraFrustum = new Y({
      camera: e._sceneCamera,
      color: f.CYAN,
      updateOnChange: !1
    })), e._debugCameraFrustum.update(t)), e._cascadesEnabled) {
      if (e.debugFreezeFrame) {
        m && (e._debugLightFrustum = e._debugLightFrustum && e._debugLightFrustum.destroy(), e._debugLightFrustum = new Y({
          camera: e._shadowMapCamera,
          color: f.YELLOW,
          updateOnChange: !1
        })), e._debugLightFrustum.update(t);

        for (var c = 0; c < e._numberOfCascades; ++c) {
          m && (e._debugCascadeFrustums[c] = e._debugCascadeFrustums[c] && e._debugCascadeFrustums[c].destroy(), e._debugCascadeFrustums[c] = new Y({
            camera: e._passes[c].camera,
            color: me[c],
            updateOnChange: !1
          })), e._debugCascadeFrustums[c].update(t);
        }
      }
    } else e._isPointLight ? L(e._debugLightFrustum) && !e._needsUpdate || (r = e._shadowMapCamera.positionWC, a = x.IDENTITY, i = 2 * e._pointLightRadius, s = j.fromElements(i, i, i, ce), n = k.fromTranslationQuaternionRotationScale(r, a, s, ue), e._debugLightFrustum = e._debugLightFrustum && e._debugLightFrustum.destroy(), e._debugLightFrustum = (o = n, u = f.YELLOW, d = new w({
      geometry: new _({
        minimum: new j(-.5, -.5, -.5),
        maximum: new j(.5, .5, .5)
      }),
      attributes: {
        color: l.fromColor(u)
      }
    }), h = new w({
      geometry: new S({
        radius: .5
      }),
      attributes: {
        color: l.fromColor(u)
      }
    }), new H({
      geometryInstances: [d, h],
      appearance: new q({
        translucent: !1,
        flat: !0
      }),
      asynchronous: !1,
      modelMatrix: o
    }))) : L(e._debugLightFrustum) && !e._needsUpdate || (e._debugLightFrustum = new Y({
      camera: e._shadowMapCamera,
      color: f.YELLOW,
      updateOnChange: !1
    })), e._debugLightFrustum.update(t);
  }

  function _e() {
    this.viewMatrix = new k(), this.inverseViewMatrix = new k(), this.frustum = void 0, this.positionCartographic = new t(), this.positionWC = new j(), this.directionWC = j.clone(j.UNIT_Z), this.upWC = j.clone(j.UNIT_Y), this.rightWC = j.clone(j.UNIT_X), this.viewProjectionMatrix = new k();
  }

  _e.prototype.clone = function (e) {
    k.clone(e.viewMatrix, this.viewMatrix), k.clone(e.inverseViewMatrix, this.inverseViewMatrix), this.frustum = e.frustum.clone(this.frustum), t.clone(e.positionCartographic, this.positionCartographic), j.clone(e.positionWC, this.positionWC), j.clone(e.directionWC, this.directionWC), j.clone(e.upWC, this.upWC), j.clone(e.rightWC, this.rightWC);
  };

  var fe = new k(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1);

  _e.prototype.getViewProjection = function () {
    var e = this.viewMatrix,
        t = this.frustum.projectionMatrix;
    return k.multiply(t, e, this.viewProjectionMatrix), k.multiply(fe, this.viewProjectionMatrix, this.viewProjectionMatrix), this.viewProjectionMatrix;
  };

  var le = new Array(5),
      we = new C(),
      ge = new Array(4),
      Ce = new j(),
      ve = new j();
  var xe = new k(),
      Se = new j(),
      be = new j(),
      ye = new j();
  var Me = [new j(-1, 0, 0), new j(0, -1, 0), new j(0, 0, -1), new j(1, 0, 0), new j(0, 1, 0), new j(0, 0, 1)],
      Oe = [new j(0, -1, 0), new j(0, 0, -1), new j(0, -1, 0), new j(0, -1, 0), new j(0, 0, 1), new j(0, -1, 0)],
      Pe = [new j(0, 0, 1), new j(1, 0, 0), new j(-1, 0, 0), new j(0, 0, -1), new j(1, 0, 0), new j(1, 0, 0)];
  var Ee = new j(),
      Le = new j(),
      Fe = new m(),
      Ve = Fe.center;

  function Ae(e, t) {
    var r = t.camera,
        a = e._lightCamera,
        i = e._sceneCamera,
        s = e._shadowMapCamera;
    e._cascadesEnabled ? j.clone(a.directionWC, s.directionWC) : e._isPointLight ? j.clone(a.positionWC, s.positionWC) : s.clone(a);
    var n,
        o,
        u = e._lightDirectionEC;
    k.multiplyByPointAsVector(r.viewMatrix, s.directionWC, u), j.normalize(u, u), j.negate(u, u), k.multiplyByPoint(r.viewMatrix, s.positionWC, e._lightPositionEC), e._lightPositionEC.w = e._pointLightRadius, o = e._fitNearFar ? (n = Math.min(t.shadowState.nearPlane, e.maximumDistance), Math.min(t.shadowState.farPlane, e.maximumDistance + 1)) : (n = r.frustum.near, e.maximumDistance), e._sceneCamera = U.clone(r, i), r.frustum.clone(e._sceneCamera.frustum), e._sceneCamera.frustum.near = n, e._sceneCamera.frustum.far = o, e._distance = o - n, function (e, t) {
      var r,
          a,
          i = e._sceneCamera,
          s = e._shadowMapCamera,
          n = Fe;

      if (e._cascadesEnabled) {
        if (i.frustum.near >= e.maximumDistance) return e._outOfView = !0, e._needsUpdate = !1;
        var o = t.mapProjection.ellipsoid.geodeticSurfaceNormal(i.positionWC, Ee),
            u = j.negate(s.directionWC, Le),
            d = j.dot(o, u),
            h = G.clamp(d / .1, 0, 1);
        if (e._darkness = G.lerp(1, e.darkness, h), d < 0) return e._outOfView = !0, e._needsUpdate = !1;
        e._needsUpdate = !0, e._outOfView = !1;
      } else {
        e._isPointLight ? (n.center = s.positionWC, n.radius = e._pointLightRadius) : (r = s.frustum.far / 2, a = j.add(s.positionWC, j.multiplyByScalar(s.directionWC, r, Ve), Ve), n.center = a, n.radius = r), e._outOfView = t.cullingVolume.computeVisibility(n) === c.OUTSIDE, e._needsUpdate = !e._outOfView && !e._boundingSphere.equals(n), m.clone(n, e._boundingSphere);
      }
    }(e, t), !e._outOfViewPrevious && e._outOfView && (e._needsUpdate = !0), e._outOfViewPrevious = e._outOfView;
  }

  Q.prototype.update = function (e) {
    var t, r, a, i, s;
    Ae(this, e), this._needsUpdate && (ae(this, e.context), this._isPointLight && function (e, t) {
      var r = new C();
      r.fov = G.PI_OVER_TWO, r.near = 1, r.far = e._pointLightRadius, r.aspectRatio = 1;

      for (var a = 0; a < 6; ++a) {
        var i = e._passes[a].camera;
        i.positionWC = e._shadowMapCamera.positionWC, i.positionCartographic = t.mapProjection.ellipsoid.cartesianToCartographic(i.positionWC, i.positionCartographic), i.directionWC = Me[a], i.upWC = Oe[a], i.rightWC = Pe[a], k.computeView(i.positionWC, i.directionWC, i.upWC, i.rightWC, i.viewMatrix), k.inverse(i.viewMatrix, i.inverseViewMatrix), i.frustum = r;
      }
    }(this, e), this._cascadesEnabled && (function (e, t) {
      var r = e._shadowMapCamera,
          a = e._sceneCamera,
          i = k.multiply(a.frustum.projectionMatrix, a.viewMatrix, ue),
          s = k.inverse(i, ue),
          n = r.directionWC,
          o = a.directionWC,
          u = j.cross(n, o, Se),
          o = j.cross(u, n, be);
      j.normalize(o, o), j.normalize(u, u);

      for (var d = j.fromElements(0, 0, 0, ye), h = k.computeView(d, n, o, u, xe), m = k.multiply(h, s, ue), c = j.fromElements(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Ce), p = j.fromElements(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE, ve), _ = 0; _ < 8; ++_) {
        var f = X.clone(oe[_], de[_]);
        k.multiplyByVector(m, f, f), j.divideByScalar(f, f.w, f), j.minimumByComponent(f, c, c), j.maximumByComponent(f, p, p);
      }

      p.z += 1e3, c.z -= 10;
      var l = ye;
      l.x = -.5 * (c.x + p.x), l.y = -.5 * (c.y + p.y), l.z = -p.z;
      var w = k.fromTranslation(l, ue),
          h = k.multiply(w, h, h),
          g = .5 * (p.x - c.x),
          C = .5 * (p.y - c.y),
          v = p.z - c.z,
          x = r.frustum;
      x.left = -g, x.right = g, x.bottom = -C, x.top = C, x.near = .01, x.far = v, k.clone(h, r.viewMatrix), k.inverse(h, r.inverseViewMatrix), k.getTranslation(r.inverseViewMatrix, r.positionWC), t.mapProjection.ellipsoid.cartesianToCartographic(r.positionWC, r.positionCartographic), j.clone(n, r.directionWC), j.clone(o, r.upWC), j.clone(u, r.rightWC);
    }(this, e), 1 < this._numberOfCascades && function (e, t) {
      var r = e._shadowMapCamera,
          a = e._sceneCamera,
          i = a.frustum.near,
          s = a.frustum.far,
          n = e._numberOfCascades,
          o = s - i,
          u = s / i,
          d = .9,
          h = !1;
      t.shadowState.closestObjectSize < 200 && (h = !0, d = .9);
      var m = ge,
          c = le;

      for (c[0] = i, c[n] = s, g = 0; g < n; ++g) {
        var p = (g + 1) / n,
            _ = i * Math.pow(u, p),
            f = i + o * p,
            l = G.lerp(f, _, d);

        c[g + 1] = l, m[g] = l - c[g];
      }

      if (h) {
        for (g = 0; g < n; ++g) {
          m[g] = Math.min(m[g], e._maximumCascadeDistances[g]);
        }

        for (var w = c[0], g = 0; g < n - 1; ++g) {
          w += m[g], c[g + 1] = w;
        }
      }

      X.unpack(c, 0, e._cascadeSplits[0]), X.unpack(c, 1, e._cascadeSplits[1]), X.unpack(m, 0, e._cascadeDistances);
      var C = r.frustum,
          v = C.left,
          x = C.right,
          S = C.bottom,
          b = C.top,
          y = C.near,
          M = C.far,
          O = r.positionWC,
          P = r.directionWC,
          E = r.upWC,
          L = a.frustum.clone(we),
          F = r.getViewProjection();

      for (g = 0; g < n; ++g) {
        L.near = c[g], L.far = c[g + 1];

        for (var V = k.multiply(L.projectionMatrix, a.viewMatrix, ue), A = k.inverse(V, ue), T = k.multiply(F, A, ue), D = j.fromElements(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Ce), z = j.fromElements(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE, ve), R = 0; R < 8; ++R) {
          var W = X.clone(oe[R], de[R]);
          k.multiplyByVector(T, W, W), j.divideByScalar(W, W.w, W), j.minimumByComponent(W, D, D), j.maximumByComponent(W, z, z);
        }

        D.x = Math.max(D.x, 0), D.y = Math.max(D.y, 0), D.z = 0, z.x = Math.min(z.x, 1), z.y = Math.min(z.y, 1), z.z = Math.min(z.z, 1);
        var B = e._passes[g],
            N = B.camera;
        N.clone(r);
        var U = N.frustum;
        U.left = v + D.x * (x - v), U.right = v + z.x * (x - v), U.bottom = S + D.y * (b - S), U.top = S + z.y * (b - S), U.near = y + D.z * (M - y), U.far = y + z.z * (M - y), B.cullingVolume = N.frustum.computeCullingVolume(O, P, E);
        var I = e._cascadeMatrices[g];
        k.multiply(N.getViewProjection(), a.inverseViewMatrix, I), k.multiply(B.textureOffsets, I, I);
      }
    }(this, e)), this._isPointLight ? this._shadowMapCullingVolume = o.fromBoundingSphere(this._boundingSphere) : (r = (t = this._shadowMapCamera).positionWC, a = t.directionWC, i = t.upWC, this._shadowMapCullingVolume = t.frustum.computeCullingVolume(r, a, i), 1 === this._passes.length && this._passes[0].camera.clone(t))), 1 === this._passes.length && (s = this._sceneCamera.inverseViewMatrix, k.multiply(this._shadowMapCamera.getViewProjection(), s, this._shadowMapMatrix)), this.debugShow && pe(this, e);
  }, Q.prototype.updatePass = function (e, t) {
    ie(this, e, t);
  };
  var Te = new s();

  function De(t, e, r) {
    var a = t._isPointLight ? t._pointBias : r ? t._terrainBias : t._primitiveBias,
        i = {
      shadowMap_texture: function shadowMap_texture() {
        return t._shadowMapTexture;
      },
      shadowMap_textureCube: function shadowMap_textureCube() {
        return t._shadowMapTexture;
      },
      shadowMap_matrix: function shadowMap_matrix() {
        return t._shadowMapMatrix;
      },
      shadowMap_cascadeSplits: function shadowMap_cascadeSplits() {
        return t._cascadeSplits;
      },
      shadowMap_cascadeMatrices: function shadowMap_cascadeMatrices() {
        return t._cascadeMatrices;
      },
      shadowMap_lightDirectionEC: function shadowMap_lightDirectionEC() {
        return t._lightDirectionEC;
      },
      shadowMap_lightPositionEC: function shadowMap_lightPositionEC() {
        return t._lightPositionEC;
      },
      shadowMap_cascadeDistances: function shadowMap_cascadeDistances() {
        return t._cascadeDistances;
      },
      shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: function shadowMap_texelSizeDepthBiasAndNormalShadingSmooth() {
        var e = Te;
        return e.x = 1 / t._textureSize.x, e.y = 1 / t._textureSize.y, X.fromElements(e.x, e.y, a.depthBias, a.normalShadingSmooth, this.combinedUniforms1);
      },
      shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: function shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness() {
        return X.fromElements(a.normalOffsetScale, t._distance, t.maximumDistance, t._darkness, this.combinedUniforms2);
      },
      combinedUniforms1: new X(),
      combinedUniforms2: new X()
    };
    return n(e, i, !1);
  }

  return Q.createReceiveDerivedCommand = function (e, t, r, a, i) {
    L(i) || (i = {});
    var s,
        n,
        o,
        u,
        d,
        h,
        m,
        c = 0 < e.length,
        p = t.shaderProgram,
        _ = p.vertexShaderSource,
        f = p.fragmentShaderSource,
        l = t.pass === V.GLOBE,
        w = !1;
    return l && (w = t.owner.data.renderedMesh.encoding.hasVertexNormals), t.receiveShadows && c && (L(i.receiveCommand) && (m = i.receiveCommand.shaderProgram, s = i.receiveCommand.uniformMap), i.receiveCommand = F.shallowClone(t, i.receiveCommand), i.castShadows = !1, i.receiveShadows = !0, n = i.receiveShaderCastShadows !== t.castShadows, o = i.receiveShaderProgramId !== t.shaderProgram.id, (!L(m) || o || r || n) && (u = K.getShadowReceiveShaderKeyword(e[0], t.castShadows, l, w), m = a.shaderCache.getDerivedShaderProgram(p, u), L(m) || (d = K.createShadowReceiveVertexShader(_, l, w), h = K.createShadowReceiveFragmentShader(f, e[0], t.castShadows, l, w), m = a.shaderCache.createDerivedShaderProgram(p, u, {
      vertexShaderSource: d,
      fragmentShaderSource: h,
      attributeLocations: p._attributeLocations
    })), s = De(e[0], t.uniformMap, l)), i.receiveCommand.shaderProgram = m, i.receiveCommand.uniformMap = s, i.receiveShaderProgramId = t.shaderProgram.id, i.receiveShaderCastShadows = t.castShadows), i;
  }, Q.createCastDerivedCommand = function (e, t, r, a, i) {
    if (L(i) || (i = {}), t.castShadows) {
      var s = i.castCommands;
      L(s) || (s = i.castCommands = []);
      var n = i.castShaderProgramId,
          o = e.length;
      s.length = o;

      for (var u = 0; u < o; ++u) {
        s[u] = (d = e[u], h = r, m = t, c = a, p = n, _ = s[u], P = O = M = y = b = S = x = v = C = g = w = l = f = void 0, L(_) && (P = _.shaderProgram, f = _.renderState, l = _.uniformMap), (_ = F.shallowClone(m, _)).castShadows = !0, _.receiveShadows = !1, L(P) && p === m.shaderProgram.id && !h || (w = m.shaderProgram, g = m.pass === V.GLOBE, C = m.pass !== V.TRANSLUCENT, v = d._isPointLight, x = d._usesDepthTexture, S = K.getShadowCastShaderKeyword(v, g, x, C), P = c.shaderCache.getDerivedShaderProgram(w, S), L(P) || (b = w.vertexShaderSource, y = w.fragmentShaderSource, M = K.createShadowCastVertexShader(b, v, g), O = K.createShadowCastFragmentShader(y, v, x, C), P = c.shaderCache.createDerivedShaderProgram(w, S, {
          vertexShaderSource: M,
          fragmentShaderSource: O,
          attributeLocations: w._attributeLocations
        })), f = d._primitiveRenderState, v ? f = d._pointRenderState : g && (f = d._terrainRenderState), m.renderState.cull.enabled || ((f = E(f, !1)).cull = E(f.cull, !1), f.cull.enabled = !1, f = z.fromCache(f)), l = De(d, m.uniformMap, g)), _.shaderProgram = P, _.renderState = f, _.uniformMap = l, _);
      }

      i.castShaderProgramId = t.shaderProgram.id;
    }

    var d, h, m, c, p, _, f, l, w, g, C, v, x, S, b, y, M, O, P;

    return i;
  }, Q.prototype.isDestroyed = function () {
    return !1;
  }, Q.prototype.destroy = function () {
    ee(this), this._debugLightFrustum = this._debugLightFrustum && this._debugLightFrustum.destroy(), this._debugCameraFrustum = this._debugCameraFrustum && this._debugCameraFrustum.destroy(), this._debugShadowViewCommand = this._debugShadowViewCommand && this._debugShadowViewCommand.shaderProgram && this._debugShadowViewCommand.shaderProgram.destroy();

    for (var e = 0; e < this._numberOfCascades; ++e) {
      this._debugCascadeFrustums[e] = this._debugCascadeFrustums[e] && this._debugCascadeFrustums[e].destroy();
    }

    return r(this);
  }, Q;
});