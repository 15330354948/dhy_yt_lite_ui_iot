"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/Check", "../Core/clone", "../Core/Color", "../Core/combine", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/FeatureDetection", "../Core/getAbsoluteUri", "../Core/getMagic", "../Core/getStringFromTypedArray", "../Core/IndexDatatype", "../Core/isArray", "../Core/loadCRN", "../Core/loadImageFromTypedArray", "../Core/loadKTX", "../Core/Math", "../Core/Matrix3", "../Core/Matrix4", "../Core/PixelFormat", "../Core/PrimitiveType", "../Core/Quaternion", "../Core/Resource", "../Core/Transforms", "../Core/WebGLConstants", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/Texture", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../Renderer/VertexArray", "../ThirdParty/GltfPipeline/addDefaults", "../ThirdParty/GltfPipeline/addPipelineExtras", "../ThirdParty/GltfPipeline/ForEach", "../ThirdParty/GltfPipeline/getAccessorByteStride", "../ThirdParty/GltfPipeline/hasExtension", "../ThirdParty/GltfPipeline/numberOfComponentsForType", "../ThirdParty/GltfPipeline/parseGlb", "../ThirdParty/GltfPipeline/removePipelineExtras", "../ThirdParty/GltfPipeline/updateVersion", "../ThirdParty/when", "./Axis", "./BlendingState", "./ClippingPlaneCollection", "./ColorBlendMode", "./DracoLoader", "./getClipAndStyleCode", "./getClippingFunction", "./HeightReference", "./JobType", "./ModelAnimationCache", "./ModelAnimationCollection", "./ModelLoadResources", "./ModelMaterial", "./ModelMesh", "./ModelNode", "./ModelUtility", "./OctahedralProjectedCubeMap", "./processModelMaterialsCommon", "./processPbrMaterials", "./SceneMode", "./ShadowMode"], function (He, o, ze, ke, Ge, a, Ke, Q, $, u, We, je, e, n, Ze, t, Je, c, l, p, ee, r, Ye, s, Xe, Qe, d, $e, R, et, B, h, tt, rt, m, f, te, re, T, I, A, P, b, M, w, v, it, nt, at, x, ot, y, _, i, st, g, ut, L, S, ie, ct, C, E, lt, N, D, O, dt, ht, mt, ft, pt, _t, gt, vt, xt, yt) {
  "use strict";

  if (!Je.supportsTypedArrays()) return {};
  var q = new ze(),
      St = pt.ModelState,
      F = Qe.EPSILON16;

  function U(e, t) {
    e._cachedGltf = t;
  }

  function V(e) {
    this._gltf = e.gltf, this.ready = e.ready, this.modelsToLoad = [], this.count = 0;
  }

  e(V.prototype, {
    gltf: {
      set: function set(e) {
        this._gltf = e;
      },
      get: function get() {
        return this._gltf;
      }
    }
  }), V.prototype.makeReady = function (e) {
    this.gltf = e;

    for (var t = this.modelsToLoad, r = t.length, i = 0; i < r; ++i) {
      var n = t[i];
      n.isDestroyed() || U(n, this);
    }

    this.modelsToLoad = void 0, this.ready = !0;
  };
  var H = {},
      z = {};

  function k(e) {
    var t,
        r,
        i = (e = We(e, We.EMPTY_OBJECT)).cacheKey;
    this._cacheKey = i, this._cachedGltf = void 0, this._releaseGltfJson = We(e.releaseGltfJson, !1), je(i) && je(H[i]) && H[i].ready ? ++(r = H[i]).count : (t = e.gltf, je(t) && (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (r = t instanceof Uint8Array ? new V({
      gltf: _(t),
      ready: !0
    }) : new V({
      gltf: e.gltf,
      ready: !0
    })).count = 1, je(i) && (H[i] = r))), U(this, r);
    var n = We(e.basePath, "");
    this._resource = h.createIfNeeded(n), this.show = We(e.show, !0), this.silhouetteColor = We(e.silhouetteColor, Q.RED), this._silhouetteColor = new Q(), this._silhouetteColorPreviousAlpha = 1, this._normalAttributeName = void 0, this.silhouetteSize = We(e.silhouetteSize, 0), this.modelMatrix = $e.clone(We(e.modelMatrix, $e.IDENTITY)), this._modelMatrix = $e.clone(this.modelMatrix), this._clampedModelMatrix = void 0, this.scale = We(e.scale, 1), this._scale = this.scale, this.minimumPixelSize = We(e.minimumPixelSize, 0), this._minimumPixelSize = this.minimumPixelSize, this.maximumScale = e.maximumScale, this._maximumScale = this.maximumScale, this.id = e.id, this._id = e.id, this.heightReference = We(e.heightReference, lt.NONE), this._heightReference = this.heightReference, this._heightChanged = !1, this._removeUpdateHeightCallback = void 0;
    var a = e.scene;
    this._scene = a, je(a) && je(a.terrainProviderChanged) && (this._terrainProviderChangedCallback = a.terrainProviderChanged.addEventListener(function () {
      this._heightChanged = !0;
    }, this)), this._pickObject = e.pickObject, this._allowPicking = We(e.allowPicking, !0), this._ready = !1, this._readyPromise = g.defer(), this.activeAnimations = new O(this), this.clampAnimations = We(e.clampAnimations, !0), this._defaultTexture = void 0, this._incrementallyLoadTextures = We(e.incrementallyLoadTextures, !0), this._asynchronous = We(e.asynchronous, !0), this.shadows = We(e.shadows, yt.ENABLED), this._shadows = this.shadows, this.color = We(e.color, Q.WHITE), this._color = new Q(), this._colorPreviousAlpha = 1, this.colorBlendMode = We(e.colorBlendMode, ie.HIGHLIGHT), this.colorBlendAmount = We(e.colorBlendAmount, .5), this._colorShadingEnabled = !1, this._clippingPlanes = void 0, this.clippingPlanes = e.clippingPlanes, this._clippingPlanesState = 0, this.clippingPlanesOriginMatrix = void 0, this.debugShowBoundingVolume = We(e.debugShowBoundingVolume, !1), this._debugShowBoundingVolume = !1, this.debugWireframe = We(e.debugWireframe, !1), this._debugWireframe = !1, this._distanceDisplayCondition = e.distanceDisplayCondition, this._addBatchIdToGeneratedShaders = e.addBatchIdToGeneratedShaders, this._precreatedAttributes = e.precreatedAttributes, this._vertexShaderLoaded = e.vertexShaderLoaded, this._fragmentShaderLoaded = e.fragmentShaderLoaded, this._uniformMapLoaded = e.uniformMapLoaded, this._pickIdLoaded = e.pickIdLoaded, this._ignoreCommands = We(e.ignoreCommands, !1), this._requestType = e.requestType, this._upAxis = We(e.upAxis, ut.Y), this._gltfForwardAxis = ut.Z, this._forwardAxis = e.forwardAxis, this.cull = We(e.cull, !0), this.opaquePass = We(e.opaquePass, re.OPAQUE), this._computedModelMatrix = new $e(), this._clippingPlaneModelViewMatrix = $e.clone($e.IDENTITY), this._initialRadius = void 0, this._boundingSphere = void 0, this._scaledBoundingSphere = new He(), this._state = St.NEEDS_LOAD, this._loadResources = void 0, this._mode = void 0, this._perNodeShowDirty = !1, this._pgEarthAnimationsDirty = !1, this._dirty = !1, this._maxDirtyNumber = 0, this._runtime = {
      animations: void 0,
      articulationsByName: void 0,
      articulationsByStageKey: void 0,
      stagesByKey: void 0,
      rootNodes: void 0,
      nodes: void 0,
      nodesByName: void 0,
      skinnedNodes: void 0,
      meshesByName: void 0,
      materialsByName: void 0,
      materialsById: void 0
    }, this._uniformMaps = {}, this._extensionsUsed = void 0, this._extensionsRequired = void 0, this._quantizedUniforms = {}, this._programPrimitives = {}, this._rendererResources = {
      buffers: {},
      vertexArrays: {},
      programs: {},
      sourceShaders: {},
      silhouettePrograms: {},
      textures: {},
      samplers: {},
      renderStates: {}
    }, this._cachedRendererResources = void 0, this._loadRendererResourcesFromCache = !1, this._dequantizeInShader = We(e.dequantizeInShader, !0), this._decodedData = {}, this._cachedGeometryByteLength = 0, this._cachedTexturesByteLength = 0, this._geometryByteLength = 0, this._texturesByteLength = 0, this._trianglesLength = 0, this._sourceTechniques = {}, this._sourcePrograms = {}, this._quantizedVertexShaders = {}, this._nodeCommands = [], this._pickIds = [], this._rtcCenter = void 0, this._rtcCenterEye = void 0, this._rtcCenter3D = void 0, this._rtcCenter2D = void 0, this._sourceVersion = void 0, this._sourceKHRTechniquesWebGL = void 0, this._imageBasedLightingFactor = new o(1, 1), o.clone(e.imageBasedLightingFactor, this._imageBasedLightingFactor), this._lightColor = ze.clone(e.lightColor), this._luminanceAtZenith = void 0, this.luminanceAtZenith = We(e.luminanceAtZenith, .5), this._sphericalHarmonicCoefficients = e.sphericalHarmonicCoefficients, this._specularEnvironmentMaps = e.specularEnvironmentMaps, this._shouldUpdateSpecularMapAtlas = !0, this._specularEnvironmentMapAtlas = void 0, this._useDefaultSphericalHarmonics = !1, this._useDefaultSpecularMaps = !1, this._shouldRegenerateShaders = !1;
  }

  function G(e) {
    return e.stencilBuffer;
  }

  function Ct(e) {
    return !Q.equals(e.color, Q.WHITE) || e.colorBlendMode !== ie.HIGHLIGHT;
  }

  function Rt(e) {
    var t = e._clippingPlanes;
    return je(t) && t.enabled && 0 !== t.length;
  }

  function K(e, t, r) {
    if (e._state !== St.LOADED) throw new Ze("The model is not loaded.  Use Model.readyPromise or wait for Model.ready to be true.");
    if (!je(r)) throw new Ze("name is required.");
    return e._runtime[t][r];
  }

  e(k.prototype, {
    gltf: {
      get: function get() {
        return je(this._cachedGltf) ? this._cachedGltf.gltf : void 0;
      }
    },
    releaseGltfJson: {
      get: function get() {
        return this._releaseGltfJson;
      }
    },
    cacheKey: {
      get: function get() {
        return this._cacheKey;
      }
    },
    basePath: {
      get: function get() {
        return this._resource.url;
      }
    },
    boundingSphere: {
      get: function get() {
        if (this._state !== St.LOADED) throw new Ze("The model is not loaded.  Use Model.readyPromise or wait for Model.ready to be true.");
        var e = this.modelMatrix;
        this.heightReference !== lt.NONE && this._clampedModelMatrix && (e = this._clampedModelMatrix);
        var t = $e.getScale(e, q),
            r = je(this.maximumScale) ? Math.min(this.maximumScale, this.scale) : this.scale;
        ze.multiplyByScalar(t, r, t);
        var i = this._scaledBoundingSphere;
        return i.center = ze.multiplyComponents(this._boundingSphere.center, t, i.center), i.radius = ze.maximumComponent(t) * this._initialRadius, je(this._rtcCenter) && ze.add(this._rtcCenter, i.center, i.center), i;
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
    asynchronous: {
      get: function get() {
        return this._asynchronous;
      }
    },
    allowPicking: {
      get: function get() {
        return this._allowPicking;
      }
    },
    incrementallyLoadTextures: {
      get: function get() {
        return this._incrementallyLoadTextures;
      }
    },
    pendingTextureLoads: {
      get: function get() {
        return je(this._loadResources) ? this._loadResources.pendingTextureLoads : 0;
      }
    },
    dirty: {
      get: function get() {
        return this._dirty;
      }
    },
    distanceDisplayCondition: {
      get: function get() {
        return this._distanceDisplayCondition;
      },
      set: function set(e) {
        if (je(e) && e.far <= e.near) throw new Ze("far must be greater than near");
        this._distanceDisplayCondition = t.clone(e, this._distanceDisplayCondition);
      }
    },
    extensionsUsed: {
      get: function get() {
        return je(this._extensionsUsed) || (this._extensionsUsed = pt.getUsedExtensions(this.gltf)), this._extensionsUsed;
      }
    },
    extensionsRequired: {
      get: function get() {
        return je(this._extensionsRequired) || (this._extensionsRequired = pt.getRequiredExtensions(this.gltf)), this._extensionsRequired;
      }
    },
    upAxis: {
      get: function get() {
        return this._upAxis;
      }
    },
    forwardAxis: {
      get: function get() {
        return je(this._forwardAxis) ? this._forwardAxis : this._gltfForwardAxis;
      }
    },
    trianglesLength: {
      get: function get() {
        return this._trianglesLength;
      }
    },
    geometryByteLength: {
      get: function get() {
        return this._geometryByteLength;
      }
    },
    texturesByteLength: {
      get: function get() {
        return this._texturesByteLength;
      }
    },
    cachedGeometryByteLength: {
      get: function get() {
        return this._cachedGeometryByteLength;
      }
    },
    cachedTexturesByteLength: {
      get: function get() {
        return this._cachedTexturesByteLength;
      }
    },
    clippingPlanes: {
      get: function get() {
        return this._clippingPlanes;
      },
      set: function set(e) {
        e !== this._clippingPlanes && S.setOwner(e, this, "_clippingPlanes");
      }
    },
    pickIds: {
      get: function get() {
        return this._pickIds;
      }
    },
    imageBasedLightingFactor: {
      get: function get() {
        return this._imageBasedLightingFactor;
      },
      set: function set(e) {
        a.typeOf.object("imageBasedLightingFactor", e), a.typeOf.number.greaterThanOrEquals("imageBasedLightingFactor.x", e.x, 0), a.typeOf.number.lessThanOrEquals("imageBasedLightingFactor.x", e.x, 1), a.typeOf.number.greaterThanOrEquals("imageBasedLightingFactor.y", e.y, 0), a.typeOf.number.lessThanOrEquals("imageBasedLightingFactor.y", e.y, 1);
        var t = this._imageBasedLightingFactor;
        e === t || o.equals(e, t) || (this._shouldRegenerateShaders = this._shouldRegenerateShaders || 0 < this._imageBasedLightingFactor.x && 0 === e.x || 0 === this._imageBasedLightingFactor.x && 0 < e.x, this._shouldRegenerateShaders = this._shouldRegenerateShaders || 0 < this._imageBasedLightingFactor.y && 0 === e.y || 0 === this._imageBasedLightingFactor.y && 0 < e.y, o.clone(e, this._imageBasedLightingFactor));
      }
    },
    lightColor: {
      get: function get() {
        return this._lightColor;
      },
      set: function set(e) {
        var t = this._lightColor;
        e === t || ze.equals(e, t) || (this._shouldRegenerateShaders = this._shouldRegenerateShaders || je(t) && !je(e) || je(e) && !je(t), this._lightColor = ze.clone(e, t));
      }
    },
    luminanceAtZenith: {
      get: function get() {
        return this._luminanceAtZenith;
      },
      set: function set(e) {
        var t = this._luminanceAtZenith;
        e !== t && (this._shouldRegenerateShaders = this._shouldRegenerateShaders || je(t) && !je(e) || je(e) && !je(t), this._luminanceAtZenith = e);
      }
    },
    sphericalHarmonicCoefficients: {
      get: function get() {
        return this._sphericalHarmonicCoefficients;
      },
      set: function set(e) {
        if (je(e) && (!r(e) || 9 !== e.length)) throw new Ze("sphericalHarmonicCoefficients must be an array of 9 Cartesian3 values.");
        e !== this._sphericalHarmonicCoefficients && (this._sphericalHarmonicCoefficients = e, this._shouldRegenerateShaders = !0);
      }
    },
    specularEnvironmentMaps: {
      get: function get() {
        return this._specularEnvironmentMaps;
      },
      set: function set(e) {
        this._shouldUpdateSpecularMapAtlas = this._shouldUpdateSpecularMapAtlas || e !== this._specularEnvironmentMaps, this._specularEnvironmentMaps = e;
      }
    }
  }), k.silhouetteSupported = function (e) {
    return G(e.context);
  }, k.fromGltf = function (e) {
    if (!je(e) || !je(e.url)) throw new Ze("options.url is required");
    var t = e.url;
    e = Ke(e);
    var r = h.createIfNeeded(t),
        i = We(e.basePath, r.clone()),
        n = h.createIfNeeded(i),
        a = We(e.cacheKey, z[c(r.url)]);
    je(a) || (a = u(), z[c(r.url)] = a), je(e.basePath) && !je(e.cacheKey) && (a += n.url), e.cacheKey = a, e.basePath = n;
    var o = new k(e),
        s = H[a];
    return je(s) ? s.ready || (++s.count, s.modelsToLoad.push(o)) : ((s = new V({
      ready: !1
    })).count = 1, s.modelsToLoad.push(o), U(o, s), H[a] = s, je(r.headers.Accept) || (r.headers.Accept = "model/gltf-binary,model/gltf+json;q=0.8,application/json;q=0.2,*/*;q=0.01"), r.fetchArrayBuffer().then(function (e) {
      var t,
          r,
          i = new Uint8Array(e);
      "glTF" === l(i) ? (t = _(i), s.makeReady(t)) : (r = p(i), s.makeReady(JSON.parse(r)));
    }).otherwise(pt.getFailedLoadFunction(o, "model", r.url))), o;
  }, k._gltfCache = H, k.prototype.getNode = function (e) {
    var t = K(this, "nodesByName", e);
    return je(t) ? t.publicNode : void 0;
  }, k.prototype.getMesh = function (e) {
    return K(this, "meshesByName", e);
  }, k.prototype.getMaterial = function (e) {
    return K(this, "materialsByName", e);
  }, k.prototype.setArticulationStage = function (e, t) {
    a.typeOf.number("value", t);
    var r = K(this, "stagesByKey", e),
        i = K(this, "articulationsByStageKey", e);
    je(r) && je(i) && (t = Qe.clamp(t, r.minimumValue, r.maximumValue), Qe.equalsEpsilon(r.currentValue, t, F) || (r.currentValue = t, i.isDirty = !0));
  };
  var W = new ze(),
      j = new d();

  function bt(e, t) {
    a.typeOf.object("stage", e), a.typeOf.object("result", t);
    var r,
        i = e.currentValue,
        n = W;

    switch (e.type) {
      case "xRotate":
        r = d.fromRotationX(Qe.toRadians(i), j), $e.multiplyByMatrix3(t, r, t);
        break;

      case "yRotate":
        r = d.fromRotationY(Qe.toRadians(i), j), $e.multiplyByMatrix3(t, r, t);
        break;

      case "zRotate":
        r = d.fromRotationZ(Qe.toRadians(i), j), $e.multiplyByMatrix3(t, r, t);
        break;

      case "xTranslate":
        n.x = i, n.y = 0, n.z = 0, $e.multiplyByTranslation(t, n, t);
        break;

      case "yTranslate":
        n.x = 0, n.y = i, n.z = 0, $e.multiplyByTranslation(t, n, t);
        break;

      case "zTranslate":
        n.x = 0, n.y = 0, n.z = i, $e.multiplyByTranslation(t, n, t);
        break;

      case "xScale":
        n.x = i, n.y = 1, n.z = 1, $e.multiplyByScale(t, n, t);
        break;

      case "yScale":
        n.x = 1, n.y = i, n.z = 1, $e.multiplyByScale(t, n, t);
        break;

      case "zScale":
        n.x = 1, n.y = 1, n.z = i, $e.multiplyByScale(t, n, t);
        break;

      case "uniformScale":
        $e.multiplyByUniformScale(t, i, t);
    }

    return t;
  }

  var Z = new $e();

  function Mt(i, n) {
    return function (e) {
      var t = i._loadResources,
          r = new Uint8Array(e);
      --t.pendingBufferLoads, i.gltf.buffers[n].extras._pipeline.source = r;
    };
  }

  function wt(d) {
    var e = d.gltf,
        h = e.buffers,
        m = e.bufferViews,
        f = d._rendererResources.sourceShaders;
    at.shader(e, function (e, t) {
      var r, i, n, a, o, s, u, c, l;
      je(e.bufferView) ? (r = e.bufferView, n = (i = m[r]).buffer, a = h[n], o = p(a.extras._pipeline.source, i.byteOffset, i.byteLength), f[t] = o) : je(e.extras._pipeline.source) ? f[t] = e.extras._pipeline.source : (++d._loadResources.pendingShaderLoads, (s = d._resource.getDerivedResource({
        url: e.uri
      })).fetchText().then((u = d, c = e.type, l = t, function (e) {
        var t = u._loadResources;
        t.shaders[l] = {
          source: e,
          type: c,
          bufferView: void 0
        }, --t.pendingShaderLoads, u._rendererResources.sourceShaders[l] = e;
      })).otherwise(pt.getFailedLoadFunction(d, "shader", s.url)));
    });
  }

  function Et(r, i) {
    return function (e) {
      var t = r._loadResources;
      --t.pendingTextureLoads, t.texturesToCreate.enqueue({
        id: i,
        image: e,
        bufferView: e.bufferView,
        width: e.width,
        height: e.height,
        internalFormat: e.internalFormat
      });
    };
  }

  k.prototype.applyArticulations = function () {
    var e = this._runtime.articulationsByName;

    for (var t in e) {
      if (e.hasOwnProperty(t)) {
        var r = e[t];

        if (r.isDirty) {
          r.isDirty = !1;

          for (var i = r.nodes.length, n = 0; n < i; ++n) {
            for (var a = r.nodes[n], o = $e.clone(a.originalMatrix, Z), s = r.stages.length, u = 0; u < s; ++u) {
              o = bt(r.stages[u], o);
            }

            a.matrix = o;
          }
        }
      }
    }
  };

  var Tt = /(^data:image\/ktx)|(\.ktx$)/i,
      At = /(^data:image\/crn)|(\.crn$)/i;
  var Pt = new $e();

  function J() {
    this.id = void 0, this.model = void 0, this.context = void 0;
  }

  function Y(e, t, r) {
    var i = t._loadResources,
        n = t.gltf.bufferViews[e];
    je(n) || (n = i.createdBufferViews[e]);
    var a = m.createVertexBuffer({
      context: r,
      typedArray: i.getBuffer(n),
      usage: f.STATIC_DRAW
    });
    a.vertexArrayDestroyable = !1, t._rendererResources.buffers[e] = a, t._geometryByteLength += a.sizeInBytes;
  }

  J.prototype.set = function (e, t, r) {
    this.id = e, this.model = t, this.context = r;
  }, J.prototype.execute = function () {
    Y(this.id, this.model, this.context);
  };

  function X() {
    this.id = void 0, this.componentType = void 0, this.model = void 0, this.context = void 0;
  }

  function ne(e, t, r, i) {
    var n = r._loadResources,
        a = r.gltf.bufferViews[e];
    je(a) || (a = n.createdBufferViews[e]);
    var o = m.createIndexBuffer({
      context: i,
      typedArray: n.getBuffer(a),
      usage: f.STATIC_DRAW,
      indexDatatype: t
    });
    o.vertexArrayDestroyable = !1, r._rendererResources.buffers[e] = o, r._geometryByteLength += o.sizeInBytes;
  }

  X.prototype.set = function (e, t, r, i) {
    this.id = e, this.componentType = t, this.model = r, this.context = i;
  }, X.prototype.execute = function () {
    ne(this.id, this.componentType, this.model, this.context);
  };
  var ae = new J(),
      oe = new X();

  function Lt(e, t) {
    var r = e._runtime.materialsById[t.material];
    if (je(r)) return r._program;
  }

  function se(e, t, r) {
    var i,
        n,
        a,
        o = r._programPrimitives[t];
    if (!je(o)) return e;

    for (n in o) {
      if (o.hasOwnProperty(n) && Lt(r, i = o[n]) === t) break;
    }

    if (r._programPrimitives[t] = void 0, r.extensionsUsed.WEB3D_quantized_attributes) a = pt.modifyShaderForQuantizedAttributes(r.gltf, i, e), r._quantizedUniforms[t] = a.uniforms;else {
      var s = r._decodedData[n];
      if (!je(s)) return e;
      a = pt.modifyShaderForDracoQuantizedAttributes(r.gltf, i, e, s.attributes);
    }
    return a.shader;
  }

  function ue(e, t, r) {
    return je(r) && (e = r(e, t)), e;
  }

  function ce() {
    this.programToCreate = void 0, this.model = void 0, this.context = void 0;
  }

  function le(e, t, r) {
    var i,
        n = e.programId,
        a = e.techniqueId,
        o = t._sourcePrograms[n],
        s = t._rendererResources.sourceShaders,
        u = s[o.vertexShader],
        c = s[o.fragmentShader],
        l = t._quantizedVertexShaders,
        d = t._toClipCoordinatesGLSL[n];
    (t.extensionsUsed.WEB3D_quantized_attributes || t._dequantizeInShader) && (i = l[n], je(i) || (i = se(u, n, t), l[n] = i), u = i);
    var h = ue(u, n, t._vertexShaderLoaded),
        m = ue(c, n, t._fragmentShaderLoaded);
    Je.isInternetExplorer() || (h = pt.modifyVertexShaderForLogDepth(h, d), m = pt.modifyFragmentShaderForLogDepth(m)), je(t._uniformMapLoaded) || (m = "uniform vec4 czm_pickColor;\n" + m);

    var f,
        p,
        _ = 0 < t._imageBasedLightingFactor.x || 0 < t._imageBasedLightingFactor.y;

    _ && (m = "#define USE_IBL_LIGHTING \n\n" + m), je(t._lightColor) && (m = "#define USE_CUSTOM_LIGHT_COLOR \n\n" + m), "2.0" === t._sourceVersion && !t._sourceKHRTechniquesWebGL || (m = P.replaceMain(m, "non_gamma_corrected_main"), m += "\nvoid main() { \n    non_gamma_corrected_main(); \n    gl_FragColor = czm_gammaCorrect(gl_FragColor); \n} \n"), _t.isSupported(r) && (f = je(t._sphericalHarmonicCoefficients) || t._useDefaultSphericalHarmonics, p = je(t._specularEnvironmentMapAtlas) && t._specularEnvironmentMapAtlas.ready || t._useDefaultSpecularMaps, (f || p || _) && (m = "uniform mat4 gltf_clippingPlanesMatrix; \n" + m), je(t._sphericalHarmonicCoefficients) ? m = "#define DIFFUSE_IBL \n#define CUSTOM_SPHERICAL_HARMONICS \nuniform vec3 gltf_sphericalHarmonicCoefficients[9]; \n" + m : t._useDefaultSphericalHarmonics && (m = "#define DIFFUSE_IBL \n" + m), je(t._specularEnvironmentMapAtlas) && t._specularEnvironmentMapAtlas.ready ? m = "#define SPECULAR_IBL \n#define CUSTOM_SPECULAR_IBL \nuniform sampler2D gltf_specularMap; \nuniform vec2 gltf_specularMapSize; \nuniform float gltf_maxSpecularLOD; \n" + m : t._useDefaultSpecularMaps && (m = "#define SPECULAR_IBL \n" + m)), je(t._luminanceAtZenith) && (m = "#define USE_SUN_LUMINANCE \nuniform float gltf_luminanceAtZenith;\n" + m), de(n, a, m, h, t, r);
  }

  function Bt(e, t, r) {
    var i = e.programId,
        n = e.techniqueId,
        a = t._sourcePrograms[i],
        o = t._rendererResources.sourceShaders,
        s = t._quantizedVertexShaders,
        u = t._toClipCoordinatesGLSL[i],
        c = t.clippingPlanes,
        l = Rt(t),
        d = o[a.vertexShader],
        h = o[a.fragmentShader];
    (t.extensionsUsed.WEB3D_quantized_attributes || t._dequantizeInShader) && (d = s[i]);
    var m,
        f,
        p,
        _ = h;
    Ct(t) && (_ = k._modifyShaderForColor(_)), l && (m = _, f = c, p = r, m = P.replaceMain(m, "gltf_clip_main"), m += k._getClippingFunction(f, p) + "\n", _ = m += "uniform sampler2D gltf_clippingPlanes; \nuniform mat4 gltf_clippingPlanesMatrix; \nuniform vec4 gltf_clippingPlanesEdgeStyle; \nvoid main() \n{ \n    gltf_clip_main(); \n" + C("gltf_clippingPlanes", "gltf_clippingPlanesMatrix", "gltf_clippingPlanesEdgeStyle") + "} \n");
    var g = ue(d, i, t._vertexShaderLoaded),
        v = ue(_, i, t._fragmentShaderLoaded);
    Je.isInternetExplorer() || (g = pt.modifyVertexShaderForLogDepth(g, u), v = pt.modifyFragmentShaderForLogDepth(v)), je(t._uniformMapLoaded) || (v = "uniform vec4 czm_pickColor;\n" + v);
    var x,
        y,
        S = 0 < t._imageBasedLightingFactor.x || 0 < t._imageBasedLightingFactor.y;
    S && (v = "#define USE_IBL_LIGHTING \n\n" + v), je(t._lightColor) && (v = "#define USE_CUSTOM_LIGHT_COLOR \n\n" + v), "2.0" === t._sourceVersion && !t._sourceKHRTechniquesWebGL || (v = P.replaceMain(v, "non_gamma_corrected_main"), v += "\nvoid main() { \n    non_gamma_corrected_main(); \n    gl_FragColor = czm_gammaCorrect(gl_FragColor); \n} \n"), _t.isSupported(r) && (x = je(t._sphericalHarmonicCoefficients) || t._useDefaultSphericalHarmonics, y = je(t._specularEnvironmentMapAtlas) && t._specularEnvironmentMapAtlas.ready || t._useDefaultSpecularMaps, !l && (x || y || S) && (v = "uniform mat4 gltf_clippingPlanesMatrix; \n" + v), je(t._sphericalHarmonicCoefficients) ? v = "#define DIFFUSE_IBL \n#define CUSTOM_SPHERICAL_HARMONICS \nuniform vec3 gltf_sphericalHarmonicCoefficients[9]; \n" + v : t._useDefaultSphericalHarmonics && (v = "#define DIFFUSE_IBL \n" + v), je(t._specularEnvironmentMapAtlas) && t._specularEnvironmentMapAtlas.ready ? v = "#define SPECULAR_IBL \n#define CUSTOM_SPECULAR_IBL \nuniform sampler2D gltf_specularMap; \nuniform vec2 gltf_specularMapSize; \nuniform float gltf_maxSpecularLOD; \n" + v : t._useDefaultSpecularMaps && (v = "#define SPECULAR_IBL \n" + v)), je(t._luminanceAtZenith) && (v = "#define USE_SUN_LUMINANCE \nuniform float gltf_luminanceAtZenith;\n" + v), de(i, n, v, g, t, r);
  }

  function de(e, t, r, i, n, a) {
    var o = n._sourceTechniques[t],
        s = pt.createAttributeLocations(o, n._precreatedAttributes);
    n._rendererResources.programs[e] = A.fromCache({
      context: a,
      vertexShaderSource: i,
      fragmentShaderSource: r,
      attributeLocations: s
    });
  }

  ce.prototype.set = function (e, t, r) {
    this.programToCreate = e, this.model = t, this.context = r;
  }, ce.prototype.execute = function () {
    le(this.programToCreate, this.model, this.context);
  };
  var he = new ce();

  function me(e) {
    var t = e._loadResources;
    if (0 === t.pendingBufferLoads) for (; 0 < t.texturesToCreateFromBufferView.length;) {
      var r,
          i = t.texturesToCreateFromBufferView.dequeue(),
          n = e.gltf,
          a = n.bufferViews[i.bufferView],
          o = (n.textures[i.id].source, pt.getFailedLoadFunction(e, "image", "id: " + i.id + ", bufferView: " + i.bufferView));
      "image/ktx" === i.mimeType ? (Xe(t.getBuffer(a)).then(Et(e, i.id)).otherwise(o), ++e._loadResources.pendingTextureLoads) : "image/crn" === i.mimeType ? (Ye(t.getBuffer(a)).then(Et(e, i.id)).otherwise(o), ++e._loadResources.pendingTextureLoads) : (r = function (t, r) {
        return function (e) {
          t.texturesToCreate.enqueue({
            id: r.id,
            image: e,
            bufferView: void 0
          }), --t.pendingBufferViewToImage;
        };
      }(t, i), s({
        uint8Array: t.getBuffer(a),
        format: i.mimeType,
        flipY: !1
      }).then(r).otherwise(o), ++t.pendingBufferViewToImage);
    }
  }

  function fe() {
    this.gltfTexture = void 0, this.model = void 0, this.context = void 0;
  }

  function pe(e, t, r) {
    var i = t.gltf.textures[e.id],
        n = t._rendererResources.samplers[i.sampler];
    je(n) || (n = new I({
      wrapS: w.REPEAT,
      wrapT: w.REPEAT
    }));

    for (var a = !1, o = t.gltf.materials, s = o.length, u = 0; u < s; ++u) {
      var c = o[u];

      if (je(c.extensions) && je(c.extensions.KHR_techniques_webgl)) {
        var l = c.extensions.KHR_techniques_webgl.values;

        for (var d in l) {
          if (l.hasOwnProperty(d) && -1 !== d.indexOf("Texture")) {
            var h = l[d];

            if (h.index === e.id && je(h.extensions) && je(h.extensions.KHR_texture_transform)) {
              a = !0;
              break;
            }
          }
        }
      }

      if (a) break;
    }

    var m = n.wrapS,
        f = n.wrapT,
        p = n.minificationFilter;
    a && p !== M.LINEAR && p !== M.NEAREST && (p = p === M.NEAREST_MIPMAP_NEAREST || p === M.NEAREST_MIPMAP_LINEAR ? M.NEAREST : M.LINEAR, n = new I({
      wrapS: n.wrapS,
      wrapT: n.wrapT,
      textureMinificationFilter: p,
      textureMagnificationFilter: n.magnificationFilter
    }));

    var _,
        g,
        v,
        x = e.internalFormat,
        y = !(je(x) && R.isCompressedFormat(x) || p !== M.NEAREST_MIPMAP_NEAREST && p !== M.NEAREST_MIPMAP_LINEAR && p !== M.LINEAR_MIPMAP_NEAREST && p !== M.LINEAR_MIPMAP_LINEAR),
        S = y || m === w.REPEAT || m === w.MIRRORED_REPEAT || f === w.REPEAT || f === w.MIRRORED_REPEAT,
        C = e.image;

    je(x) ? _ = new b({
      context: r,
      source: {
        arrayBufferView: e.bufferView
      },
      width: e.width,
      height: e.height,
      pixelFormat: x,
      sampler: n
    }) : je(C) && (g = !Qe.isPowerOfTwo(C.width) || !Qe.isPowerOfTwo(C.height), S && g && ((v = document.createElement("canvas")).width = Qe.nextPowerOfTwo(C.width), v.height = Qe.nextPowerOfTwo(C.height), v.getContext("2d").drawImage(C, 0, 0, C.width, C.height, 0, 0, v.width, v.height), C = v), _ = new b({
      context: r,
      source: C,
      pixelFormat: i.internalFormat,
      pixelDatatype: i.type,
      sampler: n,
      flipY: !1
    }), y && _.generateMipmap()), je(_) && (t._rendererResources.textures[e.id] = _, t._texturesByteLength += _.sizeInBytes);
  }

  fe.prototype.set = function (e, t, r) {
    this.gltfTexture = e, this.model = t, this.context = r;
  }, fe.prototype.execute = function () {
    pe(this.gltfTexture, this.model, this.context);
  };

  var _e = new fe();

  function ge(e, t) {
    for (var r = e.gltf, i = r.skins, n = r.nodes, a = e._runtime.nodes, o = e._loadResources.skinnedNodesIds, s = o.length, u = 0; u < s; ++u) {
      var c = o[u],
          l = a[c],
          d = n[c],
          h = t[d.skin];
      l.inverseBindMatrices = h.inverseBindMatrices, l.bindShapeMatrix = h.bindShapeMatrix;
      var m = [],
          f = i[d.skin];
      je(f.skeleton) && m.push(f.skeleton);

      for (var p = function (e, t) {
        for (var r = e.length, i = {}, n = 0; n < r; ++n) {
          for (var a = [e[n]]; 0 < a.length;) {
            var o = a.pop(),
                s = t[o];
            je(s) && (i[o] = o);
            var u = s.children;
            if (je(u)) for (var c = u.length, l = 0; l < c; ++l) {
              a.push(u[l]);
            }
          }
        }

        return i;
      }(m, n), _ = i[d.skin].joints, g = _.length, v = 0; v < g; ++v) {
        var x = a[p[_[v]]];
        l.joints.push(x);
      }
    }
  }

  function ve(_) {
    var g,
        v,
        e = _._loadResources;
    e.finishedPendingBufferLoads() && e.createRuntimeAnimations && (e.createRuntimeAnimations = !1, _._runtime.animations = [], g = _._runtime.nodes, v = _.gltf.accessors, at.animation(_.gltf, function (e, t) {
      for (var r = e.channels, i = e.samplers, n = Number.MAX_VALUE, a = -Number.MAX_VALUE, o = r.length, s = new Array(o), u = 0; u < o; ++u) {
        var c = r[u],
            l = c.target,
            d = l.path,
            h = i[c.sampler],
            m = D.getAnimationParameterValues(_, v[h.input]),
            f = D.getAnimationParameterValues(_, v[h.output]),
            n = Math.min(n, m[0]),
            a = Math.max(a, m[m.length - 1]),
            p = D.getAnimationSpline(_, t, e, c.sampler, h, m, d, f);

        s[u] = function (t, r, i, n) {
          return function (e) {
            je(n) && (e = t.clampAnimations ? n.clampTime(e) : n.wrapTime(e), r[i] = n.evaluate(e, r[i]), r.dirtyNumber = t._maxDirtyNumber);
          };
        }(_, g[l.node], l.path, p);
      }

      _._runtime.animations[t] = {
        name: e.name,
        startTime: n,
        stopTime: a,
        channelEvaluators: s
      };
    }));
  }

  function xe(h, m) {
    var f,
        p,
        _,
        g,
        e = h._loadResources;

    e.finishedBuffersCreation() && e.finishedProgramCreation() && e.createVertexArrays && (e.createVertexArrays = !1, f = h._rendererResources.buffers, p = h._rendererResources.vertexArrays, _ = h.gltf, g = _.accessors, at.mesh(_, function (e, d) {
      at.meshPrimitive(e, function (e, t) {
        var o,
            r,
            i,
            s = [],
            u = function (e, t) {
          var r,
              i,
              n = e._sourceTechniques,
              a = {},
              o = e._runtime.materialsById[t.material];
          if (!je(o)) return a;
          var s = n[o._technique];
          if (!je(s)) return a;
          var u,
              c = s.attributes,
              l = e._rendererResources.programs[s.program],
              d = l.vertexAttributes,
              h = l._attributeLocations;

          for (r in d) {
            d.hasOwnProperty(r) && (u = c[r], je(u) && (i = h[r], a[u.semantic] = i));
          }

          var m = e._precreatedAttributes;
          if (je(m)) for (r in m) {
            m.hasOwnProperty(r) && (i = h[r], a[r] = i);
          }
          return a;
        }(h, e),
            c = h._decodedData[d + ".primitive." + t];

        at.meshPrimitiveAttribute(e, function (e, t) {
          if (o = u[t], je(o)) {
            if (je(c)) {
              var r = c.attributes;

              if (r.hasOwnProperty(t)) {
                var i = r[t];
                return void s.push({
                  index: o,
                  vertexBuffer: f[i.bufferView],
                  componentsPerAttribute: i.componentsPerAttribute,
                  componentDatatype: i.componentDatatype,
                  normalize: i.normalized,
                  offsetInBytes: i.byteOffset,
                  strideInBytes: i.byteStride
                });
              }
            }

            var n = g[e],
                a = je(n.normalized) && n.normalized;
            s.push({
              index: o,
              vertexBuffer: f[n.bufferView],
              componentsPerAttribute: y(n.type),
              componentDatatype: n.componentType,
              normalize: a,
              offsetInBytes: n.byteOffset,
              strideInBytes: x(_, n)
            });
          }
        });
        var n,
            a,
            l = h._precreatedAttributes;
        if (je(l)) for (i in l) {
          l.hasOwnProperty(i) && (o = u[i], je(o) && ((r = l[i]).index = o, s.push(r)));
        }
        je(e.indices) && (a = g[e.indices].bufferView, je(c) && (a = c.bufferView), n = f[a]), p[d + ".primitive." + t] = new v({
          context: m,
          attributes: s,
          indexBuffer: n
        });
      });
    }));
  }

  function ye(r) {
    var e = r._loadResources;
    e.createRenderStates && (e.createRenderStates = !1, at.material(r.gltf, function (e, t) {
      !function (e, t, r) {
        var i = e._rendererResources.renderStates,
            n = [rt.FUNC_ADD, rt.FUNC_ADD],
            a = [rt.ONE, rt.ONE_MINUS_SRC_ALPHA, rt.ONE, rt.ONE_MINUS_SRC_ALPHA];
        je(t.extensions) && je(t.extensions.KHR_blend) && (n = t.extensions.KHR_blend.blendEquation, a = t.extensions.KHR_blend.blendFactors);
        var o = !t.doubleSided,
            s = "BLEND" === t.alphaMode;
        i[r] = T.fromCache({
          cull: {
            enabled: o
          },
          depthTest: {
            enabled: !0
          },
          depthMask: !s,
          blending: {
            enabled: s,
            equationRgb: n[0],
            equationAlpha: n[1],
            functionSourceRgb: a[0],
            functionDestinationRgb: a[1],
            functionSourceAlpha: a[2],
            functionDestinationAlpha: a[3]
          }
        });
      }(r, e, t);
    }));
  }

  var Se = {
    MODEL: function MODEL(e, t, r) {
      return function () {
        return r.computedMatrix;
      };
    },
    VIEW: function VIEW(e, t, r) {
      return function () {
        return e.view;
      };
    },
    PROJECTION: function PROJECTION(e, t, r) {
      return function () {
        return e.projection;
      };
    },
    MODELVIEW: function MODELVIEW(e, t, r) {
      var i = new $e();
      return function () {
        return $e.multiplyTransformation(e.view, r.computedMatrix, i);
      };
    },
    PGEARTH_RTC_MODELVIEW: function PGEARTH_RTC_MODELVIEW(e, t, r) {
      var i = new $e();
      return function () {
        return $e.multiplyTransformation(e.view, r.computedMatrix, i), $e.setTranslation(i, t._rtcCenterEye, i);
      };
    },
    MODELVIEWPROJECTION: function MODELVIEWPROJECTION(e, t, r) {
      var i = new $e();
      return function () {
        return $e.multiplyTransformation(e.view, r.computedMatrix, i), $e.multiply(e._projection, i, i);
      };
    },
    MODELINVERSE: function MODELINVERSE(e, t, r) {
      var i = new $e();
      return function () {
        return $e.inverse(r.computedMatrix, i);
      };
    },
    VIEWINVERSE: function VIEWINVERSE(e, t) {
      return function () {
        return e.inverseView;
      };
    },
    PROJECTIONINVERSE: function PROJECTIONINVERSE(e, t, r) {
      return function () {
        return e.inverseProjection;
      };
    },
    MODELVIEWINVERSE: function MODELVIEWINVERSE(e, t, r) {
      var i = new $e(),
          n = new $e();
      return function () {
        return $e.multiplyTransformation(e.view, r.computedMatrix, i), $e.inverse(i, n);
      };
    },
    MODELVIEWPROJECTIONINVERSE: function MODELVIEWPROJECTIONINVERSE(e, t, r) {
      var i = new $e(),
          n = new $e();
      return function () {
        return $e.multiplyTransformation(e.view, r.computedMatrix, i), $e.multiply(e._projection, i, i), $e.inverse(i, n);
      };
    },
    MODELINVERSETRANSPOSE: function MODELINVERSETRANSPOSE(e, t, r) {
      var i = new $e(),
          n = new d();
      return function () {
        return $e.inverse(r.computedMatrix, i), $e.getRotation(i, n), d.transpose(n, n);
      };
    },
    MODELVIEWINVERSETRANSPOSE: function MODELVIEWINVERSETRANSPOSE(e, t, r) {
      var i = new $e(),
          n = new $e(),
          a = new d();
      return function () {
        return $e.multiplyTransformation(e.view, r.computedMatrix, i), $e.inverse(i, n), $e.getRotation(n, a), d.transpose(a, a);
      };
    },
    VIEWPORT: function VIEWPORT(e, t, r) {
      return function () {
        return e.viewportCartesian4;
      };
    }
  };

  function Ce(d, h, e, m, f, p, _) {
    var g,
        v,
        x = {},
        y = {};
    return at.techniqueUniform(e, function (e, t) {
      var r, i, n, a, o, s, u, c, l;
      je(m) && je(m[t]) ? (n = pt.createUniformFunction(e.type, m[t], p, _), x[t] = n.func, y[t] = n) : je(e.node) ? x[t] = (o = e.node, s = d, u = e.semantic, c = f.uniformState, l = s._runtime.nodes[o], Se[u](c, s, l)) : je(e.semantic) ? "JOINTMATRIX" === e.semantic ? g = t : "MORPHWEIGHTS" === e.semantic ? v = t : "ALPHACUTOFF" === e.semantic ? (r = h.alphaMode, je(r) && "MASK" === r && (i = We(h.alphaCutoff, .5), n = pt.createUniformFunction(e.type, i, p, _), x[t] = n.func, y[t] = n)) : x[t] = pt.getGltfSemanticUniforms()[e.semantic](f.uniformState, d) : je(e.value) && (a = pt.createUniformFunction(e.type, e.value, p, _), x[t] = a.func, y[t] = a);
    }), {
      map: x,
      values: y,
      jointMatrixUniformName: g,
      morphWeightsUniformName: v
    };
  }

  var Re = new $e();

  function be(e, t, r, i, n) {
    for (var a, o, s, u, c, l = e._nodeCommands, d = e._pickIds, h = e.allowPicking, m = e._runtime.meshesByName, f = e._rendererResources, p = f.vertexArrays, _ = f.programs, g = f.renderStates, v = e._uniformMaps, x = e.gltf, y = x.accessors, S = x.meshes, C = t.mesh, R = S[C], b = R.primitives, M = b.length, w = 0; w < M; ++w) {
      var E,
          T,
          A = b[w],
          P = y[A.indices],
          L = e._runtime.materialsById[A.material]._program,
          B = e._decodedData[C + ".primitive." + w],
          I = A.attributes.POSITION;
      je(I) && (E = pt.getAccessorMinMax(x, I), T = He.fromCornerPoints(ze.fromArray(E.min), ze.fromArray(E.max)));
      var N,
          D,
          O = p[C + ".primitive." + w];
      D = je(B) ? (N = B.numberOfIndices, 0) : je(P) ? (N = P.count, P.byteOffset / ee.getSizeInBytes(P.componentType)) : (N = y[A.attributes.POSITION].count, 0), e._trianglesLength += function (e, t) {
        switch (e.mode) {
          case et.TRIANGLES:
            return t / 3;

          case et.TRIANGLE_STRIP:
          case et.TRIANGLE_FAN:
            return Math.max(t - 2, 0);

          default:
            return 0;
        }
      }(A, N);
      var q,
          F,
          U = v[A.material],
          V = U.uniformMap;
      je(U.jointMatrixUniformName) && ((q = {})[U.jointMatrixUniformName] = function (e) {
        return function () {
          return e.computedJointMatrices;
        };
      }(r), V = $(V, q)), je(U.morphWeightsUniformName) && ((F = {})[U.morphWeightsUniformName] = function (e) {
        return function () {
          return e.weights;
        };
      }(r), V = $(V, F)), V = $(V, {
        gltf_color: function (e) {
          return function () {
            return e.color;
          };
        }(e),
        gltf_colorBlend: function (e) {
          return function () {
            return ie.getColorBlend(e.colorBlendMode, e.colorBlendAmount);
          };
        }(e),
        gltf_clippingPlanes: function (t) {
          return function () {
            var e = t.clippingPlanes;
            return je(e) && e.enabled ? e.texture : t._defaultTexture;
          };
        }(e),
        gltf_clippingPlanesEdgeStyle: function (r) {
          return function () {
            var e = r.clippingPlanes;
            if (!je(e)) return Q.WHITE.withAlpha(0);
            var t = Q.clone(e.edgeColor);
            return t.alpha = e.edgeWidth, t;
          };
        }(e),
        gltf_clippingPlanesMatrix: function (r) {
          return function () {
            var e = r.clippingPlanes;
            if (!je(e) && !je(r._sphericalHarmonicCoefficients) && !je(r._specularEnvironmentMaps)) return $e.IDENTITY;
            var t = je(e) ? e.modelMatrix : $e.IDENTITY;
            return $e.multiply(r._clippingPlaneModelViewMatrix, t, Re);
          };
        }(e),
        gltf_iblFactor: function (e) {
          return function () {
            return e._imageBasedLightingFactor;
          };
        }(e),
        gltf_lightColor: function (e) {
          return function () {
            return e._lightColor;
          };
        }(e),
        gltf_sphericalHarmonicCoefficients: function (e) {
          return function () {
            return e._sphericalHarmonicCoefficients;
          };
        }(e),
        gltf_specularMap: function (e) {
          return function () {
            return e._specularEnvironmentMapAtlas.texture;
          };
        }(e),
        gltf_specularMapSize: function (e) {
          return function () {
            return e._specularEnvironmentMapAtlas.texture.dimensions;
          };
        }(e),
        gltf_maxSpecularLOD: function (e) {
          return function () {
            return e._specularEnvironmentMapAtlas.maximumMipmapLevel;
          };
        }(e),
        gltf_luminanceAtZenith: function (e) {
          return function () {
            return e.luminanceAtZenith;
          };
        }(e)
      }), je(e._uniformMapLoaded) && (V = e._uniformMapLoaded(V, L, r));
      var H = {};
      e.extensionsUsed.WEB3D_quantized_attributes ? (0, u = Lt(o = e, s = A), c = o._quantizedUniforms[u], H = pt.createUniformsForQuantizedAttributes(o.gltf, s, c)) : e._dequantizeInShader && je(B) && (a = B, H = pt.createUniformsForDracoQuantizedAttributes(a.attributes)), V = $(V, H);
      var z = g[A.material],
          k = z.blending.enabled,
          G = e._pickObject;
      je(G) || (G = {
        primitive: e,
        id: e.id,
        node: r.publicNode,
        mesh: m[R.name]
      });
      var K,
          W,
          j = yt.castShadows(e._shadows),
          Z = yt.receiveShadows(e._shadows);
      h && !je(e._uniformMapLoaded) && (K = i.createPickId(G), d.push(K), W = {
        czm_pickColor: function (e) {
          return function () {
            return e;
          };
        }(K.color)
      }, V = $(V, W)), h && (K = je(e._pickIdLoaded) && je(e._uniformMapLoaded) ? e._pickIdLoaded() : "czm_pickColor");
      var J,
          Y = new te({
        boundingVolume: new He(),
        cull: e.cull,
        modelMatrix: new $e(),
        primitiveType: A.mode,
        vertexArray: O,
        count: N,
        offset: D,
        shaderProgram: _[L],
        castShadows: j,
        receiveShadows: Z,
        uniformMap: V,
        renderState: z,
        owner: G,
        pass: k ? re.TRANSLUCENT : e.opaquePass,
        pickId: K
      });
      n || ((J = te.shallowClone(Y)).boundingVolume = new He(), J.modelMatrix = new $e());
      var X = {
        show: !0,
        boundingSphere: T,
        command: Y,
        command2D: J,
        silhouetteModelCommand: void 0,
        silhouetteModelCommand2D: void 0,
        silhouetteColorCommand: void 0,
        silhouetteColorCommand2D: void 0,
        translucentCommand: void 0,
        translucentCommand2D: void 0,
        programId: L
      };
      r.commands.push(X), l.push(X);
    }
  }

  function It(e, t) {
    var r,
        i,
        n,
        a,
        o,
        s,
        u,
        c,
        l,
        d,
        h,
        m,
        f,
        p,
        _,
        g,
        v,
        x,
        y,
        S,
        C,
        R = t.context,
        b = t.scene3DOnly,
        M = e._quantizedVertexShaders,
        w = e._toClipCoordinatesGLSL = {},
        E = e._sourceTechniques,
        T = e._sourcePrograms,
        A = e._rendererResources,
        P = A.sourceShaders;

    for (var L in e._loadRendererResourcesFromCache && (P = A.sourceShaders = e._cachedRendererResources.sourceShaders), E) {
      E.hasOwnProperty(L) && (n = P[(i = T[r = E[L].program]).vertexShader], pt.checkSupportedGlExtensions(i.glExtensions, R), (e.extensionsUsed.WEB3D_quantized_attributes || e._dequantizeInShader) && (a = M[r], je(a) || (a = se(n, r, e), M[r] = a), n = a), n = ue(n, r, e._vertexShaderLoaded), w[r] = pt.toClipCoordinatesGLSL(e.gltf, n));
    }

    e._loadRendererResourcesFromCache ? (o = e._cachedRendererResources, A.buffers = o.buffers, A.vertexArrays = o.vertexArrays, A.programs = o.programs, A.silhouettePrograms = o.silhouettePrograms, A.textures = o.textures, A.samplers = o.samplers, A.renderStates = o.renderStates, je(e._precreatedAttributes) && xe(e, R), e._cachedGeometryByteLength += function (e) {
      var t = 0;

      for (var r in e) {
        e.hasOwnProperty(r) && (t += e[r].sizeInBytes);
      }

      return t;
    }(o.buffers), e._cachedTexturesByteLength += function (e) {
      var t = 0;

      for (var r in e) {
        e.hasOwnProperty(r) && (t += e[r].sizeInBytes);
      }

      return t;
    }(o.textures)) : (function (e, t) {
      var r = e._loadResources;

      if (0 === r.pendingBufferLoads) {
        var i,
            n = t.context,
            a = r.vertexBuffersToCreate,
            o = r.indexBuffersToCreate;

        if (e.asynchronous) {
          for (; 0 < a.length && (ae.set(a.peek(), e, n), t.jobScheduler.execute(ae, N.BUFFER));) {
            a.dequeue();
          }

          for (; 0 < o.length && (i = o.peek(), oe.set(i.id, i.componentType, e, n), t.jobScheduler.execute(oe, N.BUFFER));) {
            o.dequeue();
          }
        } else {
          for (; 0 < a.length;) {
            Y(a.dequeue(), e, n);
          }

          for (; 0 < o.length;) {
            ne((i = o.dequeue()).id, i.componentType, e, n);
          }
        }
      }
    }(e, t), function (e, t) {
      var r = e._loadResources,
          i = r.programsToCreate;

      if (0 === r.pendingShaderLoads && 0 === r.pendingBufferLoads) {
        var n = t.context;
        if (e.asynchronous) for (; 0 < i.length && (he.set(i.peek(), e, n), t.jobScheduler.execute(he, N.PROGRAM));) {
          i.dequeue();
        } else for (; 0 < i.length;) {
          le(i.dequeue(), e, n);
        }
      }
    }(e, t), (c = (s = e)._loadResources).createSamplers && (c.createSamplers = !1, u = s._rendererResources.samplers, at.sampler(s.gltf, function (e, t) {
      u[t] = new I({
        wrapS: e.wrapS,
        wrapT: e.wrapT,
        minificationFilter: e.minFilter,
        magnificationFilter: e.magFilter
      });
    })), me(e), function (e, t) {
      var r = t.context,
          i = e._loadResources.texturesToCreate;
      if (e.asynchronous) for (; 0 < i.length && (_e.set(i.peek(), e, r), t.jobScheduler.execute(_e, N.TEXTURE));) {
        i.dequeue();
      } else for (; 0 < i.length;) {
        pe(i.dequeue(), e, r);
      }
    }(e, t)), 0 === (f = (l = e)._loadResources).pendingBufferLoads && f.createSkins && (f.createSkins = !1, d = l.gltf, h = d.accessors, m = {}, at.skin(d, function (e, t) {
      var r,
          i = h[e.inverseBindMatrices];
      $e.equals(e.bindShapeMatrix, $e.IDENTITY) || (r = $e.clone(e.bindShapeMatrix)), m[t] = {
        inverseBindMatrices: D.getSkinInverseBindMatrices(l, i),
        bindShapeMatrix: r
      };
    }), ge(l, m)), ve(e), e._loadRendererResourcesFromCache || (xe(e, R), ye(e)), _ = R, (C = (p = e)._loadResources).finishedProgramCreation() && C.createUniformMaps && (C.createUniformMaps = !1, g = p.gltf, v = p._sourceTechniques, x = p._uniformMaps, y = p._rendererResources.textures, S = p._defaultTexture, at.material(g, function (e, t) {
      var r = p._runtime.materialsById[t],
          i = v[r._technique],
          n = r._values,
          a = Ce(p, e, i, n, _, y, S),
          o = x[t];
      o.uniformMap = a.map, o.values = a.values, o.jointMatrixUniformName = a.jointMatrixUniformName, o.morphWeightsUniformName = a.morphWeightsUniformName;
    })), function (e, t, r) {
      var i = e._loadResources;

      if (i.finishedEverythingButTextureCreation() && i.createRuntimeNodes) {
        i.createRuntimeNodes = !1;

        for (var n = [], a = e._runtime.nodes, o = e.gltf, s = o.nodes, u = o.skins, c = o.scenes[o.scene].nodes, l = c.length, d = [], h = {}, m = 0; m < l; ++m) {
          d.push({
            parentRuntimeNode: void 0,
            gltfNode: s[c[m]],
            id: c[m]
          });

          for (var f = []; 0 < d.length;) {
            var p = d.pop();
            h[p.id] = !0;

            var _,
                g = p.parentRuntimeNode,
                v = p.gltfNode,
                x = a[p.id];

            0 === x.parents.length && (je(v.matrix) ? x.matrix = $e.fromColumnMajorArray(v.matrix) : (_ = v.rotation, x.translation = ze.fromArray(v.translation), x.rotation = B.unpack(_), x.scale = ze.fromArray(v.scale))), je(g) ? (g.children.push(x), x.parents.push(g)) : n.push(x), je(v.mesh) && be(e, v, x, t, r);
            var y = v.children;
            if (je(y)) for (var S = y.length, C = 0; C < S; C++) {
              var R = y[C];
              h[R] || d.push({
                parentRuntimeNode: x,
                gltfNode: s[R],
                id: y[C]
              });
            }
            var b = v.skin;
            if (je(b) && f.push(u[b].skeleton), 0 === d.length) for (var M = 0; M < f.length; M++) {
              var w = f[M];
              h[w] || d.push({
                parentRuntimeNode: void 0,
                gltfNode: s[w],
                id: w
              });
            }
          }
        }

        e._runtime.rootNodes = n, e._runtime.nodes = a;
      }
    }(e, R, b);
  }

  function Nt(e, t) {
    var r = e.publicNode,
        i = r.matrix;
    r.useMatrix && je(i) ? $e.clone(i, t) : je(e.matrix) ? $e.clone(e.matrix, t) : ($e.fromTranslationQuaternionRotationScale(e.translation, e.rotation, e.scale, t), r.setMatrix(t));
  }

  var Dt = [],
      Ot = new ke(),
      qt = new $e();
  var Ft = new $e();

  function Me(e) {
    var t,
        r,
        i = te.shallowClone(e);
    return i.pass = re.TRANSLUCENT, i.renderState = (t = e.renderState, (r = Ke(t, !0)).cull.enabled = !1, r.depthTest.enabled = !0, r.depthMask = !1, r.blending = L.ALPHA_BLEND, T.fromCache(r)), i;
  }

  function Ut(e, t, r) {
    var i = t.scene3DOnly,
        n = e.color.alpha;

    if (0 < n && n < 1) {
      var a = e._nodeCommands,
          o = a.length;
      if (!je(a[0].translucentCommand) || r) for (var s = 0; s < o; ++s) {
        var u,
            c = a[s],
            l = c.command;
        c.translucentCommand = Me(l), i || (u = c.command2D, c.translucentCommand2D = Me(u));
      }
    }
  }

  function Vt(e, t) {
    return G(t.context) && 0 < e.silhouetteSize && 0 < e.silhouetteColor.alpha && je(e._normalAttributeName);
  }

  function Ht(e) {
    return 0 < e.color.alpha && e.color.alpha < 1;
  }

  function zt(e) {
    return 0 === e.color.alpha;
  }

  function we(e, t) {
    return Math.floor(e) !== Math.floor(t) || Math.ceil(e) !== Math.ceil(t);
  }

  var Ee = 0;

  function Te(e, t) {
    for (var r, i, n, a, o, s, u = ++Ee % 255, c = function (e) {
      for (var t = e._nodeCommands, r = t.length, i = 0; i < r; ++i) {
        if (t[i].command.pass === re.TRANSLUCENT) return !0;
      }

      return !1;
    }(e) || Ht(e) || e.silhouetteColor.alpha < 1, l = e._rendererResources.silhouettePrograms, d = t.scene3DOnly, h = e._nodeCommands, m = h.length, f = 0; f < m; ++f) {
      var p = h[f],
          _ = p.command,
          g = Ht(e) ? p.translucentCommand : _,
          v = te.shallowClone(g),
          x = Ke(g.renderState);
      x.stencilTest = {
        enabled: !0,
        frontFunction: rt.ALWAYS,
        backFunction: rt.ALWAYS,
        reference: u,
        mask: -1,
        frontOperation: {
          fail: rt.KEEP,
          zFail: rt.KEEP,
          zPass: rt.REPLACE
        },
        backOperation: {
          fail: rt.KEEP,
          zFail: rt.KEEP,
          zPass: rt.REPLACE
        }
      }, zt(e) && (x.colorMask = {
        red: !1,
        green: !1,
        blue: !1,
        alpha: !1
      }, x.depthMask = !1), x = T.fromCache(x), v.renderState = x, p.silhouetteModelCommand = v;
      var y = te.shallowClone(_);
      (x = Ke(_.renderState, !0)).depthTest.enabled = !0, x.cull.enabled = !1, c && (y.pass = re.TRANSLUCENT, x.depthMask = !1, x.blending = L.ALPHA_BLEND), x.stencilTest = {
        enabled: !0,
        frontFunction: rt.NOTEQUAL,
        backFunction: rt.NOTEQUAL,
        reference: u,
        mask: -1,
        frontOperation: {
          fail: rt.KEEP,
          zFail: rt.KEEP,
          zPass: rt.KEEP
        },
        backOperation: {
          fail: rt.KEEP,
          zFail: rt.KEEP,
          zPass: rt.KEEP
        }
      }, x = T.fromCache(x);

      var S = _.shaderProgram,
          C = function (e, t) {
        var r = e._rendererResources.programs;

        for (var i in r) {
          if (r.hasOwnProperty(i) && r[i] === t) return i;
        }
      }(e, S),
          R = l[C];

      je(R) || (r = e, n = t, a = a = void 0, a = (i = S).vertexShaderSource.sources[0], o = i._attributeLocations, s = r._normalAttributeName, a = P.replaceMain(a, "gltf_silhouette_main"), a += "uniform float gltf_silhouetteSize; \nvoid main() \n{ \n    gltf_silhouette_main(); \n    vec3 n = normalize(czm_normal3D * " + s + "); \n    n.x *= czm_projection[0][0]; \n    n.y *= czm_projection[1][1]; \n    vec4 clip = gl_Position; \n    clip.xy += n.xy * clip.w * gltf_silhouetteSize / czm_viewport.z; \n    gl_Position = clip; \n}", R = A.fromCache({
        context: n.context,
        vertexShaderSource: a,
        fragmentShaderSource: "uniform vec4 gltf_silhouetteColor; \nvoid main() \n{ \n    gl_FragColor = czm_gammaCorrect(gltf_silhouetteColor); \n}",
        attributeLocations: o
      }), l[C] = R);
      var b,
          M,
          w,
          E = $(_.uniformMap, {
        gltf_silhouetteColor: function (e) {
          return function () {
            return e.silhouetteColor;
          };
        }(e),
        gltf_silhouetteSize: function (e) {
          return function () {
            return e.silhouetteSize;
          };
        }(e)
      });
      y.renderState = x, y.shaderProgram = R, y.uniformMap = E, y.castShadows = !1, y.receiveShadows = !1, p.silhouetteColorCommand = y, d || (b = p.command2D, (M = te.shallowClone(v)).boundingVolume = b.boundingVolume, M.modelMatrix = b.modelMatrix, p.silhouetteModelCommand2D = M, w = te.shallowClone(y), M.boundingVolume = b.boundingVolume, M.modelMatrix = b.modelMatrix, p.silhouetteColorCommand2D = w);
    }
  }

  function kt(e, t, r) {
    var i, n;
    Vt(e, t) && (i = e._nodeCommands, n = we(e.color.alpha, e._colorPreviousAlpha) || we(e.silhouetteColor.alpha, e._silhouetteColorPreviousAlpha) || !je(i[0].silhouetteModelCommand), e._colorPreviousAlpha = e.color.alpha, e._silhouetteColorPreviousAlpha = e.silhouetteColor.alpha, (n || r) && Te(e, t));
  }

  var Ae = new He();
  var Gt = new ze(),
      Kt = new Ge();

  function Wt(e, t) {
    var r,
        i,
        n,
        a,
        o,
        s,
        u,
        c,
        l,
        d,
        h,
        m = e.scale;
    return 0 !== e.minimumPixelSize && (r = t.context, i = Math.max(r.drawingBufferWidth, r.drawingBufferHeight), n = je(e._clampedModelMatrix) ? e._clampedModelMatrix : e.modelMatrix, Gt.x = n[12], Gt.y = n[13], Gt.z = n[14], je(e._rtcCenter) && ze.add(e._rtcCenter, Gt, Gt), e._mode !== xt.SCENE3D && (o = (a = t.mapProjection).ellipsoid.cartesianToCartographic(Gt, Kt), a.project(o, Gt), ze.fromElements(Gt.z, Gt.x, Gt.y, Gt)), s = e.boundingSphere.radius, l = Gt, d = s, h = t, Ae.center = l, Ae.radius = d, c = 1 / (u = h.camera.getPixelSize(Ae, h.context.drawingBufferWidth, h.context.drawingBufferHeight)), Math.min(2 * s * c, i) < e.minimumPixelSize && (m = e.minimumPixelSize * u / (2 * e._initialRadius))), je(e.maximumScale) ? Math.min(e.maximumScale, m) : m;
  }

  function jt(e) {
    je(e._cacheKey) && je(e._cachedGltf) && 0 == --e._cachedGltf.count && delete H[e._cacheKey], e._cachedGltf = void 0;
  }

  function Zt(e, t) {
    this.buffers = void 0, this.vertexArrays = void 0, this.programs = void 0, this.sourceShaders = void 0, this.silhouettePrograms = void 0, this.textures = void 0, this.samplers = void 0, this.renderStates = void 0, this.ready = !1, this.context = e, this.cacheKey = t, this.count = 0;
  }

  function Pe(e) {
    for (var t in e) {
      e.hasOwnProperty(t) && e[t].destroy();
    }
  }

  function Jt(i, n, a) {
    return function (e) {
      var t;
      i.heightReference === lt.RELATIVE_TO_GROUND && ((t = n.cartesianToCartographic(e, Kt)).height += a.height, n.cartographicToCartesian(t, e));
      var r = i._clampedModelMatrix;
      $e.clone(i.modelMatrix, r), r[12] = e.x, r[13] = e.y, r[14] = e.z, i._heightChanged = !0;
    };
  }

  Zt.prototype.release = function () {
    if (0 == --this.count) return je(this.cacheKey) && delete this.context.cache.modelRendererResourceCache[this.cacheKey], Pe((e = this).buffers), Pe(e.vertexArrays), Pe(e.programs), Pe(e.silhouettePrograms), Pe(e.textures), n(this);
    var e;
  };

  var Yt = new ze(),
      Xt = new Ge();

  function Qt(e, t) {
    e.programs !== t.programs && Pe(e.programs), e.silhouettePrograms !== t.silhouettePrograms && Pe(e.silhouettePrograms);
  }

  return k.prototype.update = function (e) {
    if (e.mode !== xt.MORPHING) if (Je.supportsWebP.initialized) {
      var t = Je.supportsWebP(),
          r = e.context;

      if (this._defaultTexture = r.defaultTexture, this._state === St.NEEDS_LOAD && je(this.gltf)) {
        var i,
            n,
            a,
            o,
            s,
            u = this.cacheKey;

        if (je(u)) {
          r.cache.modelRendererResourceCache = We(r.cache.modelRendererResourceCache, {});
          var c = r.cache.modelRendererResourceCache,
              l = c[this.cacheKey];

          if (je(l)) {
            if (!l.ready) return;
            ++l.count, this._loadRendererResourcesFromCache = !0;
          } else (l = new Zt(r, u)).count = 1, c[this.cacheKey] = l;

          this._cachedRendererResources = l;
        } else (l = new Zt(r)).count = 1, this._cachedRendererResources = l;

        this._state = St.LOADING, this._state !== St.FAILED && (i = this.gltf.extensions, je(i) && je(i.PGEARTH_RTC) && (n = ze.fromArray(i.PGEARTH_RTC.center), ze.equals(n, ze.ZERO) || (this._rtcCenter3D = n, o = (a = e.mapProjection).ellipsoid.cartesianToCartographic(this._rtcCenter3D), s = a.project(o), ze.fromElements(s.z, s.x, s.y, s), this._rtcCenter2D = s, this._rtcCenterEye = new ze(), this._rtcCenter = this._rtcCenter3D)), nt(this.gltf), this._loadResources = new dt(), this._loadRendererResourcesFromCache || pt.parseBuffers(this, Mt));
      }

      var d,
          h,
          m,
          f,
          p,
          _,
          g,
          v,
          x,
          y,
          S,
          C,
          R,
          b,
          M,
          w,
          E,
          T,
          A,
          P,
          L,
          B,
          I,
          N,
          D,
          O,
          q,
          F,
          U,
          V,
          H,
          z,
          k,
          G = this._loadResources,
          K = this._incrementallyLoadTextures,
          W = !1;

      this._state === St.LOADING && (0 === G.pendingBufferLoads && (G.initialized || (e.brdfLutGenerator.update(e), pt.checkSupportedExtensions(this.extensionsRequired, t), pt.updateForwardAxis(this), je(this.gltf.extras.sourceVersion) || ((d = this.gltf).extras.sourceVersion = pt.getAssetVersion(d), d.extras.sourceKHRTechniquesWebGL = je(pt.getUsedExtensions(d).KHR_techniques_webgl), this._sourceVersion = d.extras.sourceVersion, this._sourceKHRTechniquesWebGL = d.extras.sourceKHRTechniquesWebGL, st(d), it(d), h = {
        addBatchIdToGeneratedShaders: this._addBatchIdToGeneratedShaders
      }, gt(d, h), vt(d, h)), this._sourceVersion = this.gltf.extras.sourceVersion, this._sourceKHRTechniquesWebGL = this.gltf.extras.sourceKHRTechniquesWebGL, this._dequantizeInShader = this._dequantizeInShader && ct.hasExtension(this), V = (U = this).gltf, H = U._loadResources, at.buffer(V, function (e, t) {
        H.buffers[t] = e.extras._pipeline.source;
      }), function (e) {
        var t = {},
            r = {},
            i = {};
        e._runtime.articulationsByName = t, e._runtime.articulationsByStageKey = r, e._runtime.stagesByKey = i;
        var n = e.gltf;

        if (ot(n, "AGI_articulations") && je(n.extensions) && je(n.extensions.AGI_articulations)) {
          var a = n.extensions.AGI_articulations.articulations;
          if (je(a)) for (var o = a.length, s = 0; s < o; ++s) {
            var u = Ke(a[s]);
            u.nodes = [], u.isDirty = !0;

            for (var c = (t[u.name] = u).stages.length, l = 0; l < c; ++l) {
              var d = u.stages[l];
              d.currentValue = d.initialValue;
              var h = u.name + " " + d.name;
              r[h] = u, i[h] = d;
            }
          }
        }
      }(this), F = (N = this).gltf, ot(F, "KHR_techniques_webgl") && (D = N._sourcePrograms, O = N._sourceTechniques, q = F.extensions.KHR_techniques_webgl.programs, at.technique(F, function (e, t) {
        O[t] = Ke(e);
        var r = e.program;
        je(D[r]) || (D[r] = Ke(q[r]));
      })), this._loadRendererResourcesFromCache || (function (e) {
        var r = e.gltf.bufferViews,
            i = e._loadResources.vertexBuffersToCreate;
        at.bufferView(e.gltf, function (e, t) {
          e.target === rt.ARRAY_BUFFER && i.enqueue(t);
        });
        var n = e._loadResources.indexBuffersToCreate,
            a = {};
        at.accessor(e.gltf, function (e) {
          var t = e.bufferView;
          je(t) && (r[t].target !== rt.ELEMENT_ARRAY_BUFFER || je(a[t]) || (a[t] = !0, n.enqueue({
            id: t,
            componentType: e.componentType
          })));
        });
      }(this), wt(this), function (e) {
        var t,
            r = e._sourceTechniques;

        for (var i in r) {
          r.hasOwnProperty(i) && (t = r[i], e._loadResources.programsToCreate.enqueue({
            programId: t.program,
            techniqueId: i
          }));
        }
      }(this), A = r, P = t, B = (T = this).gltf, I = B.images, at.texture(B, function (e, t) {
        var r = e.source;
        je(e.extensions) && je(e.extensions.EXT_texture_webp) && P && (r = e.extensions.EXT_texture_webp.source);
        var i,
            n,
            a,
            o,
            s,
            u = I[r],
            c = u.extras,
            l = u.bufferView,
            d = u.mimeType;
        L = u.uri, je(c) && je(c.compressedImage3DTiles) && (i = c.compressedImage3DTiles.crunch, n = c.compressedImage3DTiles.s3tc, a = c.compressedImage3DTiles.pvrtc1, o = c.compressedImage3DTiles.etc1, A.s3tc && je(i) ? (d = i.mimeType, je(i.bufferView) ? l = i.bufferView : L = i.uri) : A.s3tc && je(n) ? (d = n.mimeType, je(n.bufferView) ? l = n.bufferView : L = n.uri) : A.pvrtc && je(a) ? (d = a.mimeType, je(a.bufferView) ? l = a.bufferView : L = a.uri) : A.etc1 && je(o) && (d = o.mimeType, je(o.bufferView) ? l = o.bufferView : L = o.uri)), je(l) ? T._loadResources.texturesToCreateFromBufferView.enqueue({
          id: t,
          image: void 0,
          bufferView: l,
          mimeType: d
        }) : (++T._loadResources.pendingTextureLoads, s = T._resource.getDerivedResource({
          url: L
        }), (Tt.test(L) ? Xe(s) : At.test(L) ? Ye(s) : s.fetchImage()).then(Et(T, t)).otherwise(pt.getFailedLoadFunction(T, "image", s.url)));
      })), R = (C = this).gltf, b = C._sourceTechniques, M = {}, w = {}, E = C._uniformMaps, at.material(R, function (e, t) {
        E[t] = {
          uniformMap: void 0,
          values: void 0,
          jointMatrixUniformName: void 0,
          morphWeightsUniformName: void 0
        };
        var r,
            i = new ht(C, e, t);
        je(e.extensions) && je(e.extensions.KHR_techniques_webgl) && (r = e.extensions.KHR_techniques_webgl.technique, i._technique = r, i._program = b[r].program, at.materialValue(e, function (e, t) {
          je(i._values) || (i._values = {}), i._values[t] = Ke(e);
        })), M[e.name] = i, w[t] = i;
      }), C._runtime.materialsByName = M, C._runtime.materialsById = w, y = {}, S = (x = this)._runtime.materialsById, at.mesh(x.gltf, function (e, n) {
        y[e.name] = new mt(e, S, n), (je(x.extensionsUsed.WEB3D_quantized_attributes) || x._dequantizeInShader) && at.meshPrimitive(e, function (e, t) {
          var r = Lt(x, e),
              i = x._programPrimitives[r];
          je(i) || (i = {}, x._programPrimitives[r] = i), i[n + ".primitive." + t] = e;
        });
      }), x._runtime.meshesByName = y, f = {}, p = {}, _ = [], g = (m = this)._loadResources.skinnedNodesIds, v = m._runtime.articulationsByName, at.node(m.gltf, function (e, t) {
        var r = {
          matrix: void 0,
          translation: void 0,
          rotation: void 0,
          scale: void 0,
          computedShow: !0,
          transformToRoot: new $e(),
          computedMatrix: new $e(),
          dirtyNumber: 0,
          commands: [],
          inverseBindMatrices: void 0,
          bindShapeMatrix: void 0,
          joints: [],
          computedJointMatrices: [],
          jointName: e.jointName,
          weights: [],
          children: [],
          parents: [],
          publicNode: void 0
        };

        if (r.publicNode = new ft(m, e, r, t, pt.getTransform(e)), f[t] = r, p[e.name] = r, je(e.skin) && (g.push(t), _.push(r)), je(e.extensions) && je(e.extensions.AGI_articulations)) {
          var i = e.extensions.AGI_articulations.articulationName;

          if (je(i)) {
            var n = $e.clone(r.publicNode.originalMatrix, Pt),
                a = v[i];
            a.nodes.push(r.publicNode);

            for (var o = a.stages.length, s = 0; s < o; ++s) {
              n = bt(a.stages[s], n);
            }

            r.publicNode.matrix = n;
          }
        }
      }), m._runtime.nodes = f, m._runtime.nodesByName = p, m._runtime.skinnedNodes = _, ct.parse(this, r), G.initialized = !0), G.finishedDecoding() || ct.decodeModel(this, r).otherwise(pt.getFailedLoadFunction(this, "model", this.basePath)), G.finishedDecoding() && !G.resourcesParsed && (this._boundingSphere = pt.computeBoundingSphere(this), this._initialRadius = this._boundingSphere.radius, ct.cacheDataForModel(this), G.resourcesParsed = !0), G.resourcesParsed && 0 === G.pendingShaderLoads && It(this, e)), (G.finished() || K && G.finishedEverythingButTextureCreation()) && (this._state = St.LOADED, W = !0)), je(G) && this._state === St.LOADED && (K && !W && It(this, e), G.finished() && (this._loadResources = void 0, z = this._rendererResources, (k = this._cachedRendererResources).buffers = z.buffers, k.vertexArrays = z.vertexArrays, k.programs = z.programs, k.sourceShaders = z.sourceShaders, k.silhouettePrograms = z.silhouettePrograms, k.textures = z.textures, k.samplers = z.samplers, k.renderStates = z.renderStates, k.ready = !0, this._normalAttributeName = pt.getAttributeOrUniformBySemantic(this.gltf, "NORMAL"), je(this._precreatedAttributes) && (k.vertexArrays = {}), this.releaseGltfJson && jt(this)));

      var j,
          Z = _t.isSupported(r);

      this._shouldUpdateSpecularMapAtlas && Z && (this._shouldUpdateSpecularMapAtlas = !1, this._specularEnvironmentMapAtlas = this._specularEnvironmentMapAtlas && this._specularEnvironmentMapAtlas.destroy(), this._specularEnvironmentMapAtlas = void 0, je(this._specularEnvironmentMaps) && (this._specularEnvironmentMapAtlas = new _t(this._specularEnvironmentMaps), (j = this)._specularEnvironmentMapAtlas.readyPromise.then(function () {
        j._shouldRegenerateShaders = !0;
      })), this._shouldRegenerateShaders = !0), je(this._specularEnvironmentMapAtlas) && this._specularEnvironmentMapAtlas.update(e);
      var J = !je(this._specularEnvironmentMapAtlas) && je(e.specularEnvironmentMaps) && !this._useDefaultSpecularMaps,
          Y = !je(e.specularEnvironmentMaps) && this._useDefaultSpecularMaps,
          X = !je(this._sphericalHarmonicCoefficients) && je(e.sphericalHarmonicCoefficients) && !this._useDefaultSphericalHarmonics,
          Q = !je(e.sphericalHarmonicCoefficients) && this._useDefaultSphericalHarmonics;
      this._shouldRegenerateShaders = this._shouldRegenerateShaders || J || Y || X || Q, this._useDefaultSpecularMaps = !je(this._specularEnvironmentMapAtlas) && je(e.specularEnvironmentMaps), this._useDefaultSphericalHarmonics = !je(this._sphericalHarmonicCoefficients) && je(e.sphericalHarmonicCoefficients);

      var $,
          ee,
          te,
          re,
          ie,
          ne,
          ae,
          oe,
          se,
          ue,
          ce,
          le,
          de,
          he,
          me,
          fe,
          pe,
          _e,
          ge,
          ve,
          xe,
          ye,
          Se,
          Ce,
          Re,
          be,
          Me = Vt(this, e),
          we = Ht(this),
          Ee = zt(this),
          Te = !je(this.distanceDisplayCondition) || (ee = e, ae = ($ = this).distanceDisplayCondition, oe = ae.near * ae.near, se = ae.far * ae.far, ee.mode === xt.SCENE2D ? (te = .5 * (ee.camera.frustum.right - ee.camera.frustum.left), te *= te) : (ne = $e.getTranslation($.modelMatrix, Yt), ee.mode === xt.COLUMBUS_VIEW && (ie = (re = ee.mapProjection).ellipsoid.cartesianToCartographic(ne, Xt), ne = re.project(ie, ne), ze.fromElements(ne.z, ne.x, ne.y, ne)), te = ze.distanceSquared(ne, ee.camera.positionWC)), oe <= te && te <= se),
          Ae = this.show && Te && 0 !== this.scale && (!Ee || Me);

      if ((Ae && this._state === St.LOADED || W) && (ue = this.activeAnimations.update(e) || this._pgEarthAnimationsDirty, this._pgEarthAnimationsDirty = !1, this._dirty = !1, ce = this.modelMatrix, le = e.mode !== this._mode, this._mode = e.mode, ((de = !$e.equals(this._modelMatrix, ce) || this._scale !== this.scale || this._minimumPixelSize !== this.minimumPixelSize || 0 !== this.minimumPixelSize || this._maximumScale !== this.maximumScale || this._heightReference !== this.heightReference || this._heightChanged || le) || W) && ($e.clone(ce, this._modelMatrix), function (e) {
        je(e._removeUpdateHeightCallback) && (e._removeUpdateHeightCallback(), e._removeUpdateHeightCallback = void 0);
        var t = e._scene;

        if (je(t) && je(t.globe) && e.heightReference !== lt.NONE) {
          var r = t.globe,
              i = r.ellipsoid,
              n = e.modelMatrix;
          Gt.x = n[12], Gt.y = n[13], Gt.z = n[14];
          var a = i.cartesianToCartographic(Gt);
          je(e._clampedModelMatrix) || (e._clampedModelMatrix = $e.clone(n, new $e()));
          var o = r._surface;
          e._removeUpdateHeightCallback = o.updateHeight(a, Jt(e, i, a));
          var s,
              u = r.getHeight(a);
          je(u) && (s = Jt(e, i, a), Ge.clone(a, Kt), Kt.height = u, i.cartographicToCartesian(Kt, Gt), s(Gt));
        } else {
          if (e.heightReference !== lt.NONE) throw new Ze("Height reference is not supported without a scene and globe.");
          e._clampedModelMatrix = void 0;
        }
      }(this), je(this._clampedModelMatrix) && (ce = this._clampedModelMatrix), this._scale = this.scale, this._minimumPixelSize = this.minimumPixelSize, this._maximumScale = this.maximumScale, this._heightReference = this.heightReference, this._heightChanged = !1, he = Wt(this, e), me = this._computedModelMatrix, $e.multiplyByUniformScale(ce, he, me), this._upAxis === ut.Y ? $e.multiplyTransformation(me, ut.Y_UP_TO_Z_UP, me) : this._upAxis === ut.X && $e.multiplyTransformation(me, ut.X_UP_TO_Z_UP, me), this.forwardAxis === ut.Z && $e.multiplyTransformation(me, ut.Z_UP_TO_X_UP, me)), (ue || de || W) && (function (e, t, r, i) {
        var n,
            a,
            o,
            s = e._maxDirtyNumber,
            u = e._runtime.rootNodes,
            c = u.length,
            l = Dt,
            d = e._computedModelMatrix;
        e._mode === xt.SCENE3D || e._ignoreCommands || (n = $e.getColumn(d, 3, Ot), ke.equals(n, ke.UNIT_W) ? (a = e.boundingSphere.center, o = tt.wgs84To2DModelMatrix(i, a, qt), d = $e.multiply(o, d, qt), je(e._rtcCenter) && ($e.setTranslation(d, ke.UNIT_W, d), e._rtcCenter = e._rtcCenter2D)) : (d = tt.basisTo2D(i, d, qt), e._rtcCenter = e._rtcCenter3D));

        for (var h = 0; h < c; ++h) {
          var m = u[h];

          for (Nt(m, m.transformToRoot), l.push(m); 0 < l.length;) {
            var f = (m = l.pop()).transformToRoot,
                p = m.commands;

            if (m.dirtyNumber === s || t || r) {
              var _ = $e.multiplyTransformation(d, f, m.computedMatrix),
                  g = p.length;

              if (0 < g) for (var v = 0; v < g; ++v) {
                var x = p[v],
                    y = x.command;
                $e.clone(_, y.modelMatrix), He.transform(x.boundingSphere, y.modelMatrix, y.boundingVolume), je(e._rtcCenter) && ze.add(e._rtcCenter, y.boundingVolume.center, y.boundingVolume.center), y = x.command2D, je(y) && e._mode === xt.SCENE2D && ($e.clone(_, y.modelMatrix), y.modelMatrix[13] -= 2 * Qe.sign(y.modelMatrix[13]) * Qe.PI * i.ellipsoid.maximumRadius, He.transform(x.boundingSphere, y.modelMatrix, y.boundingVolume));
              }
            }

            var S = m.children;
            if (je(S)) for (var C = S.length, R = 0; R < C; ++R) {
              var b = S[R];
              b.dirtyNumber = Math.max(b.dirtyNumber, m.dirtyNumber), b.dirtyNumber !== s && !r || (Nt(b, b.transformToRoot), $e.multiplyTransformation(f, b.transformToRoot, b.transformToRoot)), l.push(b);
            }
          }
        }

        ++e._maxDirtyNumber;
      }(this, de, W, e.mapProjection), this._dirty = !0, (ue || W) && function (e) {
        for (var t = e._runtime.skinnedNodes, r = t.length, i = 0; i < r; ++i) {
          var n = t[i];
          Ft = $e.inverseTransformation(n.transformToRoot, Ft);

          for (var a = n.computedJointMatrices, o = n.joints, s = n.bindShapeMatrix, u = n.inverseBindMatrices, c = u.length, l = 0; l < c; ++l) {
            je(a[l]) || (a[l] = new $e()), a[l] = $e.multiplyTransformation(Ft, o[l].transformToRoot, a[l]), a[l] = $e.multiplyTransformation(a[l], u[l], a[l]), je(s) && (a[l] = $e.multiplyTransformation(a[l], s, a[l]));
          }
        }
      }(this)), this._perNodeShowDirty && (this._perNodeShowDirty = !1, function (e) {
        for (var t = e._runtime.rootNodes, r = t.length, i = Dt, n = 0; n < r; ++n) {
          var a = t[n];

          for (a.computedShow = a.publicNode.show, i.push(a); 0 < i.length;) {
            for (var o = (a = i.pop()).computedShow, s = a.commands, u = s.length, c = 0; c < u; ++c) {
              s[c].show = o;
            }

            var l = a.children;
            if (je(l)) for (var d = l.length, h = 0; h < d; ++h) {
              var m = l[h];
              m.computedShow = o && m.publicNode.show, i.push(m);
            }
          }
        }
      }(this)), function (e) {
        var t = e.id;

        if (e._id !== t) {
          e._id = t;

          for (var r = e._pickIds, i = r.length, n = 0; n < i; ++n) {
            r[n].object.id = t;
          }
        }
      }(this), function (e) {
        if (e._debugWireframe !== e.debugWireframe) {
          e._debugWireframe = e.debugWireframe;

          for (var t = e.debugWireframe ? et.LINES : et.TRIANGLES, r = e._nodeCommands, i = r.length, n = 0; n < i; ++n) {
            r[n].command.primitiveType = t;
          }
        }
      }(this), function (e) {
        if (e.debugShowBoundingVolume !== e._debugShowBoundingVolume) {
          e._debugShowBoundingVolume = e.debugShowBoundingVolume;

          for (var t = e.debugShowBoundingVolume, r = e._nodeCommands, i = r.length, n = 0; n < i; ++n) {
            r[n].command.debugShowBoundingVolume = t;
          }
        }
      }(this), function (e) {
        if (e.shadows !== e._shadows) {
          e._shadows = e.shadows;

          for (var t = yt.castShadows(e.shadows), r = yt.receiveShadows(e.shadows), i = e._nodeCommands, n = i.length, a = 0; a < n; a++) {
            var o = i[a];
            o.command.castShadows = t, o.command.receiveShadows = r;
          }
        }
      }(this), Re = e, be = (Ce = this)._clippingPlanes, je(be) && be.owner === Ce && be.enabled && be.update(Re), fe = this._clippingPlanes, pe = 0, _e = je(fe) && fe.enabled && 0 < fe.length, ge = je(this._sphericalHarmonicCoefficients) || this._useDefaultSphericalHarmonics, ve = je(this._specularEnvironmentMapAtlas) && this._specularEnvironmentMapAtlas.ready || this._useDefaultSpecularMaps, (_e || ge || ve) && (xe = We(this.clippingPlanesOriginMatrix, ce), $e.multiply(r.uniformState.view3D, xe, this._clippingPlaneModelViewMatrix)), _e && (pe = fe.clippingPlanesState), ye = (ye = this._shouldRegenerateShaders) || this._clippingPlanesState !== pe, this._clippingPlanesState = pe, (Se = Ct(this)) !== this._colorShadingEnabled && (this._colorShadingEnabled = Se, ye = !0), ye ? function (e, t) {
        var r,
            i,
            n = e._rendererResources,
            a = e._cachedRendererResources;

        if (Qt(n, a), Rt(e) || Ct(e) || e._shouldRegenerateShaders) {
          e._shouldRegenerateShaders = !1, n.programs = {}, n.silhouettePrograms = {};
          var o = {},
              s = e._sourceTechniques;

          for (var u in s) {
            s.hasOwnProperty(u) && (i = s[u], r = i.program, o[r] || (o[r] = !0, Bt({
              programId: r,
              techniqueId: u
            }, e, t.context)));
          }
        } else n.programs = a.programs, n.silhouettePrograms = a.silhouettePrograms;

        for (var c = n.programs, l = e._nodeCommands, d = l.length, h = 0; h < d; ++h) {
          var m = l[h];
          r = m.programId;
          var f = c[r];
          m.command.shaderProgram = f, je(m.command2D) && (m.command2D.shaderProgram = f);
        }

        Ut(e, t, !0), kt(e, t, !0);
      }(this, e) : (Ut(this, e, !1), kt(this, e, !1))), W) {
        var Pe = this;
        e.afterRender.push(function () {
          Pe._ready = !0, Pe._readyPromise.resolve(Pe);
        });
      } else if (Ae && !this._ignoreCommands) {
        var Le,
            Be,
            Ie,
            Ne,
            De,
            Oe = e.commandList,
            qe = e.passes,
            Fe = this._nodeCommands,
            Ue = Fe.length,
            Ve = e.mapProjection.ellipsoid.maximumRadius * Qe.PI;

        if (qe.render || qe.pick && this.allowPicking) {
          for (Le = 0; Le < Ue; ++Le) {
            (De = Fe[Le]).show && (Ne = we ? De.translucentCommand : De.command, Ne = Me ? De.silhouetteModelCommand : Ne, Oe.push(Ne), Be = De.command.boundingVolume, e.mode === xt.SCENE2D && (Be.center.y + Be.radius > Ve || Be.center.y - Be.radius < Ve) && (Ie = we ? De.translucentCommand2D : De.command2D, Ie = Me ? De.silhouetteModelCommand2D : Ie, Oe.push(Ie)));
          }

          if (Me && !qe.pick) for (Le = 0; Le < Ue; ++Le) {
            (De = Fe[Le]).show && (Oe.push(De.silhouetteColorCommand), Be = De.command.boundingVolume, e.mode === xt.SCENE2D && (Be.center.y + Be.radius > Ve || Be.center.y - Be.radius < Ve) && Oe.push(De.silhouetteColorCommand2D));
          }
        }
      }
    } else Je.supportsWebP.initialize();
  }, k.prototype.isDestroyed = function () {
    return !1;
  }, k.prototype.destroy = function () {
    je(this._precreatedAttributes) && Pe(this._rendererResources.vertexArrays), je(this._removeUpdateHeightCallback) && (this._removeUpdateHeightCallback(), this._removeUpdateHeightCallback = void 0), je(this._terrainProviderChangedCallback) && (this._terrainProviderChangedCallback(), this._terrainProviderChangedCallback = void 0), je(this._cachedRendererResources) && Qt(this._rendererResources, this._cachedRendererResources), this._rendererResources = void 0, this._cachedRendererResources = this._cachedRendererResources && this._cachedRendererResources.release(), ct.destroyCachedDataForModel(this);

    for (var e = this._pickIds, t = e.length, r = 0; r < t; ++r) {
      e[r].destroy();
    }

    jt(this), this._quantizedVertexShaders = void 0;
    var i = this._clippingPlanes;
    return je(i) && !i.isDestroyed() && i.owner === this && i.destroy(), this._clippingPlanes = void 0, this._specularEnvironmentMapAtlas = this._specularEnvironmentMapAtlas && this._specularEnvironmentMapAtlas.destroy(), n(this);
  }, k._getClippingFunction = E, k._modifyShaderForColor = function (e) {
    return e = P.replaceMain(e, "gltf_blend_main"), e += "uniform vec4 gltf_color; \nuniform float gltf_colorBlend; \nvoid main() \n{ \n    gltf_blend_main(); \n    gl_FragColor.rgb = mix(gl_FragColor.rgb, gltf_color.rgb, gltf_colorBlend); \n    float highlight = ceil(gltf_colorBlend); \n    gl_FragColor.rgb *= mix(gltf_color.rgb, vec3(1.0), highlight); \n    gl_FragColor.a *= gltf_color.a; \n} \n";
  }, Object.defineProperties(k.prototype, {
    _cachedGltf: {
      set: function set(e) {
        this._vtxf_cachedGltf = e, this._vtxf_cachedGltf && this._vtxf_cachedGltf._gltf && fixGltf(this._vtxf_cachedGltf._gltf);
      },
      get: function get() {
        return this._vtxf_cachedGltf;
      }
    }
  }), k;
});

var fixGltf = function fixGltf(o) {
  var e, t, s;
  o.extensionsUsed && (e = o.extensionsUsed && o.extensionsUsed.indexOf("KHR_technique_webgl"), t = o.extensionsRequired && o.extensionsRequired.indexOf("KHR_technique_webgl"), -1 !== e && (o.extensionsRequired.splice(t, 1, "KHR_techniques_webgl"), o.extensionsUsed.splice(e, 1, "KHR_techniques_webgl"), o.extensions = o.extensions || {}, o.extensions.KHR_techniques_webgl = {}, o.extensions.KHR_techniques_webgl.programs = o.programs, o.extensions.KHR_techniques_webgl.shaders = o.shaders, o.extensions.KHR_techniques_webgl.techniques = o.techniques, s = o.extensions.KHR_techniques_webgl.techniques, o.materials.forEach(function (e, t) {
    o.materials[t].extensions || (o.materials[t].extensions = {
      KHR_technique_webgl: {}
    }), o.materials[t].extensions.KHR_technique_webgl.values = o.materials[t].values, o.materials[t].extensions.KHR_techniques_webgl = o.materials[t].extensions.KHR_technique_webgl;
    var r = o.materials[t].extensions.KHR_techniques_webgl;

    for (var i in r.technique || (r.technique = o.materials[t].technique), r.values) {
      var n = s[r.technique].uniforms;

      for (var a in n) {
        if (n[a] === i) {
          r.values[a] = r.values[i], delete r.values[i];
          break;
        }
      }
    }
  }), s.forEach(function (e) {
    for (var t in e.attributes) {
      var r = e.attributes[t];
      e.attributes[t] = e.parameters[r];
    }

    for (var i in e.uniforms) {
      r = e.uniforms[i];
      e.uniforms[i] = e.parameters[r];
    }
  })));
};